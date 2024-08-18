import { Box } from "@mui/material";
import Header from "../../components/ContentSections/Sections/Header";
import CardsList from "../../components/ContentSections/Sections/CardsList";
import ThemeWrapper, {
  theme,
} from "../../components/ContentSections/ThemeWrapper";
export default function ContentSections() {
  return (
    <ThemeWrapper>
      <Box
        px={"35px"}
        sx={{
          maxHeight: "calc(100vh - 59px)",
          height: "calc(100vh - 59px)",
          overflow: "scroll",
          [theme.breakpoints.down("sm")]: {
            pl: "26px",
          },
        }}
        pb={4}
      >
        <Header />
        <Box sx={{ height: 50 }}></Box>
        <CardsList />
      </Box>
    </ThemeWrapper>
  );
}
