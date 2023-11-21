import React from "react";
import Footer from "../footer";

export default function Layout({ children }) {
  return (
    <div>
      Layout
      <>{children}</>
      <Footer />
    </div>
  );
}
