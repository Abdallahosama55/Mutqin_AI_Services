const ItalicIcon = ({ width = 24, height = 24, title }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <rect x="0.5" y="0.5" width="23" height="23" rx="5.19795" fill="white" />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="5.19795"
        stroke="#5225CE"
      />
      <path
        d="M15 4.5L10 18.5"
        stroke="#5225CE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 19.5H14"
        stroke="#5225CE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 4.5H19"
        stroke="#5225CE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ItalicIcon;
