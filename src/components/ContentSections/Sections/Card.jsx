import Paper from "../Paper";
import { Stack, Typography, Box, CircularProgress } from "@mui/material";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Card({
  id,
  favEn,
  image,
  title,
  body,
  onClickFav,
  onClick,
  changes = [],
  isLoading,
}) {
  const favLoading = useSelector((state) => state.contentSections.favLoading);
  return (
    <Paper
      onClick={onClick}
      changes={[favEn, favLoading, ...changes]}
      sx={{
        padding: "2rem",
        height: "100%",
        userSelect: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#8B6DDC", // Change this to your desired hover color
          ".title": {
            color: "#ffffff", // Change title color to white on hover
          },
          ".bodycard": {
            color: "#ffffff", // Change body color to white on hover
          },
          ".icon": {
            filter: "brightness(0) invert(1) !important", // Apply filter to icon on hover
            opacity:"100%"
          },
        },
      }}
    >
      <Stack flexDirection={"column"} alignItems={"start"} gap={2}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"start"}
          flexDirection={"row"}
          width={"100%"}
        >
          <img src={image} alt="Card image" />
          {favLoading.indexOf(id) !== -1 ? (
            <CircularProgress
              size={30}
              sx={{
                color: "#001A78",
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          ) : (
            <Box
              component="span"
              sx={{ fontSize: 30, cursor: "pointer", opacity: "60%" }}
              onClick={onClickFav}
              className="icon" // Add class name for icon
            >
              {favEn ? (
                <IoMdStar color={"#EB59B1"} />
              ) : (
                <IoMdStarOutline color={"#001A78"} />
              )}
            </Box>
          )}
        </Stack>
        <Typography
          variant="h6"
          color={"#692BEF"}
          fontSize={16}
          fontWeight={600}
          textAlign={"start"}
          className="title"
          sx={{ transition: "color 0.3s ease" }} // Smooth color transition
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color={"#001A78"}
          fontSize={15}
          fontWeight={300}
          className="bodycard"
          textAlign={"start"}
        >
          {body}
        </Typography>
      </Stack>
    </Paper>
  );
}
