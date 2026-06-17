import { create } from 'zustand';

interface CareerState {
  careerDNA: any | null;
  matches: any[];
  activeRoadmap: any | null;
  careerTwin: any | null;
  setCareerDNA: (dna: any) => void;
  setMatches: (matches: any[]) => void;
  setActiveRoadmap: (roadmap: any) => void;
  setCareerTwin: (twin: any) => void;
}

export const useCareerStore = create<CareerState>((set) => ({
  careerDNA: null,
  matches: [],
  activeRoadmap: null,
  careerTwin: null,
  setCareerDNA: (dna) => set({ careerDNA: dna }),
  setMatches: (matches) => set({ matches }),
  setActiveRoadmap: (roadmap) => set({ activeRoadmap: roadmap }),
  setCareerTwin: (twin) => set({ careerTwin: twin }),
}));
