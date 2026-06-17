"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FolderGit2, Plus, ExternalLink, Code, Terminal, Layout, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Realistic Mock Data for the Portfolio
const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Microservices Architecture",
    description: "A highly scalable cloud-native backend built for a high-traffic e-commerce platform using Docker, Kubernetes, and AWS.",
    status: "Completed",
    icon: <Database className="w-6 h-6 text-blue-400" />,
    tags: ["AWS", "Kubernetes", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "#",
    completionScore: 100,
  },
  {
    id: 2,
    title: "AI Career Predictor",
    description: "Machine learning model trained on 10,000+ resumes to predict career trajectories. Built using scikit-learn and deployed via FastAPI.",
    status: "In Progress",
    icon: <Terminal className="w-6 h-6 text-green-400" />,
    tags: ["Python", "FastAPI", "Scikit-Learn", "Pandas"],
    githubUrl: "https://github.com",
    liveUrl: "#",
    completionScore: 65,
  },
  {
    id: 3,
    title: "Next.js Portfolio Template",
    description: "A highly aesthetic, premium portfolio template utilizing Framer Motion, TailwindCSS, and Next.js App Router for developers.",
    status: "Completed",
    icon: <Layout className="w-6 h-6 text-purple-400" />,
    tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
    completionScore: 100,
  },
  {
    id: 4,
    title: "Real-Time Chat Application",
    description: "WebSocket-based real-time messaging application with end-to-end encryption and media sharing capabilities.",
    status: "Planning",
    icon: <FolderGit2 className="w-6 h-6 text-orange-400" />,
    tags: ["TypeScript", "Socket.io", "Express", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
    completionScore: 10,
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Portfolio</h1>
          <p className="text-muted-foreground">Track your real-world projects, build your portfolio, and showcase your skills.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /> Add New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="group relative overflow-hidden border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full">
            {/* Status indicator line at the top */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              project.status === 'Completed' ? 'bg-green-500/50' :
              project.status === 'In Progress' ? 'bg-blue-500/50' :
              'bg-orange-500/50'
            }`} />
            
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                <Badge variant={
                  project.status === 'Completed' ? 'default' : 
                  project.status === 'In Progress' ? 'secondary' : 'outline'
                } className={
                  project.status === 'Completed' ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/20' : 
                  project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/20' : ''
                }>
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex flex-col flex-1">
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                {project.description}
              </p>
              
              <div className="mb-6 flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-black/20 border-white/10 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mt-auto pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{project.completionScore}%</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        project.status === 'Completed' ? 'bg-green-500' :
                        project.status === 'In Progress' ? 'bg-blue-500' :
                        'bg-orange-500'
                      }`} 
                      style={{ width: `${project.completionScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full gap-2 bg-white/5 hover:bg-white/10 text-sm" 
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Code className="w-4 h-4" /> Code
                  </Button>
                  {project.liveUrl !== "#" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-2 border-white/10 hover:bg-primary/20 hover:text-primary hover:border-primary/50 text-sm" 
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
