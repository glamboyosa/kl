"use client";
import CodeSnippetDialog from "../code-snippet-dialog";
import FineTuneModel from "../finetune-model";
import { ModelPicker } from "../model-picker";
import Chat from "./chat";

const ChatContainer = () => (
  <>
    <div className="basis-1/3">
      <ModelPicker />
      <FineTuneModel />
    </div>
    <Chat />
    <CodeSnippetDialog />
  </>
);
export default ChatContainer;
