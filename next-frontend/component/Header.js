import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex font-bold text-3xl justify-center items-center py-10">
      <Link href={"/"}>My Blog</Link>
    </div>
  );
};

export default Header;
