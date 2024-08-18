import { Button, Box, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import {
  ALL_LANGUAGES,
  CONTENT_STYLES,
  RESULT_NUM,
} from "@/Util/ContentSections/constants";
import SelectOption from "./SelectOption";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomTextField from "./CustomTextField";

export default function MyForm({
  children,
  formInfo,
  fields,
  onClick,
  isLoading,
  initialFormValues,
  ...prop
}) {
  const extrValues = Object.fromEntries(fields.map((i) => [[i.name], ""]));
  const initalValues = {
    language: ALL_LANGUAGES[0].value,
    tone_of_voice: CONTENT_STYLES[0].value,
    number_of_results: RESULT_NUM[0].value,
    ...extrValues,
    ...initialFormValues,
  };

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={initalValues}
      validationSchema={object(
        Object.fromEntries(
          Object.keys(initalValues).map((field_name) => [
            field_name,
            string().required("يرجى ادخال الحقل"),
          ])
        )
      )}
      onSubmit={(values, formikHelpers) => {
        onClick(values);
      }}
    >
      {({ errors, isValid, touched, dirty, form }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            ...prop.style,
          }}
        >
          {formInfo}
          <Box>
            <SelectOption
              name={"language"}
              options={ALL_LANGUAGES}
              errors={errors}
              touched={touched}
              label={"اختيار اللغة"}
            />

            {fields.map((field) => (
              <CustomTextField
                key={field.id}
                name={field.name}
                errors={errors}
                touched={touched}
                label={field.title}
                placeholder={field.description}
                textarea={field.field_type === "textarea"}
              />
            ))}

            <Grid2 container>
              <Grid2 xs={5.7}>
                <SelectOption
                  name={"tone_of_voice"}
                  options={CONTENT_STYLES}
                  errors={errors}
                  touched={touched}
                  label={"أسلوب المحتوي"}
                />
              </Grid2>

              <Grid2 xs={0.6}></Grid2>

              <Grid2 xs={5.7}>
                <SelectOption
                  name={"number_of_results"}
                  options={RESULT_NUM}
                  errors={errors}
                  touched={touched}
                  label={"عدد النتائج"}
                />
              </Grid2>
            </Grid2>
          </Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{
              backgroundColor: "#5225CE !important",
              color: "white",
              borderRadius: "10px",
              width: { xs: "50%", md: "40%" },
              mx: "auto",
              mt: { xs: 2, md: 3 },
              height: { xs: 35, md: 45 },
            }}
          >
            {isLoading ? (
              <CircularProgress
                sx={{
                  color: "#fff",
                  height: { xs: "20px !important", md: "30px !important" },
                  width: { xs: "20px !important", md: "30px !important" },
                }}
              />
            ) : (
              "إنشاء"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
