import { create } from 'zustand';
import { User, Skill, Opportunity, Memory, Agent, RoadmapItem } from '../types';
import { mockUser, mockSkills, mockOpportunities, mockMemories, mockAgents, mockRoadmap } from '../services/mockData';

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  user: User | null;
  setUser: (user: User | null) => void;

  skills: Skill[];
  opportunities: Opportunity[];
  memories: Memory[];
  agents: Agent[];
  roadmap: RoadmapItem[];

  // mock actions
  updateSkill: (id: string, newLevel: number) => void;
  addMemory: (memory: Memory) => void;
  updateRoadmapStatus: (id: string, status: RoadmapItem['status']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  user: mockUser,
  setUser: (user) => set({ user }),

  skills: mockSkills,
  opportunities: mockOpportunities,
  memories: mockMemories,
  agents: mockAgents,
  roadmap: mockRoadmap,

  updateSkill: (id, newLevel) =>
    set((state) => ({
      skills: state.skills.map((s) => (s.id === id ? { ...s, level: newLevel } : s)),
    })),
    
  addMemory: (memory) =>
    set((state) => ({
      memories: [memory, ...state.memories],
    })),

  updateRoadmapStatus: (id, status) =>
    set((state) => ({
      roadmap: state.roadmap.map((r) => (r.id === id ? { ...r, status } : r)),
    })),
}));
