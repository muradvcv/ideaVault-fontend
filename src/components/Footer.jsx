import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#020817] text-white px-6 md:px-10 py-16 mt-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/idea2.png"
              alt="IdeaVault"
              width={55}
              height={55}
              className="rounded-full border border-[#1c9e79]/30 bg-[#1c9e79]/10 p-1"
            />

            <h1 className="text-2xl font-bold text-[#1c9e79]">
              IdeaVault
            </h1>
          </div>

          <p className="mt-5 text-gray-400 leading-7 text-sm">
            A modern platform where innovators can share startup
            ideas, discover trending concepts, and collaborate
            with creative minds worldwide.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-[#1c9e79]">
            Platform
          </h2>

          <div className="flex flex-col gap-3 text-gray-400 text-sm">

            <Link
              href="/"
              className="hover:text-[#1c9e79] transition-all duration-300"
            >
              Home
            </Link>

            <Link
              href="/ideas"
              className="hover:text-[#1c9e79] transition-all duration-300"
            >
              Browse Ideas
            </Link>

            <Link
              href="/add-idea"
              className="hover:text-[#1c9e79] transition-all duration-300"
            >
              Submit Idea
            </Link>

            <Link
              href="/my-idea"
              className="hover:text-[#1c9e79] transition-all duration-300"
            >
              My Ideas
            </Link>

            <Link
              href="/my-interaction"
              className="hover:text-[#1c9e79] transition-all duration-300"
            >
              My Interactions
            </Link>

          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-[#1c9e79]">
            Categories
          </h2>

          <div className="flex flex-col gap-3 text-gray-400 text-sm">

            <p className="hover:text-[#1c9e79] transition-all duration-300 cursor-pointer">
              Artificial Intelligence
            </p>

            <p className="hover:text-[#1c9e79] transition-all duration-300 cursor-pointer">
              Technology
            </p>

            <p className="hover:text-[#1c9e79] transition-all duration-300 cursor-pointer">
              Health & Wellness
            </p>

            <p className="hover:text-[#1c9e79] transition-all duration-300 cursor-pointer">
              Education
            </p>

            <p className="hover:text-[#1c9e79] transition-all duration-300 cursor-pointer">
              Finance
            </p>

          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-[#1c9e79]">
            Connect
          </h2>

          <div className="flex items-center gap-4 text-2xl">

            <Link
              href="https://github.com"
              target="_blank"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <FaGithub />
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-blue-500 hover:scale-110 transition-all duration-300"
            >
              <FaFacebook />
            </Link>

            <Link
              href="mailto:contact@ideavault.com"
              className="text-red-400 hover:scale-110 transition-all duration-300"
            >
              <MdOutlineMail />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-sky-500 hover:scale-110 transition-all duration-300"
            >
              <IoLogoLinkedin />
            </Link>

            <Link
              href="https://x.com"
              target="_blank"
              className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <FaXTwitter />
            </Link>

          </div>

          <div className="mt-5 space-y-2 text-sm text-gray-400">
            <p>contact@ideavault.com</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
        © 2026{" "}
        <span className="text-[#1c9e79] font-semibold">
          IdeaVault
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;