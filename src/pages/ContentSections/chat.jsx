import { Stack, Box, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import EditorPanel from "../../elements/EditorPanel";
import MyForm from "../../components/ContentSections/Chat/MyForm";
import ThemeWrapper, {
  theme,
} from "../../components/ContentSections/ThemeWrapper";
import {
  useGetTemplatesQuery,
  useCreateUserTemplateMutation,
  useUpdateUserTemplateMutation,
  useLazyGetUserDocumentQuery,
} from "../../redux/api/templateSlice";
import FormInfo from "../../components/ContentSections/Chat/FormInfo";
import MyFormSkeleton from "../../components/ContentSections/Chat/MyFormSkeleton";
import { setContent } from "@/redux/features/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Chat({ isNew = true }) {
  const [currentData, setCurrentData] = useState({});
  const content = useSelector((state) => state.checker.content);
  const { template_id, document_id, ...params } = useParams();
  const request_id = isNew ? uuid() : params.request_id;
  const initialFormValues = useRef({});
  const timer = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    createUserTemplate,
    { isLoading: isLoadingForm, isSuccess: isSuccessForm },
  ] = useCreateUserTemplateMutation();

  const [updateUserTemplate] = useUpdateUserTemplateMutation();
  const [
    useGetUserDocument,
    {
      data: getUserDocument,
      isLoading: isLoadingDocument,
      isFetching: isFetchingDocument,
    },
  ] = useLazyGetUserDocumentQuery();
  const { data: tempaltes, isLoading } = useGetTemplatesQuery();
  const tempalte = tempaltes?.find((temp) => temp.id == template_id);
  const formInfo = <FormInfo tempalte={tempalte} isLoading={isLoading} />;
  const staticInputData =
    getUserDocument && Object.hasOwn(getUserDocument, "static_input_data")
      ? {
          ...getUserDocument.static_input_data,
          number_of_results: Number(
            getUserDocument.static_input_data?.num_of_results
          ),
          "الجمهور المستهدف":
            getUserDocument.static_input_data?.target_audience === "everyone"
              ? "الجميع"
              : getUserDocument.static_input_data?.target_audience,
        }
      : {};

  useEffect(() => {
    if (!isNew) {
      useGetUserDocument({ request_id }, false);
      setCurrentData(getUserDocument);
    }
  }, [template_id, document_id, request_id]);

  useEffect(() => {
    initialFormValues.current = {
      ...staticInputData,
      ...getUserDocument?.input_data,
    };
    setCurrentData(getUserDocument);
    dispatch(setContent(getUserDocument?.content));
  }, [getUserDocument]);

  useEffect(() => {
    if (
      !isNew &&
      currentData &&
      Object.hasOwn(currentData, "content") &&
      currentData.content !== content
    ) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        updateUserTemplate({
          request_id,
          title: currentData?.title,
          content,
        });
      }, 600);
    }
  }, [content]);
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
          display: "flex",
          bgcolor:"#fff",
          borderRadius:"8px",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.down("sm")]: { pl: 0 },
            height: "fit-content",
          }}
          mb={4}
        >
          <Stack
            justifyContent={"space-between"}
            flexDirection={"row"}
            gap={3}
            height={"100%"}
            sx={(theme) => ({
              m: "auto",
              [theme.breakpoints.down("lg")]: {
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "550px",
              },
            })}
          >
            <Box
              className="rounded-4 mt-4"
              sx={{
                border: "1px solid rgba(82, 37, 206, 0.2)",
                flex: 1,
                width: "100%",
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 6 },
              }}
            >
              <Stack sx={{ gap: { xs: 0, md: 2 }, height: "100%" }} gap={5}>
                {isLoading ? (
                  <MyFormSkeleton />
                ) : (
                  <MyForm
                    initialFormValues={initialFormValues.current}
                    fields={tempalte["template_fields"]}
                    formInfo={formInfo}
                    isLoading={isLoadingForm}
                    onClick={async (values) => {
                      var form_data = new FormData();

                      for (var key in values) {
                        form_data.append(key, values[key]);
                      }
                      const { data } = await createUserTemplate({
                        template_id,
                        document_id,
                        request_id,
                        form_data,
                      });

                      if (isNew) {
                        navigate(
                          `/content-section/${template_id}/${document_id}/${request_id}`
                        );
                      }
                      setCurrentData(data);

                      dispatch(setContent(data?.content));
                    }}
                  />
                )}
              </Stack>
            </Box>
            <Box
              width={"fit-content"}
              flex={2.5}
              sx={(theme) => ({
                "& > div": { padding: "0 !important" },
                [theme.breakpoints.down("lg")]: {
                  width: "100%",
                  height: "100%",
                },
                position: "relative",
              })}
            >
              {isLoadingDocument || isFetchingDocument ? (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ) : null}
              <Box
                sx={{
                  [(isLoadingDocument || isFetchingDocument) && "opacity"]: 0.2,
                  [(isLoadingDocument || isFetchingDocument) &&
                  "pointer-events"]: "none",
                  [(isLoadingDocument || isFetchingDocument) && "user-select"]:
                    "none",
                  height: "100%",
                }}
              >
                <EditorPanel
                  placeholderText={"كيف يمكنني مساعدتك اليوم؟"}
                  isInner={true}
                  neverSplit={true}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </ThemeWrapper>
  );
}
