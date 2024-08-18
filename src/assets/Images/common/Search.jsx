import * as React from "react";
import { memo } from "react";
const searchIcon = (props) => (
  <svg width={20} height={20} fill="none" {...props}>
    <path
      stroke="#5225CE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19 19-4.343-4.343m0 0A8 8 0 1 0 3.344 3.344a8 8 0 0 0 11.313 11.313Z"
    />
  </svg>
);
const SearchIcon = memo(searchIcon);
export default SearchIcon;
