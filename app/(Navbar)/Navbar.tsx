import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between container mx-auto">
      <Link href={"/"}>
        <h1 className="text-2xl font-medium">AB Online Tools</h1>
      </Link>
      <h1 className="">Word Counter</h1>
    </div>
  );
};

export default Navbar;
