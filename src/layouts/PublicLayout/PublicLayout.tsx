import React from "react";
import Navbar from "@/components/layouts/Navbar/Navbar";
import Footer from "@/components/layouts/Footer/Footer";
import { PublicLayoutProps } from "./types";

const PublicLayout: React.FC<PublicLayoutProps> = ({children}) => {
  return (
    <div>
      <Navbar />
        <main>
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
