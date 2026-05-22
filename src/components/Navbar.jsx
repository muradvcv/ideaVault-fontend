"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/theme/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { MdLogout } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  // Public links (always visible)
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
  ];

  // Private links (only when logged in)
  const privateLinks = [
    { name: "Add Idea", path: "/add-idea" },
    { name: "My Ideas", path: "/my-idea" },
    { name: "My Interaction", path: "/my-interaction" },
  ];

  const navLinks = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <RxHamburgerMenu />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={
                      pathname === link.path
                        ? "text-cyan-500 border-b-2 border-cyan-500"
                        : "hover:text-cyan-400"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              width={60}
              height={60}
              src="/assets/ideaLogo.png"
              alt="IdeaVault Logo"
            />
            <h1 className="text-xl font-bold hidden lg:block">
              IdeaVault
            </h1>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-semibold text-[1rem] space-x-5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`pb-1 transition duration-300 ${pathname === link.path
                      ? "border-b-2 border-cyan-500"
                      : "hover:text-cyan-400"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end font-semibold text-[1.1rem]">
          <ul className="flex items-center gap-3">
            {/* Theme Toggle */}
            <li className="mr-2">
              <ThemeToggle />
            </li>

            {user ? (
              <li className="relative list-none">
                <details className="group">
                  <summary className="flex items-center gap-2 cursor-pointer list-none">
                    <Avatar className="border border-[#028e9bbb] w-10 h-10 rounded-full overflow-hidden">
                      <Avatar.Image
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        alt={user?.name || "User"}
                        src={user?.image}
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>

                    {/* Dropdown Icon */}
                    <ChevronDown
                      size={18}
                      className="transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>

                  {/* Dropdown */}
                  <div className="absolute right-0 top-14 w-36 rounded-xl bg-base-100 shadow-lg border z-50 overflow-hidden">
                    <Link
                      href="/my-profile"
                      className="px-4 py-3 flex items-center gap-2 text-sm "
                    >
                      <FiUser />
                      <span>Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 flex items-center gap-2 text-sm "
                    >
                      <MdLogout />
                      <span>Logout</span>
                    </button>
                  </div>
                </details>
              </li>
            ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-medium transition-all duration-200"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/singUp"
                      className="px-4 py-2 rounded-lg bg-cyan-400 text-white hover:bg-cyan-500 font-medium transition-all duration-200 shadow-md hover:shadow-cyan-400/40"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;