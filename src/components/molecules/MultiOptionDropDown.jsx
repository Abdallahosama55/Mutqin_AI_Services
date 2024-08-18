import { Stack } from "react-bootstrap";
import "../atoms/atoms.css";

const MultiOptionDropDown = ({
  style,
  className,
  options,
  isActive,
  dropDownAction,
  top = false,
  onClose,
}) => {
  return (
    <Stack
      className={`position-absolute translate-middle z-3 ${
        top ? "bottom-100 custom-padding " : "top-50"
      } start-50 rounded-3 border overflow-hidden drop-down border bg-light max-content ${className}`}
    >
      {options?.map((option, index) => {
        return (
          <Stack
            key={index}
            className={`px-2 py-1 align-items-center button-fontSize justify-content-center position-relative  w-100 max-content ${
              (isActive === index || isActive === option.value) &&
              "border border-primary  rounded  text-primary bg-light"
            } ${option.className} custom-color`}
            role="button"
            onClick={() => {
              dropDownAction && dropDownAction(option.value);
            }}
          >
            {option.value}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MultiOptionDropDown;
