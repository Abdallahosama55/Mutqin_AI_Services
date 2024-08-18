import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { FaBars } from "react-icons/fa6";

import "./ArtSideBar.css";

const ArtSideBar = ({ setSwitchSideBar }) => {
  const [lang, setLang] = useState("arabic");

  const initialValues = {
    selectlang: "",
    textarea: "",
  };

  const validationSchema = Yup.object({
    selectlang: Yup.string(),
    textarea: Yup.string(),
  });

  const onSubmit = (values, { resetForm }) => {


    resetForm();
  };
  return (
    <div className="    art-sidebar-container">
      <div>
        <FaBars
          style={{ cursor: "pointer" }}
          onClick={() => setSwitchSideBar((switched) => !switched)}
        />

        <div className=" art-sidebar-title">مُتقِن - مساعدك الذكي</div>

        <div className="art-sidebar-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ values, handleChange }) => (
              <Form className="w-100">
                <Field
                  className="select-from-box"
                  as="select"
                  name="selectlang"
                  id="selectlang">
                  <option
                    className="option-form"
                    value="arabic">
                    العربية
                  </option>
                  <option value="eng">الانجليزي</option>
                </Field>

                <div className="textarea-label">كيف يمكنني مساعدتك اليوم؟</div>

                <Field
                  className="textarea-form w-100"
                  as="textarea"
                  id="textarea"
                  name="textarea"
                  placeholder="ضع النص الذي ترغب في الكتابة عن أو أمر لتنفيذه.."
                  style={{ resize: "none", outLine: "none" }}
                />
                <button
                  className="formik-button"
                  type="submit">
                  اكتب
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ArtSideBar;
