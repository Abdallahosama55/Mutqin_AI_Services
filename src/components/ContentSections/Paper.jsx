import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useMemo } from "react";

export default function Paper({ sx, children, onClick, changes = [] }) {
  const CompPaper = styled(Box, {
    shouldForwardProp: (prop) =>
      prop !== "color" && prop !== "variant" && prop !== "sx",
  })(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 10,
    border: "1px solid #e7ecff",
    boxShadow: theme.shadows.tap,
  }));
  return useMemo(
    () => (
      <CompPaper sx={sx} onClick={onClick}>
        {children}
      </CompPaper>
    ),
    [...changes]
  );
}
