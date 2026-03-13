import React, { useEffect, useState } from "react";

const words = [
  "dad",
  "builder",
  "technologist",
  "data thinker",
  "creator",
  "entrepreneur"
];

export default function RotatingIdentity() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 2500);

      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <span>
       I'm a <strong style={{ color: "#1915fd" }}>{words[index]}</strong>.
    </span>
  );
}