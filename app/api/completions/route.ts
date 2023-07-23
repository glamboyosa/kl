import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { env } from "@/env.mjs";
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  console.log("geet");
  // Extract the `messages` from the body of the request
  const {
    messages,
    temperature,
    model,
    maxTokens,
  }: {
    messages: ChatCompletionRequestMessage[];
    model: string;
    temperature: number;
    maxTokens: number;
  } = await req.json();
  console.log(messages);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model,
    stream: true,
    messages,
    temperature,
    max_tokens: maxTokens,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
