"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="  ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">
            <Link
              href="/"
              className="hover:text-blue-700 transition duration-300"
            >
              my blog
            </Link>
          </div>

          <div className=" flex space-x-6">
            <Link
              href="/admin"
              className="hover:text-blue-700 hover:scale-125 transition duration-300"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
