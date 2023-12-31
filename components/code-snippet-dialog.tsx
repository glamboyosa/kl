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
import { CopyBlock, monokai } from "react-code-blocks";
import { Button } from "./ui/button";
import { SquareDashedBottomCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import React from "react";

import useModelFinetune from "@/lib/store/useModelFinetune";
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

type CodeSnippetDialogProps = {
  from?: "image";
};
const CodeSnippetDialog = ({ from }: CodeSnippetDialogProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [lang, setLang] = React.useState<SelectUnion>();
  const { toast } = useToast();

  const temperature = useModelFinetune((state) => state.temperature);
  const maxTokens = useModelFinetune((state) => state.maxTokens);
  const model = useModelFinetune((state) => state.model);
  const width = useModelFinetune((state) => state.width);
  const height = useModelFinetune((state) => state.height);

  const title = "Copy Successful ✨";
  const description = `Successfully copied ${
    lang === "bash" ? "cURL" : lang
  } snippet.`;

  const TSLang = `
    const klu = new KluAI({token: process.env.KLUAI_TOKEN})

    const response = await klu.createChatCompletion({
      model: '${model}',
      prompt: '<YOUR-PROMPT>',
      max_tokens: ${maxTokens},
      temperature: ${temperature},
    })
  `;
  const TSLangImg = `
    const klu = new KluAI({token: process.env.KLUAI_TOKEN})

    const response = await klu.createImage({
      prompt: '<YOUR-PROMPT>',
      width: ${width},
      height: ${height}
    })
  `;

  const curlLang = `
  curl --request POST \
  --url https://api.klu.ai/v1/chat-creation \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
	"model": ${model},
  "prompt": '<YOUR-PROMPT>',
  "max_tokens": ${maxTokens},
  "temperature": ${temperature},
}'
  `;
  const curlLangImg = `
  curl --request POST \
  --url https://api.klu.ai/v1/image-creation \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
    "prompt": '<YOUR-PROMPT>',
    "width": ${width},
    "height": ${height}
}'
  `;

  const elixirLang = `
{:ok, _pid} = KluAIElixirSDK.start_link(%{token: "<YOUR-KLU-AI-TOKEN>"})

try do

resp =
KluAIElixirSDK.create_chat_completion(%{
  "model": ${model},
  "prompt": '<YOUR-PROMPT>',
  "max_tokens": ${maxTokens},
  "temperature": ${temperature},
  })

Logger.info(resp)
catch
err ->
  Logger.error(err)
end
`;
  const elixirLangImg = `
{:ok, _pid} = KluAIElixirSDK.start_link(%{token: "<YOUR-KLU-AI-TOKEN>"})

try do

resp =
KluAIElixirSDK.create_image(%{
  "prompt": '<YOUR-PROMPT>',
  "width": ${width},
  "height": ${height}
  })

Logger.info(resp)
catch
err ->
  Logger.error(err)
end
`;
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open === false) {
          setLang(undefined);
        }
      }}
    >
      {" "}
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-4 p-2 items-center">
          <span>Generate Code Snippet</span>
          <SquareDashedBottomCode />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
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
        <div className="mt-4 font-mono">
          {lang === "bash" ? (
            <CopyBlock
              text={from === "image" ? curlLangImg : curlLang}
              language={lang}
              showLineNumbers={false}
              codeBlock
              theme={monokai as any}
              copied
              wrapLongLines
              onCopy={() => {
                toast({
                  title,
                  description,
                });
              }}
            />
          ) : lang === "typescript" ? (
            <CopyBlock
              text={from === "image" ? TSLangImg : TSLang}
              language={lang}
              showLineNumbers={false}
              codeBlock
              theme={monokai as any}
              copied
              wrapLongLines
              onCopy={() => {
                toast({
                  title,
                  description,
                });
              }}
            />
          ) : lang === "elixir" ? (
            <CopyBlock
              text={from === "image" ? elixirLangImg : elixirLang}
              language={lang}
              showLineNumbers={false}
              codeBlock
              theme={monokai as any}
              copied
              wrapLongLines
              onCopy={() => {
                toast({
                  title,
                  description,
                });
              }}
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
