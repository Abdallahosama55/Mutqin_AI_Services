import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

export default function TapButton({ sx, children, onClick, selected }) {
  const theme = useTheme();
  const CompTapButton = styled(Button)(({ selected }) => ({
    border: "1px solid #E7ECFF",
    borderRadius: "20px",
    width: "100%",
    paddingLeft:"0px",
    paddingRight:"0px",

    fontSize: selected ? 15 : 15,
    fontWeight: selected ? 300 : 300,
    height: "55px",
    color: selected ? "#FFFFFF" : "#692BEF",
    background: selected ? "#5225CE" : "#FFFFFF",
    transitionDuration: "1s",
    p: 1,
    [selected ? "&:hover" : ""]: {
      background: "#5225CE",
    },
    [theme.breakpoints.down("critical")]: {
      borderRadius: "12px",
    },
    [theme.breakpoints.up("lg")]: {
      height: "80%",
      paddingLeft:"20px",
      paddingRight:"20px",
      
    },
  }));

  return (
    <CompTapButton sx={sx} onClick={onClick} selected={selected}>
      {children}
    </CompTapButton>
  );
}
