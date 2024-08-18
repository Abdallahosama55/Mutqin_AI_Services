import { TextField } from "@mui/material";
import { Field } from "formik";
import Label from "./Label";
import WrapperInput from "./WrapperInput";

export default function CustomTextField({
  name,
  errors,
  touched,
  label,
  textarea = false,
  placeholder = "",
}) {
  const isError = Boolean(errors[name]) && Boolean(touched[name]);
  return (
    <WrapperInput>
      <Label htmlFor={name}>{label}</Label>
      <Field
        name={name}
        as={TextField}
        fullWidth
        error={isError}
        helperText={Boolean(touched[name]) && errors[name]}
        placeholder={placeholder}
        row={textarea ? 4 : 0}
        minRows={textarea ? 4 : 0}
        maxRows={textarea ? 4 : 0}
        multiline={textarea}
        sx={{
          transition: "none",
          width: "100%",
          fontWeight: "600",
          [!textarea && "height"]: {
            xs: isError ? 45 : 40,
            md: isError ? 65 : 45,
          },
          color: "#001A7880",
          "& fieldset": { borderColor: "#001A7880 !important" },
          "&:hover fieldset": { borderColor: "#001A7880 !important" },
          "& > div": {
            borderRadius: "10px",
            [!textarea && "height"]: { xs: 35, md: 45 },
            fontSize: { xs: 11, md: 15 },
          },
          "& input": {
            py: 1.3,
          },
          "& input::placeholder": {
            fontSize: { xs: 11, md: 15 },
            color: "#001A7880",
            fontWeight: "500",
            opacity: 1,
          },
          "& textarea::placeholder": {
            fontSize: { xs: 11, md: 15 },
            color: "#001A7880",
            fontWeight: "600",
            opacity: 1,
          },
          "& textarea": {
            fontSize: { xs: 11, md: 15 },
          },
          "& .MuiFormHelperText-root": {
            fontSize: { xs: 10, md: 13 },
          },
        }}
      />
    </WrapperInput>
  );
}
