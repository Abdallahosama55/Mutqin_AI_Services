import { MenuItem, Select } from "@mui/material";
import { Field } from "formik";
import Label from "./Label";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import WrapperInput from "./WrapperInput";

export default function SelectOption({
  name,
  options,
  errors,
  touched,
  label,
}) {
  const CustomizedSelectForFormik = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    return (
      <WrapperInput>
        <Label htmlFor={name}>{label}</Label>
        <Select
          name={name}
          value={value}
          labelId={name}
          IconComponent={() => (
            <KeyboardArrowDownRoundedIcon
              sx={{
                pointerEvents: "none",
                position: "absolute",
                right: 12,
                fontSize: { xs: 19, md: 24 },
              }}
            />
          )}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
          }}
          sx={{
            width: "100%",
            fontFamily: "Tajawal",
            borderRadius: "10px",
            fontSize: { xs: 11, md: 15 },
            fontWeight: "600",
            height: { xs: 35, md: 45 },
            color: "#001A7880",
            "& fieldset": { borderColor: "#001A7880 !important" },
            "&:hover fieldset": { borderColor: "#001A7880 !important" },
            "& svg": {
              transform: "rotateX(0deg)",
              transitionDuration: "0.4s",
              transitionProperty: "transform",
            },
            '& > div[aria-expanded="true"] ~ svg': {
              transform: "rotateX(180deg)",
            },
          }}
        >
          {children}
        </Select>
      </WrapperInput>
    );
  };

  return (
    <Field
      name={name}
      component={CustomizedSelectForFormik}
      fullWidth
      error={Boolean(errors.email) && Boolean(touched.email)}
      helperText={Boolean(touched.email) && errors.email}
    >
      {options.map((option) => (
        <MenuItem
          dir="rtl"
          key={option.value}
          value={option.value}
          sx={{
            color: "#001b79",
            border: "1px solid #dcdcdc",
            margin: "6px",
            fontFamily: "Tajawal",
            borderRadius: "9px",
            fontSize: { xs: 12, md: 16 },
            fontWeight: 500,
            minHeight: "unset",
            height: { xs: 35, md: 42 },
            "&:hover": {
              backgroundColor: "#5225ce",
              color: "white",
            },
          }}
        >
          {option.name}
        </MenuItem>
      ))}
    </Field>
  );
}
