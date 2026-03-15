import React from "react";

export const Section = ({ children }) => {
  return (
    <section className="py-12 md:py-16">
      {children}
    </section>
  );
};