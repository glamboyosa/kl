import { create } from "zustand";

export type Tabs = "chat" | "auth" | "images";
interface ActiveTabState {
  activeTab: Tabs;
  setActiveTab: (tab: Tabs) => void;
}

const useActiveTab = create<ActiveTabState>((set) => ({
  activeTab: "chat",
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
}));
export default useActiveTab;
