"use client";
import React from "react";
import Link from "next/link";
import { User } from "@/types/auth";
import { signOut } from "next-auth/react";

export default function Header({ user }: { user?: User }) {
  return (
    <header className="sticky top-0 h-16 bg-white border-gray-200 dark:bg-gray-800 dark:text-white">
      <div className="h-full flex items-center justify-between px-4 lg:px-20">
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold">
            NextAuth
          </Link>
        </div>
        <nav className="flex-1">
          <ul className="flex mt-4 font-medium justify-center space-x-8 lg:mt-0">
            <li>
              <Link
                href="/"
                className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-1 flex justify-end space-x-4">
          {user ? (
            <>
              <p className="">{user.display_name}</p>
              <button
                type="button"
                onClick={() =>
                  signOut({
                    redirect: true,
                    redirectTo: "/login",
                  })
                }
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block font-medium py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
