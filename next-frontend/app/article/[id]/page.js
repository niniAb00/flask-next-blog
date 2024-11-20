import Link from "next/link";

export default async function ArticlePage({ params }) {
  const res = await fetch(`http://localhost:5000/api/articles/${params.id}`);
  const article = await res.json();

  if (article.error) {
    return (
      <div className="max-w-2xl mx-auto bg-red-100 text-red-700 p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <p className="mt-2">The article you are looking for does not exist.</p>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-6 shadow-md rounded-lg my-10 ">
      <h1 className="font-bold text-3xl text-gray-800 pb-3 border-b border-gray-300">
        {article.title}
      </h1>
      <h2 className="font-semibold text-xl text-gray-600 pt-3 pb-5">
        {article.suptitle}
      </h2>
      <p className="text-lg leading-7 tracking-wider text-gray-700">
        {article.content}
      </p>
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
