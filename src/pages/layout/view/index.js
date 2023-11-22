import React from "react";
import Header from "pages/layout/view/header";
import Footer from "pages/layout/view/footer";
import Sidebar from "pages/layout/view/sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      <>{children}</>
      <Footer />
    </>
  );
}
