import { create } from 'zustand';

interface FeedbackState {
  workId: string;
  freelancerId: string;
  setWorkId: (workId: string) => void;
  setFreelancerId: (freelancerId: string) => void;
}

// Create the Zustand store
export const useFeedbackStore = create<FeedbackState>((set) => ({
  workId: '',
  freelancerId: '',
  setWorkId: (workId) =>{console.log("Setting workId:", workId); set({ workId })},
  setFreelancerId: (freelancerId) =>{console.log("Setting freelancerId:", freelancerId); set({ freelancerId })},
}));
