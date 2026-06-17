"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Loader2, Bot, User } from "lucide-react";
import { Agent } from "@/types";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatAgentPage() {
  const params = useParams();
  const router = useRouter();
  const { agents } = useAppStore();
  const agentId = params.agentId as string;
  
  const [agent, setAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundAgent = agents.find(a => a.id === agentId);
    if (foundAgent) {
      setAgent(foundAgent);
      // Initial greeting
      setMessages([
        { role: "assistant", content: `Hello! I am your ${foundAgent.name}. How can I assist you today?` }
      ]);
    } else {
      router.push("/dashboard/multi-agent");
    }
  }, [agentId, agents, router]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || !agent) return;
    
    const userMessage = input.trim();
    setInput("");
    
    const updatedMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:8000/api/chat/message", {
        agent_id: agent.id,
        message: userMessage,
        history: messages.map(m => ({ role: m.role, content: m.content }))
      });
      
      setMessages([...updatedMessages, { role: "assistant", content: response.data.reply }]);
    } catch (error) {
      setMessages([...updatedMessages, { role: "assistant", content: "I'm sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!agent) return <div className="p-8"><Loader2 className="animate-spin text-primary w-8 h-8 mx-auto" /></div>;

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto border border-white/10 bg-surface-container rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-white/5 bg-surface">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/multi-agent")} className="mr-4">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Button>
        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center mr-3">
          <Bot className="w-6 h-6 text-primary-container" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">{agent.name}</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{agent.role}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20" ref={scrollRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} gap-3`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary-container/20 text-primary-container"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-surface-variant text-on-surface-variant rounded-tl-none"
              }`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex flex-row gap-3">
              <div className="w-8 h-8 rounded-full flex-shrink-0 bg-primary-container/20 text-primary-container flex items-center justify-center mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-surface-variant text-on-surface-variant rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-white/5 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${agent.name}...`}
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <Button 
          onClick={handleSend} 
          disabled={!input.trim() || isTyping}
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
        >
          <Send className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
