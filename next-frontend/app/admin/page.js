"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/articles/${id}`, {
      method: "DELETE",
    });
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-6 shadow-md rounded-lg my-10">
      <h1 className="font-bold text-3xl text-gray-800 pb-5 border-b border-gray-300">
        Admin Dashboard
      </h1>
      <ul className="mt-5 space-y-4">
        {articles.map((article) => (
          <li
            className="p-5 border rounded-lg shadow-sm bg-white flex items-center justify-between"
            key={article.id}
          >
            <div>
              <h1 className="font-bold text-xl text-gray-700 pb-2">
                {article.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="text-red-500 font-medium hover:text-red-700 transition duration-300"
                onClick={() => handleDelete(article.id)}
              >
                Delete
              </button>
              <a
                href={`/article/edit/${article.id}`}
                className="text-blue-500 font-medium hover:text-blue-700 transition duration-300"
              >
                Edit
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
