"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "../components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster, toast } from 'sonner'
const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster  position="bottom-right" richColors  />
      <Navbar />

      {children}
      <Footer />
    </SessionProvider>
  );
};

export default ClientLayout;
