"use client";

import React from "react";
import { Button } from "../ui/button";
import useModelFinetune from "@/lib/store/useModelFinetune";
import useGeneratedImages, {
  GeneratedImageResponse,
} from "@/lib/store/useGeneratedImages";
import { useToast } from "../ui/use-toast";

const ImageGenerationPrompt = () => {
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const width = useModelFinetune((state) => state.width);
  const height = useModelFinetune((state) => state.height);
  const { toast } = useToast();
  const setImages = useGeneratedImages((state) => state.setImages);
  const submitPromptHandler = async () => {
    const body = {
      prompt,
      size: `${width}x${height}`,
    };
    setLoading(true);
    try {
      const resp = await fetch(
        `${window.location.origin}/api/generate-images`,
        {
          method: "POST",
          cache: "no-cache",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.status === 401) {
        toast({
          title: "Uh Oh! Limit exceeded",
          description: `You've used up all your available tokens, Please consider buying some more.`,
        });
        setLoading(false);
        return;
      }
      const response: GeneratedImageResponse = await resp.json();

      if (response.success) {
        setImages(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Uh Oh! Something Went Wrong",
        description:
          "Looks like there is an error from OpenAI. Please try again",
      });
    }
  };
  return (
    <div className="basis-1/3 flex flex-col p-3 mb-3">
      <div className="flex flex-col">
        <h1 className="text-md md:text-xl">Prompt</h1>
        <p>What do you want to see?</p>
      </div>
      <textarea
        value={prompt}
        name="prompt-text-area"
        onChange={(e) => setPrompt(e.target.value)}
        cols={20}
        rows={15}
        className="border border-black mt-3"
        placeholder="A siamese cat with freckles"
      />
      <Button
        onClick={submitPromptHandler}
        className="mt-4"
        variant={"outline"}
        disabled={loading}
      >
        {loading ? "Generating Image" : "Generate Image"}
      </Button>
    </div>
  );
};

export default ImageGenerationPrompt;
