import React, { useState, useEffect } from "react";

const useTypingAnimation = (text, delay, isComplete) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length && !isComplete) {
      const timeout = setTimeout(() => {
        if (Array.isArray(text)) {
          setCurrentText(
            (prevText) =>
              prevText +
              (currentIndex !== text.length - 1
                ? text[currentIndex] + " "
                : text[currentIndex])
          );
        } else setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return currentText;
};

export default useTypingAnimation;
