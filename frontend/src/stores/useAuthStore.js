import { create } from "zustand"

const useAuthStore = create(set => ({
  participant: null,
  isAuthenticated: false,
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
  setParticipant: (p) => set({ participant: p }),
  logout: () => { set({ participant: null, isAuthenticated: false }) }
}))

export default useAuthStore