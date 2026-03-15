import React from "react";
import { Link } from "gatsby";

export const Button = ({ children, to, href }) => {
  const base =
    "inline-flex items-center justify-center rounded-pill px-5 py-2.5 text-[0.95rem] font-semibold tracking-[-0.01em] transition-all duration-200";

  const style =
    "bg-site-text text-site-bg hover:-translate-y-[1px] hover:shadow-soft";

  if (to) {
    return (
      <Link to={to} className={`${base} ${style}`}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${style}`}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${style}`}>
      {children}
    </button>
  );
};