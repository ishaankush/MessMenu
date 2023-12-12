// pages/index.js
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className=" p-8">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <nav>
        <Link href="/login">
          <div className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-5 cursor-pointer max-w-xs">
            Login
          </div>
        </Link>
        <Link href="/signup">
          <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer max-w-xs">
            Signup
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
