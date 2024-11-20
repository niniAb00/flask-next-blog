export default async function HomePage() {
  const res = await fetch("http://localhost:5000/api/articles");
  const articles = await res.json();

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-6 shadow-md rounded-lg mt-10 mb-10">
      <h1 className="py-5 font-bold text-3xl text-gray-800 border-b border-gray-300">
        All Articles
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-6">
        {articles.map((article) => (
          <li
            className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            key={article.id}
          >
            <p className="pb-2 font-bold text-xl text-gray-700">
              {article.title}
            </p>
            <p className="pb-4 text-lg text-gray-600">{article.suptitle}</p>
            <a
              className="inline-block text-blue-500 font-medium hover:text-blue-700 transition duration-300"
              href={`/article/${article.id}`}
            >
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
