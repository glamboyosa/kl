import { create } from "zustand";

export type GeneratedImageResponse = {
  data: Array<{ url: string }>;
  success: boolean;
};
interface ActiveTabState {
  images: GeneratedImageResponse["data"];
  setImages: (data: GeneratedImageResponse["data"]) => void;
}

const useGeneratedImages = create<ActiveTabState>((set) => ({
  images: [],
  setImages: (images: GeneratedImageResponse["data"]) =>
    set(() => ({ images })),
}));
export default useGeneratedImages;
