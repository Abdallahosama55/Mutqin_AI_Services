const RedoIcon = ({ width = 24, height = 24, title }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">{title && <title>{title}</title>}
      <path
        d="M6.34311 11.6C8.06109 10 10.2898 9 12.7507 9C17.0689 9 20.7185 12.03 22 16.22L19.8084 17C19.3193 15.4 18.3738 14.007 17.1066 13.0194C15.8393 12.0319 14.315 11.5002 12.7507 11.5C10.9399 11.5 9.2869 12.22 7.99609 13.38L11.3578 17H3V8L6.34311 11.6Z"
        fill="#5225CE"
      />
    </svg>
  );
};

export default RedoIcon;
