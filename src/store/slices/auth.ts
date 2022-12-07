import { StateCreator } from "zustand"
import { App, getApps } from "../../fetch/app"
import { checkAuth, login } from "../../fetch/auth";

export interface AuthSlice {
  fetchMe: (token) => void
  // token: (apps: string[]) => void
  login: (email, pass) => void
  me: () => void
  user: {
    email?: string;
  };
  fetching: boolean;
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [],
  AuthSlice
> = (set) => ({
  user:  null,
  fetching: true,
  fetchMe: async(token) => {
    set({user: {}})
  },
  login: async(email, pass) => {
    const user = await login(email, pass)
    set({user: user})
  },
  me: async () => {
    const res = await checkAuth()
    if (res) {
      set({user: res})
    } else if (window.location.pathname !== '/login'){
       window.location.href = '/login'
    }  
    set({fetching: false})
  },
})
