import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "./Card";
import { Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useGetTemplatesQuery,
  useFavoriteTemplatesMutation,
} from "../../../redux/api/templateSlice";
import { ALL_CATEGORIES } from "@/Util/ContentSections/constants";
import { setFavLoad } from "@/redux/slices/contentSections/contentSectionsSlice.js";
import { v4 as uuid } from "uuid";

export default function CardsList() {
  const search = useSelector((state) => state.contentSections.search);
  const {
    data: templates,
    isFetching: isFetchingTemplates,
    isLoading: isLoadingTemplates,
  } = useGetTemplatesQuery();
  const [favoriteTemplates, { isLoading: isLoadingFavorite }] =
    useFavoriteTemplatesMutation();
  const favMain = useSelector((state) => state.contentSections.favEn);
  const currCategory = useSelector(
    (state) => state.contentSections.currCategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shownCards = templates
    ?.filter(
      (template) =>
        (currCategory.id === ALL_CATEGORIES.id ||
          template.category === currCategory.id) &&
        (search.length === 0 ||
          template.title.includes(search) ||
          template.description.includes(search)) &&
        (!favMain || (favMain && template.is_favorite))
    )
    .map((template, index) => {
      return (
        <Grid xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            id={template.id}
            image={template.icon}
            title={template.title}
            body={template.description}
            favEn={template.is_favorite}
            changes={[currCategory, search, isLoadingFavorite]}
            isLoading={isLoadingFavorite}
            onClickFav={async (event) => {
              event.stopPropagation();
              dispatch(setFavLoad({ action: "add", template_id: template.id }));
              await favoriteTemplates(template.id);
              dispatch(
                setFavLoad({ action: "remove", template_id: template.id })
              );
            }}
            onClick={() => {
              navigate(`/content-section/${template.id}/${uuid()}`);
            }}
          ></Card>
        </Grid>
      );
    });
  return (
    <Grid container spacing={3}>
      {shownCards?.length ? (
        shownCards
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{
              width: "100%",
              textAlign: "center",
              opacity: "60%",
              marginTop: "6rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {isFetchingTemplates || isLoadingTemplates ? (
              <>
                <CircularProgress
                  size={25}
                  sx={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                {"جاري تحديث أقسام المحتوى"}
              </>
            ) : (
              "لا تتوفر أي خدمة لعرضها."
            )}
          </Typography>
        </>
      )}
    </Grid>
  );
}
