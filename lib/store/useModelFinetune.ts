import { create } from "zustand";

interface ActiveTabState {
  temperature: number;
  maxTokens: number;
  setTemperature: (temp: number) => void;
  setMaxTokens: (maxTokens: number) => void;
}

const useModelFinetune = create<ActiveTabState>((set) => ({
  temperature: 0.7,
  maxTokens: 500,
  setMaxTokens: (maxTokens) => set(() => ({ maxTokens })),
  setTemperature: (temp) => set(() => ({ temperature: temp })),
}));
export default useModelFinetune;
