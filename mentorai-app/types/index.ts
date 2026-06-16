export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  title: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: 'technical' | 'soft' | 'domain';
  gap?: number; // 0-100
  readinessScore: number;
  gaps: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'contract' | 'internship';
  matchScore: number;
  salary?: string;
  postedAt: string;
  logoUrl?: string;
  description: string;
  requirements: string[];
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  type: 'achievement' | 'feedback' | 'learning' | 'interaction';
  createdAt: string;
  date: string;
  tags: string[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  estimatedHours: number;
}

export interface ResumeScore {
  overallScore: number;
  impactScore: number;
  brevityScore: number;
  styleScore: number;
  skillsMatchScore: number;
  suggestions: string[];
}

export interface InterviewScore {
  overallScore: number;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  feedback: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarUrl?: string;
  status: 'active' | 'idle' | 'offline';
  capabilities: string[];
}
