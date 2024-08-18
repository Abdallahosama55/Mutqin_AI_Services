const BoldIcon = ({ width = 24, height = 24, rotate, ...props }) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.4"
        y="0.4"
        width="17.2"
        height="17.2"
        rx="1.6"
        stroke="#5225CE"
        strokeWidth="0.8"
      />
      <path
        d="M7.16194 6.35294L5.16886 8.55581L3.17578 6.35294M7.16194 10.1293L5.16886 12.3322L3.17578 10.1293"
        stroke="#5225CE"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1346 12.3322L13.1415 10.1293L11.1484 12.3322M15.1346 8.55585L13.1415 6.35298L11.1484 8.55585"
        stroke="#5225CE"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BoldIcon;
