"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";

import React from "react";
import useModelFinetune from "@/lib/store/useModelFinetune";
import { Button } from "./ui/button";

const FineTuneModel = () => {
  const temperature = useModelFinetune((state) => state.temperature);
  const setTemperature = useModelFinetune((state) => state.setTemperature);
  const maxTokens = useModelFinetune((state) => state.maxTokens);
  const setMaxTokens = useModelFinetune((state) => state.setMaxTokens);
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="mt-4" variant="outline">Finetune model</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mb-2">
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Temperature</TooltipTrigger>
                <TooltipContent>
                  <p>Controls the randomness of returned answers.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="ml-auto">{temperature}</span>
          </div>
          <Slider
            onValueChange={([val]) => setTemperature(val)}
            defaultValue={[0.7]}
            max={1}
            step={0.1}
          />
        </div>

        <div className="mb-2">
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Max Tokens</TooltipTrigger>
                <TooltipContent>
                  <p>The maximum number of tokens to return.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="ml-auto">{maxTokens}</span>
          </div>
          <Slider
            onValueChange={([val]) => setMaxTokens(val)}
            defaultValue={[500]}
            max={1000}
            step={1}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FineTuneModel;
