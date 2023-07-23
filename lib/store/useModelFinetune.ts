import { create } from "zustand";

interface ActiveTabState {
  temperature: number;
  maxTokens: number;
  model: string;
  setModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (maxTokens: number) => void;
}

const useModelFinetune = create<ActiveTabState>((set) => ({
  temperature: 0.7,
  maxTokens: 500,
  model: "gpt-3.5-turbo",
  setModel: (model: string) => set(() => ({ model })),
  setMaxTokens: (maxTokens: number) => set(() => ({ maxTokens })),
  setTemperature: (temp: number) => set(() => ({ temperature: temp })),
}));
export default useModelFinetune;
