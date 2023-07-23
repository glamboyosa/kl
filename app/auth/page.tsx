import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { env } from "@/env.mjs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  async function loginHandler(data: FormData) {
    "use server";
    const email = data.getAll("email")[0] as string;
    console.log("email is", email);

    // create key
    const body = JSON.stringify({
      apiId: env.UNKEY_API_ID,
      prefix: "glam",
      remaining: 12,
    });
    const response = await fetch("https://api.unkey.dev/v1/keys", {
      method: "post",
      cache: "no-cache",
      body,
      headers: {
        Authorization: `Bearer ${env.UNKEY_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const created: {
      key: string;
      keyId: string;
    } = await response.json();

    console.log(created.key);
    cookies().set({
      name: "authCookie",
      value: `${created.key}+${email}`,
      secure: false,
      httpOnly: false,
    });

    redirect("/");
  }
  return (
    <div className="flex min-h-screen justify-center items-center w-screen">
      <form action={loginHandler} className="flex space-x-2">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="w-3/4"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
