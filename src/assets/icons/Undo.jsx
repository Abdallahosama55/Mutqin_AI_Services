const UndoIcon = ({ width = 24, height = 24, title }) => {
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
        d="M18.6569 11.6C16.9389 10 14.7102 9 12.2493 9C7.93109 9 4.28153 12.03 3 16.22L5.19159 17C5.68069 15.4 6.62621 14.007 7.89345 13.0194C9.16068 12.0319 10.685 11.5002 12.2493 11.5C14.0601 11.5 15.7131 12.22 17.0039 13.38L13.6422 17H22V8L18.6569 11.6Z"
        fill="#5225CE"
      />
    </svg>
  );
};

export default UndoIcon;
