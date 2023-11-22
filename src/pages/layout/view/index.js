import React from "react";
import Sidebar from "pages/layout/view/sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ height: "1000vh" }}>
      <Sidebar />
      <div style={{ width: "500px", height: "500px", backgroundColor: "black" }}>테스트</div>
      <>{children}</>
    </div>
  );
}
