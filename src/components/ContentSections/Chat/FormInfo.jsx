import { Box, Stack, Typography, styled } from "@mui/material";

export default function FormInfo({ tempalte }) {
  const Image = styled("img")({});

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"start"}
      alignItems={"start"}
      gap={2}
      sx={(theme) => ({
        [theme.breakpoints.down("lg")]: { flexDirection: "column" },
      })}
    >
      <Image src={tempalte?.icon} sx={{ width: { xs: 40, md: "auto" } }} />
      <Box>
        <Typography
          variant="h6"
          color={"#692BEF"}
          fontSize={16}
          fontWeight={500}
          textAlign={"start"}
          sx={{
            fontSize: { xs: 13, md: 16 },
          }}
        >
          {tempalte?.title}
        </Typography>
        <Typography
          variant="body1"
          color={"#001A78"}
          fontWeight={300}
          sx={(theme) => ({
            [theme.breakpoints.down("lg")]: { maxWidth: "100%" },
            fontSize: { xs: 11, md: 14 },
          })}
          textAlign={"start"}
        >
          {tempalte?.description}
        </Typography>
      </Box>
    </Stack>
  );
}
