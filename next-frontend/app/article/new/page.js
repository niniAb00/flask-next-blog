"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [suptitle, setSuptitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, suptitle, content }),
    });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={suptitle}
        onChange={(e) => setSuptitle(e.target.value)}
        placeholder="Subtitle"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
