import React from "react";
import './globals.css';

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default ParentLayout;
