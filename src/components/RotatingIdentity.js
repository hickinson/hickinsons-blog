import React, { useEffect, useState } from "react";

const words = [
  "Dad",
  "Builder",
  "Technologist",
  "Data thinker",
  "Creator",
  "Entrepreneur"
];

export default function RotatingIdentity() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 45 : 85;
    const pauseAfterTyping = 1400;
    const pauseBeforeTyping = 250;

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
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <div className="rotating-identity-line">
      <strong className="rotating-identity-word">{displayedText}</strong>
      <span className="cursor">|</span>
    </div>
  );
}