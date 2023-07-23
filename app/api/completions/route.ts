import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { env } from "@/env.mjs";
import { Unkey } from "@unkey/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const unkey = new Unkey({ token: env.UNKEY_TOKEN });
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const cookie = cookies().get("authCookie");

  const auth = cookie?.value;

  const key = auth?.split("+")[0] as string;

  const { valid } = await unkey.keys.verify({ key });

  if (valid === false) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 401 }
    );
  }
  // Extract the `messages` from the body of the request
  const {
    messages,
    temperature,
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
    model: "gpt-3.5-turbo",
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
