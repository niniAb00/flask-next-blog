"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // استخدام useParams بدلاً من params

export default function EditArticlePage() {
  const [title, setTitle] = useState("");
  const [suptitle, setSuptitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const params = useParams(); // فك القيم من useParams

  useEffect(() => {
    async function fetchArticle() {
      if (params?.id) {
        const res = await fetch(
          `http://localhost:5000/api/articles/${params.id}`
        );
        const data = await res.json();
        setTitle(data.title);
        setSuptitle(data.suptitle);
        setContent(data.content);
      }
    }
    fetchArticle();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/articles/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, suptitle, content }),
    });
    router.push("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg mt-10 mb-10"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="subtitle"
          className="block text-gray-700 font-semibold mb-2"
        >
          Subtitle
        </label>
        <input
          id="subtitle"
          value={suptitle}
          onChange={(e) => setSuptitle(e.target.value)}
          placeholder="Enter the subtitle"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-gray-700 font-semibold mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter the content"
          rows="5"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Update
      </button>
    </form>
  );
}
