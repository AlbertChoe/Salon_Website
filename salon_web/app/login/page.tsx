import LogInForm from "./login-form";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import  authOptions  from '@/app/api/auth/[...nextauth]/authOptions'; 
import Link from "next/link";

const LogInPage = async () => {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="relative flex w-full max-w-md flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg">
        <div className="absolute -top-20 flex w-full items-center justify-center">
          <Image src="/navbar/salonIcon.webp" alt="Logo" width={60} height={60} />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Log In</h1>
        <LogInForm />
        <div className="mt-4">
          Don&apos;t have account? 
          <Link href="/signup"  className="text-blue-600 hover:text-blue-800 ml-2">
             Create an Account
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LogInPage;
