import * as React from "react";
import { memo } from "react";
const arrow = (props) => (
  <svg width={19} height={12} fill="none" {...props}>
    <path
      fill="#5225CE"
      fillRule="evenodd"
      d="M10.921 11.392c-.374.39-.88.608-1.409.608a1.953 1.953 0 0 1-1.408-.608L.584 3.55A2.126 2.126 0 0 1 0 2.08C0 1.527.21.998.584.608c.374-.39.881-.61 1.41-.609.529 0 1.036.22 1.41.61l6.108 6.372L15.621.61a1.95 1.95 0 0 1 1.402-.585 1.953 1.953 0 0 1 1.392.608c.37.386.58.907.585 1.453a2.128 2.128 0 0 1-.559 1.463l-7.518 7.844-.002-.001Z"
      clipRule="evenodd"
    />
  </svg>
);
const ArrowDownIcon = memo(arrow);
export default ArrowDownIcon;
