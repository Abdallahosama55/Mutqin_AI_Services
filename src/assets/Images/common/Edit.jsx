import * as React from "react"
import { memo } from "react"
const editIcon = (props) => (
    <svg
        width={18}
        height={18}
        fill="none"
        {...props}
    >
        <g fill="#5225CE" clipPath="url(#a)">
            <path d="m4.586 10.768-.572 2.474a.623.623 0 0 0 .603.755.637.637 0 0 0 .129 0l2.484-.574L12 8.662 9.338 6l-4.752 4.768ZM13.807 6.046 11.951 4.19a.651.651 0 0 0-.919 0L10 5.222 12.778 8l1.032-1.032a.652.652 0 0 0-.003-.922Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h18v18H0z" />
            </clipPath>
        </defs>
    </svg>
)
const EditIcon = memo(editIcon)
export default EditIcon
