import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { IoLogoLinkedin } from 'react-icons/io';
import { MdOutlineMail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-[#020817] text-white px-10 py-16 mt-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2">
            <Image
              src={'/assets/idea2.png'}
              alt="IdeaVault"
              width={60}
              height={60}
              className="border border-[#1c9e79]/30 rounded-full bg-[#1c9e79]/10"
            />
            <h1 className="text-2xl font-bold text-[#1c9e79]">
              IdeaVault
            </h1>
          </div>

          <p className="mt-4 text-gray-400 leading-7">
            A platform to share, validate, and discover innovative
            startup ideas with the community.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#1c9e79]">
            Platform
          </h2>

          <div className="flex flex-col gap-3 text-gray-400">
            <Link
              href="/"
              className="hover:text-[#1c9e79] transition duration-300"
            >
              Home
            </Link>

            <Link
              href="/ideas"
              className="hover:text-[#1c9e79] transition duration-300"
            >
              Browse Ideas
            </Link>

            <Link
              href="/add-idea"
              className="hover:text-[#1c9e79] transition duration-300"
            >
              Submit Idea
            </Link>

            <Link
              href="/profile"
              className="hover:text-[#1c9e79] transition duration-300"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#1c9e79]">
            Categories
          </h2>

          <div className="flex flex-col gap-3 text-gray-400">
            <p className="hover:text-[#1c9e79] transition duration-300 cursor-pointer">Tech</p>
            <p className="hover:text-[#1c9e79] transition duration-300 cursor-pointer">AI</p>
            <p className="hover:text-[#1c9e79] transition duration-300 cursor-pointer">Health</p>
            <p className="hover:text-[#1c9e79] transition duration-300 cursor-pointer">Education</p>
            <p className="hover:text-[#1c9e79] transition duration-300 cursor-pointer">Finance</p>
          </div>
        </div>
        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Connect
          </h2>

          <div className="flex items-center gap-4 text-2xl">

            <Link
              href="/"
              className="text-gray-400 hover:text-white hover:scale-110 transition duration-300"
            >
              <FaGithub />
            </Link>

            <Link
              href="/"
              className="text-blue-500 hover:text-blue-400 hover:scale-110 transition duration-300"
            >
              <FaFacebook />
            </Link>

            <Link
              href="/"
              className="text-red-400 hover:text-red-300 hover:scale-110 transition duration-300"
            >
              <MdOutlineMail />
            </Link>

            <Link
              href="/"
              className="text-sky-500 hover:text-sky-400 hover:scale-110 transition duration-300"
            >
              <IoLogoLinkedin />
            </Link>

          </div>

          <p className="text-gray-400 mt-4">
            contact@ideavault.com
          </p>
        </div>


      </div>

      {/* Bottom */}
      <div className="border-t border-[#1c9e79]/20 mt-10 pt-6 text-center text-gray-500">
        © 2026 <span className="text-[#1c9e79]">IdeaVault</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;