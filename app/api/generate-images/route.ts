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

  const response = (await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  })) as any;

  return NextResponse.json({ data: response.data.data, success: true });
}
