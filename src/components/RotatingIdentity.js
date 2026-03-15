import React, { useEffect, useMemo, useState } from "react";

const words = [
  "builder",
  "leader",
  "father",
  "technologist",
  "creator",
  "entrepreneur"
];

const getArticle = word => {
  if (!word) return "a";
  const first = word[0].toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(first) ? "an" : "a";
};

const toDisplay = word => word.charAt(0).toUpperCase() + word.slice(1);

export default function RotatingIdentity() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = useMemo(() => words[wordIndex], [wordIndex]);
  const article = getArticle(currentWord);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 75;
    const pauseAfterTyping = 1500;
    const pauseBeforeTyping = 200;

    let timeout;

    if (!isDeleting && displayedText === "") {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, 1));
      }, pauseBeforeTyping);
    } else if (!isDeleting && displayedText !== currentWord) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText === currentWord) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWord]);

  return (
    <div className="rotating-identity-line">
      <span className="mr-2 text-site-muted">I’m {article}</span>
      <strong className="rotating-identity-word shimmer-text">
        {toDisplay(displayedText)}
      </strong>
      <span className="cursor">|</span>
    </div>
  );
}