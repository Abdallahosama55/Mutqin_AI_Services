import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useSelector, useDispatch } from "react-redux";
import { scroll } from "../../../redux/slices/contentSections/contentSectionsSlice";
import { useTheme } from "@mui/material";
import { useBreakpoint } from "use-breakpoint";

export default function ScrollingMenu({ items }) {
  const scrolled = useSelector((state) => state.contentSections.scrolled);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { breakpoint } = useBreakpoint(
    { mobile: 0, tablet: 768, desktop: theme.breakpoints.values.lg },
    "mobile"
  );
  const isBelowDesktop = breakpoint !== "desktop";

  return (
    <Grid
      container
      spacing={0}
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "space-around",
        position: "relative",
      }}
    >
      <Grid
        xs={9}
        lg={11}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            zIndex: theme.zIndex.drawer,
          }}
        >
          <Box
            sx={{
         
              flexWrap: "wrap",
              gap: "0.5rem",
              padding: 0,
              justifyContent:"center",
              display:"flex",
              transitionDuration: "1.6s",
   
            }}
          >
            {items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  flex: isBelowDesktop ? "1 1 calc(100% / 5 - 1rem)" : "unset",
         
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
 
    </Grid>
  );
}
