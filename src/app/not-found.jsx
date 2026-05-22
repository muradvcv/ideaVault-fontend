import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div>
      <section className="min-h-screen  flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">

          <h1 className="text-8xl md:text-9xl font-bold text-cyan-400">
            404
          </h1>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold">
            Page Not Found
          </h2>

          <p className="mt-6  text-lg leading-relaxed">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link
              href="/"
              className="px-8 py-4 bg-cyan-400 text-black rounded-full font-semibold hover:scale-105 duration-300"
            >
              Go Home
            </Link>



          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;