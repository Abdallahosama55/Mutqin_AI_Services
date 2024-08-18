// TextLengthContext.js
import React, { createContext, useContext, useState } from "react";

const TextLengthContext = createContext();

export const useTextLength = () => useContext(TextLengthContext);

export const TextLengthProvider = ({ children }) => {
  const [textLength, setTextLength] = useState(0);

  const setTextLengthValue = (length) => {
    setTextLength(length);
  };

  return (
    <TextLengthContext.Provider value={{ textLength, setTextLengthValue }}>
      {children}
    </TextLengthContext.Provider>
  );
};
