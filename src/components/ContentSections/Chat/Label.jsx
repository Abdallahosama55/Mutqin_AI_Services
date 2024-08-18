import { styled } from "@mui/material";

export default function Label({ children, ...props }) {
  const CustomLabel = styled("label")({});
  return (
    <CustomLabel
      sx={{
        pt: { xs: 1.5 },
        pb: { xs: 0.5 },
        fontSize: { xs: 10, md: 15 },
        color: "#001B79",
      }}
      {...props}
    >
      {children}
    </CustomLabel>
  );
}
