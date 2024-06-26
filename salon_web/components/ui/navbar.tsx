"use client";

import { MenuIcon } from "../icons/menu";
import { X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const paths = [
  { name: "Book Appointment", url: "/reservation" },
];

function Navbar() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const currentPath = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white">
      <div className=" mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/navbar/salonIcon.webp" alt="Logo" width={24} height={24} />
          <span className="font-bold text-3xl">SEA Salon</span>
        </Link>
        <div className="hidden xl:flex items-center space-x-6">
          {paths.map((path) => (
            <Link key={path.name} href={path.url} className={`hover:text-yellow-500 ${currentPath === path.url ? "text-yellow-500" : "text-white"}`}>
              {path.name}
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/dashboard/settings" className="hover:text-yellow-500">
                Settings
              </Link>
              <Link href="/dashboard/inbox" className="hover:text-yellow-500">
                Inbox
              </Link>
              <button onClick={() => signOut()} className="hover:text-yellow-500">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded">
                Log In
              </Link>
              <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button
          className="xl:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-yellow-500 hover:border-yellow-500"
          onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
        >
          {isNavbarExpanded ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {isNavbarExpanded && (
        <div className="xl:hidden bg-blue-600 text-white">
          <div className="flex flex-col items-center space-y-4 py-4">
            {paths.map((path) => (
              <Link key={path.name} href={path.url} className={`hover:text-yellow-500 ${currentPath === path.url ? "text-yellow-500" : "text-white"}`}>
                {path.name}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/dashboard/settings" className="hover:text-yellow-500">
                  Settings
                </Link>
                <Link href="/dashboard/inbox" className="hover:text-yellow-500">
                  Inbox
                </Link>
                <button onClick={() => signOut()} className="hover:text-yellow-500">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded">
                  Log In
                </Link>
                <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
