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
import { CodeBlock, dracula, monokai } from "react-code-blocks";
import { Button } from "./ui/button";
import { SquareDashedBottomCode } from "lucide-react";
import React from "react";
import CopyBlock from "react-code-blocks/dist/components/CopyBlock";
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
          {lang === "bash" ? (
            <CopyBlock
              text="j"
              language={lang}
              showLineNumbers={false}
              codeBlock
              theme={monokai as any}
              copied
              wrapLongLines
              onCopy={() => {}}
            />
          ) : lang === "typescript" ? (
            <CopyBlock
              text=""
              language={lang}
              showLineNumbers={false}
              codeBlock
              theme={monokai as any}
              copied
              wrapLongLines
              onCopy={() => {}}
            />
          ) : lang === "elixir" ? (
            <CopyBlock
              text=""
              language={lang}
              showLineNumbers={false}
              codeBlock
              theme={monokai as any}
              copied
              wrapLongLines
              onCopy={() => {}}
            />
          ) : (
            <div />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeSnippetDialog;
