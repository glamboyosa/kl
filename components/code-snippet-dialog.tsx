"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeBlock } from "react-code-blocks";
import { Button } from "./ui/button";
import { SquareDashedBottomCode } from "lucide-react";
import React from "react";
const selectOptions = [
  {
    value: "bash",
    label: "cURL",
  },
  {
    value: "typescript",
    label: "TypeScript",
  },
  {
    value: "elixir",
    label: "Elixir",
  },
];
type SelectUnion = "elixir" | "typescript" | "bash" | undefined;
const CodeSnippetDialog = () => {
  const [lang, setLang] = React.useState<SelectUnion>();
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-4 items-center">
            <span>Generate Code Snippet</span>
            <SquareDashedBottomCode />
          </Button>
        </DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Copy Code Snippet</DialogTitle>
          <DialogDescription>
            Copy code snippet in available languages and get started !
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={(val) => setLang(val as SelectUnion)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Language 💫" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              {selectOptions.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="mt-4">
          {lang === "bash" ? <CodeBlock text="j" /> : <CodeBlock />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeSnippetDialog;
