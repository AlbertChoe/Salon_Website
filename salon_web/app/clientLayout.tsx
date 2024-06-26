"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "../components/ui/navbar";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
};

export default ClientLayout;
