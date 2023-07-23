import { create } from "zustand";

interface ModelFineTuneState {
  temperature: number;
  maxTokens: number;
  width: number;
  height: number;
  model: string;
  setModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (maxTokens: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

const useModelFinetune = create<ModelFineTuneState>((set) => ({
  temperature: 0.7,
  maxTokens: 500,
  model: "gpt-3.5-turbo",
  width: 750,
  height: 920,
  setModel: (model: string) => set(() => ({ model })),
  setMaxTokens: (maxTokens: number) => set(() => ({ maxTokens })),
  setTemperature: (temp: number) => set(() => ({ temperature: temp })),
  setWidth: (width: number) => set(() => ({ width })),
  setHeight: (height: number) => set(() => ({ height })),
}));
export default useModelFinetune;
