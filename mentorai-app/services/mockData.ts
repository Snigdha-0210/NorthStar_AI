import { User, Skill, Opportunity, Memory, Agent, RoadmapItem, ResumeScore, InterviewScore } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Alex Developer',
  email: 'alex@example.com',
  title: 'Senior Frontend Engineer',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHv31dLO3JLO0st74HSefGcTPs0IuNew61AcjTqXeY1jbGvhcOxQQYpTRg_q3b-qKpvYofpUZZg6WZuXUNSQc2Duq-D8HrOAkTvoJGUMnrnoOqKM_LKBs2gxQ3JpUZ2FDBmUt7iHbsfNM1ef20-hr1_dg3JNMFQ1C6WWBg0h0nMmgGkBMvVBbUK0DI_m8eVdMVG48lo7afHC4NRlc4VRBIIpoWjOr5dNGrsCVysP0OA3IaeaNfI-XkVVH76A_H3XMEwIJD2wvaRIVo',
};

export const mockSkills: Skill[] = [
  { id: 's1', name: 'React', level: 90, category: 'technical', gap: 5, readinessScore: 92, gaps: [] },
  { id: 's2', name: 'Next.js', level: 85, category: 'technical', gap: 10, readinessScore: 88, gaps: ['App Router Advanced Caching'] },
  { id: 's3', name: 'TypeScript', level: 80, category: 'technical', gap: 15, readinessScore: 85, gaps: ['Advanced Generics'] },
  { id: 's4', name: 'System Design', level: 60, category: 'technical', gap: 30, readinessScore: 65, gaps: ['Micro-frontends', 'Distributed Systems'] },
  { id: 's5', name: 'Leadership', level: 70, category: 'soft', gap: 20, readinessScore: 75, gaps: ['Cross-team Communication'] },
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'o1',
    title: 'Lead Frontend Engineer',
    company: 'TechCorp Inc.',
    location: 'Remote',
    type: 'full-time',
    matchScore: 92,
    salary: '$150k - $180k',
    postedAt: '2 days ago',
    description: 'Looking for a Lead Frontend Engineer to drive our React and Next.js adoption across enterprise teams.',
    requirements: ['React', 'Next.js', 'System Design', 'Leadership']
  },
  {
    id: 'o2',
    title: 'Senior React Developer',
    company: 'InnovateSpace',
    location: 'New York, NY',
    type: 'full-time',
    matchScore: 88,
    salary: '$140k - $160k',
    postedAt: '5 hours ago',
    description: 'Join our fast-paced startup to build innovative tools using the latest frontend stack.',
    requirements: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'o3',
    title: 'Frontend Architect',
    company: 'Global Systems',
    location: 'San Francisco, CA',
    type: 'full-time',
    matchScore: 75,
    salary: '$180k - $220k',
    postedAt: '1 week ago',
    description: 'We need an architect to oversee the transition of legacy systems into modern scalable frontends.',
    requirements: ['Architecture', 'System Design', 'Micro-frontends', 'React']
  },
];

export const mockMemories: Memory[] = [
  {
    id: 'm1',
    title: 'Advanced System Design Course',
    content: 'Completed advanced system design course.',
    type: 'learning',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    tags: ['system design', 'course'],
  },
  {
    id: 'm2',
    title: 'Architecture Review Feedback',
    content: 'Received excellent feedback on the last project architecture from the tech lead.',
    type: 'feedback',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    tags: ['architecture', 'praise'],
  },
  {
    id: 'm3',
    title: 'Legacy Migration Completion',
    content: 'Successfully migrated the legacy codebase to Next.js App Router.',
    type: 'achievement',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    tags: ['nextjs', 'migration'],
  },
];

export const mockAgents: Agent[] = [
  {
    id: 'a1',
    name: 'Career Coach AI',
    role: 'Career Strategist',
    description: 'Helps map out long-term career goals and paths.',
    status: 'active',
    capabilities: ['Goal Setting', 'Market Analysis', 'Path Mapping']
  },
  {
    id: 'a2',
    name: 'Interview Prep AI',
    role: 'Mock Interviewer',
    description: 'Conducts realistic technical and behavioral interviews.',
    status: 'idle',
    capabilities: ['Voice Interviews', 'Technical Questions', 'Behavioral Feedback']
  },
  {
    id: 'a3',
    name: 'Resume Review AI',
    role: 'Resume Analyst',
    description: 'Scans and optimizes your resume against job descriptions.',
    status: 'active',
    capabilities: ['ATS Optimization', 'Keyword Matching', 'Formatting Suggestions']
  },
];

export const mockRoadmap: RoadmapItem[] = [
  {
    id: 'r1',
    title: 'Master Advanced TypeScript',
    description: 'Learn utility types, generics, and conditional types.',
    status: 'completed',
    estimatedHours: 20,
  },
  {
    id: 'r2',
    title: 'System Design Patterns',
    description: 'Study scalable architecture and micro-frontends.',
    status: 'in_progress',
    estimatedHours: 40,
  },
  {
    id: 'r3',
    title: 'Cloud Deployment (AWS)',
    description: 'Learn to deploy Next.js apps using AWS services.',
    status: 'not_started',
    estimatedHours: 30,
  },
];

export const mockResumeScore: ResumeScore = {
  overallScore: 85,
  impactScore: 80,
  brevityScore: 90,
  styleScore: 88,
  skillsMatchScore: 82,
  suggestions: [
    'Quantify your achievements in your last role (e.g., "improved performance by X%").',
    'Add more keywords related to Cloud Architecture based on your target roles.',
  ],
};

export const mockInterviewScore: InterviewScore = {
  overallScore: 78,
  communicationScore: 85,
  technicalScore: 75,
  confidenceScore: 80,
  feedback: 'Great communication skills, but struggled slightly with the deep dive into React reconciliation.',
};
