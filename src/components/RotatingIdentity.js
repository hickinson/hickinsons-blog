import React, { useEffect, useState } from "react";

const words = [
  "Builder.",
  "Leader.",
  "Father.",
  "Technologist.",
  "Creator.",
  "Entrepreneur."
];

export default function RotatingIdentity() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
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
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <div className="rotating-identity-line">
      <span className="mr-2 text-site-muted">I’m a</span>
      <strong className="rotating-identity-word shimmer-text">{displayedText}</strong>
      <span className="cursor">|</span>
    </div>
  );
}