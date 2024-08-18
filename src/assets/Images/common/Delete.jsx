import * as React from "react";
import { memo } from "react";
const deleteIcon = (props) => (
  <svg width={18} height={18} fill="none" {...props}>
    <path
      fill="#5225CE"
      d="M7.356 12.75h.75V6h-.75v6.75Zm2.538 0h.75V6h-.75v6.75ZM4.5 15V4.5h-.75v-.75h3v-.577h4.5v.577h3v.75h-.75V15h-9Z"
    />
  </svg>
);
const DeleteIcon = memo(deleteIcon);
export default DeleteIcon;
