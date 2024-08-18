import React from "react";
const TextWithSansSerifNumbers = ({ text }) => {
  // Function to check if a character is a number
  const isNumber = char => /\d/.test(char);

  // Function to check if a character is Arabic
  const isArabic = char => /[\u0600-\u06FF]/.test(char);

  // Function to convert numbers to sans-serif font and Arabic text to bold
  const convertToStyledText = str => {
    return str.split('').map((char, index) => {
      if (isNumber(char)) {
        return <span key={index} style={{ fontFamily: 'Inter' }}>{char}</span>;
      } else if (isArabic(char)) {
        return <span key={index} style={{ fontFamily: 'Tajawal' }}>{char}</span>;
      }
      return char;
    });
  };

  return (
    <>
      {convertToStyledText(text)}
    </>
  );
};

export default TextWithSansSerifNumbers;
