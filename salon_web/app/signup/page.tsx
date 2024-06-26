"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const SignupForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        // Handle server errors here
        const errorData = await response.json();
        console.error('Failed to sign up:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred during sign up:', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="absolute -top-20 flex w-full items-center justify-center">
          <Image src="/navbar/salonIcon.webp" alt="Logo" width={60} height={60} />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          required
          className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
          className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
