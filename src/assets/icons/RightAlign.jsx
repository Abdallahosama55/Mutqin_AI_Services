const RightAlignIcon = ({ width = 24, height = 24, title }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path
        d="M21 7H3M21 12H3M21 17H13.2857"
        stroke="#5225CE"
        strokeWidth="2.05309"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightAlignIcon;
