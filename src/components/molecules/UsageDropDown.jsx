import { Stack } from "react-bootstrap";

const UsageDropDown = ({
  options,
  isActive,
  dropDownAction,
  top = false,
  onClose,
}) => {
  return (
    <Stack
      className={`position-absolute translate-middle p-2 z-dropdown py-1 bg-white  ${
        top ? "bottom-100 mb-4" : "top-50"
      } start-50 rounded-3  overflow-hidden drop-down  bg-light max-content border border-primary`}
      style={{
        width: "250px",
        backgroundColor: "white",
        zIndex: 99900,
      }}
    >
      {options?.map((option, index) => {
        return (
          <Stack
            key={index}
            className={`p-2 align-items-center  button-fontSize justify-content-center position-relative fs-5 w-100 max-content ${
              (isActive === index || isActive === option.value) &&
              " fw-medium rounded text-primary bg-light"
            } ${option.className}`}
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

export default UsageDropDown;
