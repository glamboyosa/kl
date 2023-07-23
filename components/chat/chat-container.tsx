"use client";
import CodeSnippetDialog from "../code-snippet-dialog";
import FineTuneModel from "../finetune-model";
import { ModelPicker } from "../model-picker";
import Chat from "./chat";

const ChatContainer = () => (
  <>
    <div>
      <ModelPicker />
      <FineTuneModel />
    </div>
    <Chat />
    <CodeSnippetDialog />
  </>
);
export default ChatContainer;
