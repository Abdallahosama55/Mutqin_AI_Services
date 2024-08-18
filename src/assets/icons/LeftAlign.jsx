const LeftAlignIcon = ({ width = 24, height = 24, title }) => {
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
        d="M3 7H21M3 12H21M3 17H10.7143"
        stroke="#5225CE"
        strokeWidth="2.05309"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftAlignIcon;
