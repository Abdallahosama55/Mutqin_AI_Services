import { Box } from "@mui/material";

export default function WrapperInput({ children, sx, ...props }) {
  return <Box sx={{ my: { xs: 0.6, md: 1 } }}>{children}</Box>;
}
