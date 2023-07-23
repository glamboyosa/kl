"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";

import React from "react";
import useModelFinetune from "@/lib/store/useModelFinetune";
const FineTuneImage = () => {
  const width = useModelFinetune((state) => state.width);
  const setWidth = useModelFinetune((state) => state.setWidth);
  const height = useModelFinetune((state) => state.height);
  const setHeight = useModelFinetune((state) => state.setHeight);
  return (
    <div className="mb-2">
      <div className="flex flex-col">
        <h1 className="text-md md:text-xl">Image Dimensions</h1>
        <p>Dimensions of the finished image</p>
      </div>
      <div className="mb-2">
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Width</TooltipTrigger>
              <TooltipContent>
                <p>The max width from 200-1024</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="ml-auto">{width}</span>
        </div>
        <Slider
          onValueChange={([val]) => setWidth(val)}
          defaultValue={[750]}
          max={1024}
          step={1}
        />
      </div>

      <div className="mb-2">
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Height</TooltipTrigger>
              <TooltipContent>
                <p>The height of the image from 200-1024</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="ml-auto">{height}</span>
        </div>
        <Slider
          onValueChange={([val]) => setHeight(val)}
          defaultValue={[920]}
          max={1024}
          step={1}
        />
      </div>
    </div>
  );
};

export default FineTuneImage;