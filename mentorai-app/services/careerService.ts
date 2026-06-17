import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api`;

export interface AssessmentData {
  academic_background?: string;
  technical_skills?: string[];
  soft_skills?: string[];
  interests?: string[];
  learning_style?: string;
  work_preferences?: string[];
}

export const careerService = {
  async submitAssessment(data: AssessmentData) {
    const response = await axios.post(`${API_BASE_URL}/careers/assessment/submit`, data);
    return response.data;
  },
  
  async getCareerDNA(userId: number) {
    const response = await axios.get(`${API_BASE_URL}/careers/dna/${userId}`);
    return response.data;
  },
  
  async generateMatches(userId: number) {
    const response = await axios.post(`${API_BASE_URL}/careers/matches/generate?user_id=${userId}`);
    return response.data;
  },
  
  async getMatches(userId: number) {
    const response = await axios.get(`${API_BASE_URL}/careers/matches/${userId}`);
    return response.data;
  },
  
  async generateRoadmap(careerPath: string, currentSkills: string[], userId: number) {
    const response = await axios.post(`${API_BASE_URL}/roadmaps/generate`, {
      career_path: careerPath,
      current_skills: currentSkills,
      user_id: userId
    });
    return response.data;
  },
  
  async getActiveRoadmap(userId: number) {
    const response = await axios.get(`${API_BASE_URL}/roadmaps/active/${userId}`);
    return response.data;
  },
  
  async getCareerTwin(userId: number) {
    const response = await axios.get(`${API_BASE_URL}/intelligence/twin/${userId}`);
    return response.data;
  },
  
  async getInterventions(userId: number) {
    const response = await axios.get(`${API_BASE_URL}/intelligence/interventions/${userId}`);
    return response.data;
  }
};
