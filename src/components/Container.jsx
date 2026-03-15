import React from "react";

export const Container = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-layout px-5 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};