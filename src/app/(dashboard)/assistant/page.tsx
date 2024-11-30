"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";


export default function Assistant() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <Input
          className="fixed bottom-4 w-full max-w-md rounded-xl drop-shadow-2xl"
          value={input}
          placeholder="Ask something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
