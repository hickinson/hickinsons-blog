import React, { useEffect, useState } from "react";

const words = [
  "dad",
  "builder",
  "technologist",
  "data thinker",
  "creator",
  "entrepreneur"
];

function getArticle(word) {
  const firstLetter = word.charAt(0).toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(firstLetter) ? "an" : "a";
}

export default function RotatingIdentity() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const word = words[index];
  const article = getArticle(word);

  return (
    <span>
      I'm {article} <strong style={{ color: "#1915fd" }}>{word}</strong>
      <span className="cursor">|</span>.
    </span>
  );
}