import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "../Paper";
import SearchInput from "./SearchInput";
import ScrollingMenu from "./ScrollingMenu";
import TapButton from "./TapButton";
import { useSelector, useDispatch } from "react-redux";
import { favToggel } from "../../../redux/slices/contentSections/contentSectionsSlice";
import {
  setCategory,
  closeScroll,
} from "../../../redux/slices/contentSections/contentSectionsSlice";
import iconcatgoriesSelected from "../../../assets/Images/contentsectionicon/nimbus_marketing.png"
import iconcatgories from "../../../assets/Images/contentsectionicon/eos-icons_content-modified-1.png"
import { useTheme } from "@mui/material";
import { useGetCategoriesQuery } from "../../../redux/api/templateSlice";
import { ALL_CATEGORIES } from "@/Util/ContentSections/constants";
import Skeleton from "@mui/material/Skeleton";
import { useBreakpoint } from "use-breakpoint";
import { Padding } from "@mui/icons-material";
import { useState } from "react";

export default function Header() {
  const theme = useTheme();

  const { breakpoint } = useBreakpoint(
    { mobile: 0, tablet: 768, desktop: theme.breakpoints.values.lg },
    "mobile"
  );
  const isBelowDesktop = breakpoint !== "desktop";
  const { data: raw_categories, isLoading, isError } = useGetCategoriesQuery();

  const categories = raw_categories ? [ALL_CATEGORIES, ...raw_categories] : [];

  const favEn = useSelector((state) => state.contentSections.favEn);
  const currCategory = useSelector(
    (state) => state.contentSections.currCategory
  );
  const dispatch = useDispatch();

const [visablebtn, setVisablebtn] = useState(true);
  return (
    <>
      <Box
        className="row justify-content-between mt-5 align-items-center"
        sx={{
          fontWeight: 600,
          fontSize: { xs: 15, sm: 20, md: 20, lg: 20 },
          [theme.breakpoints.down("lg")]: { gap: "10px", fontSize: "1rem" },
        }}
      >
        <Box className="col-md-10 col-12">
          <div className="row justify-content-center">
            <Box className="col-md-9"  sx={{
              marginLeft: { xs: '0%', lg: '21%' },
            }}>
              <SearchInput />
            </Box>
          </div>
        </Box>

   

        <Grid
          className="col-md-1 my-4 my-md-auto col-12"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#692BEF",
              fontWeight: "inherit",
              fontSize: "inherit",
              cursor: "pointer",
              userSelect: "none",
              marginTop: "4px",
            }}
            onClick={() => {
              dispatch(favToggel());
            }}
          >
            {" المفضلة"}
          </Typography>
          <Box component={"span"} sx={{ fontSize: "1.2em" }}>
            {favEn ? (
              <IoMdStar color={theme.palette.pink} />
            ) : (
              <IoMdStarOutline color="#692BEF" />
            )}
          </Box>
        </Grid>
        <Box className="d-md-none d-flex justify-content-center w-100  col-12">
   <button className=" btn-move" dir="rtl" onClick={()=>{setVisablebtn(!visablebtn)}}> <span>+</span> إظهار الاقسام</button>
      </Box>

      </Box>

      <div className="row justify-content-center">
        <div className="col-md-12">
          <Grid container spacing={5} sx={{ mt: "1rem", transitionDuration: 1, justifyContent: "center" }}>
           
          
          <Grid item xs={12} sx={{ transitionDuration: "1s" }}>
              <div sx={{ bgcolor: "transparent" }} className={` d-md-block ${visablebtn ? "d-none" :"d-block"}`}> 
                <ScrollingMenu
                  items={
                    isLoading || isError
                      ? Array(9)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          animation="wave"
                          variant="rounded"
                          width="100%"
                          height={42}
                          sx={{
                            border: "1px solid #E7ECFF",
                            borderRadius: "50px",
                            width: "100%",
                            height: "100%",
                            transitionDuration: "1s",
                            p: 1,
                            [theme.breakpoints.down("lg")]: {
                              borderRadius: "10px",
                              width: "140px !important",
                            },
                          }}
                        />
                      ))
                       
                      : [
                          ...categories.map((category) => (
                            <TapButton
                              key={category.id}
                              selected={category.id === currCategory.id}
                              onClick={() => {
                                dispatch(setCategory({ category }));
                                isBelowDesktop && dispatch(closeScroll());
                              }}
                            >

                            {category.id === currCategory.id   ?  <img src={category.cat_icon} className=" icon_selected_icon text-white px-1" width={25}/> :<img src={category.cat_icon} width={25} className="  px-1"/> }
                           <div className=" ">
                           {category.name}
                           
                           </div>
                             
                            </TapButton>
                          )),
                        ]
                  }
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
