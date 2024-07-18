import { create } from "zustand";

interface UserState {
  userid: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  setUserId: (userid: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setProfileImage: (profileImage: string) => void;
}

// Create the Zustand store
export const useUserStore = create<UserState>((set) => ({
  userid: "",
  firstName: "",
  lastName: "",
  email: "",
  profileImage: "",
  setUserId: (userid) => set({ userid }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setProfileImage: (profileImage) => set({ profileImage }),
}));
