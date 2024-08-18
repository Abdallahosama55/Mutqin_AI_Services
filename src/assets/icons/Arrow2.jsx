import { themeColors } from "@/Util/theme";
const ArrowIcon2 = ({
  color = themeColors.colors.light,
  width = 12,
  height = 8,
  rotate,
  ...props
}) => (
  <svg
    style={{ transform: `rotate(${rotate}deg)` }}
    width={width}
    height={height}
    viewBox="0 0 37 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.791 12.1667L22.7702 18.0001L16.791 23.8334"
      stroke="#5225CE"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.4993 34.6668C27.9345 34.6668 35.5827 27.2052 35.5827 18.0002C35.5827 8.79516 27.9345 1.3335 18.4993 1.3335C9.06422 1.3335 1.41602 8.79516 1.41602 18.0002C1.41602 27.2052 9.06422 34.6668 18.4993 34.6668Z"
      stroke="#5225CE"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowIcon2;
