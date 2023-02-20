import Link from "next/link";
import React from "react";

function Page() {
  return (
    <main>
      <h1>welcome to chick chuck</h1>
      <div className="flex">
        <Link
          href={`/signin`}
          className="p-2 m-10 text-2xl rounded-lg  transition duration-300 ease-out hover:rounded-full hover:bg-black hover:text-white border-2 border-black bg-green-500 text-center text-l text-bold"
        >
          Sign In
        </Link>
        <Link
          href={`/signup`}
          className="p-2 m-10 text-2xl rounded-lg  transition duration-300 ease-out hover:rounded-full hover:bg-black hover:text-white border-2 border-black bg-green-500 text-center text-l text-bold"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}

export default Page;
