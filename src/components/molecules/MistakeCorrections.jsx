const MistakeCorrections = ({ word, correctionOptions }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Handler for hovering over a mistake
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  // Handler for leaving the hover state
  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <span
      className="mistake"
      style={{ color: "red" }} // Set the color of mistakes
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {word}
      {showDropdown && (
        <div className="correction-dropdown">
          {correctionOptions.map((option, index) => (
            <div key={index} className="correction-option">
              {option}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

export default MistakeCorrections;
