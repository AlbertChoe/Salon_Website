"use client";

import { MenuIcon } from "../icons/menu";
import { X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const commonPaths = [
  { name: "Branch", url: "/branch" },
];

const customerPaths = [
  { name: "Book Appointment", url: "/reservation" },
  { name: "Dashboard", url: "/dashboard/customerDashboard" },
];

const adminPaths = [
  { name: "Add Service", url: "/add-service" },
  { name: "Add Branch", url: "/add-branch" },
];

function Navbar() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const currentPath = usePathname();
  const { data: session } = useSession();
  
  // Determine paths based on user role
  const rolePaths = session?.user?.role === 'Admin' ? adminPaths : customerPaths;
  const paths = session ? [...rolePaths, ...commonPaths] : commonPaths;

  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white p-2">
      <div className="mx-auto px-4 flex justify-between items-center h-16">
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
              <button onClick={() => signOut()} className="hover:text-yellow-500">
                Log Out
              </button>
              <div className="flex flex-col text-right border border-gray-300 p-2 rounded-md bg-blue-400">
                <span className="font-semibold">{session.user.email}</span>
                <span className="text-sm text-blue-200">{session.user.role}</span>
              </div>
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
                <button onClick={() => signOut()} className="hover:text-yellow-500">
                  Log Out
                </button>
                <div className="flex flex-col items-center border border-gray-300 p-2 rounded-md bg-gray-800">
                  <span className="font-semibold">{session.user.email}</span>
                  <span className="text-sm text-gray-200">{session.user.role}</span>
                </div>
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
