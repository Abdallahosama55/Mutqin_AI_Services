const LeftTabIcon = ({ width = 24, height = 24, title }) => {
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
        d="M3 9.28571V15.7143L6 12.5L3 9.28571ZM3 20H21V17.8571H3V20ZM3 7.14286H21V5H3V7.14286ZM9 11.4286H21V9.28571H9V11.4286ZM9 15.7143H21V13.5714H9V15.7143Z"
        fill="#5225CE"
      />
    </svg>
  );
};

export default LeftTabIcon;
