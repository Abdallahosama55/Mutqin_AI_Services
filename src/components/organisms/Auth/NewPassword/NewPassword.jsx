import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../Auth/auth.css";
import logo from "../../../../assets/Images/logo.svg";
import toast from "react-hot-toast";
import eye from "../../../../assets/icons/iconoir_eye (1).svg";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Loader } from "../../../atoms/Loader/Loader";

const NewPassword = () => {
  const { id } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm((prevShowPassword) => !prevShowPassword);
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("ادخل كلمة المرور")
      .min(6, "يجب أن تكون كلمة المرور على الأقل 6 أحرف"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "يجب أن تتطابق مع كلمة المرور المدخلة"
      )
      .required("ادخل تأكيد كلمة المرور"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // You can make an API call to change the password
      try {
        setIsloading(true);
        const response = await axios.post(
          `https://backend.mutqinai.com/api/reset_password/${id}`,
          values
        );

        // Assuming the response contains user data
        const userData = response.data;
        setIsloading(false);
        setMessage(userData.details);
        toast.success("تم تغير كلمة المرور ");
        navigate("/signin");
      } catch (error) {
        // Handle error
        setIsloading(false);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <section
      className="d-flex justify-content-center  ar  "
      dir="rtl">
      <div className=" py-5  d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 ">
        <LazyLoadImage
          alt={"hi"}
          effect="blur"
          src={logo}
          className="h-100 img_xxl"
          opacity="true"
          placeholderSrc={logo}
        />
        <h2 className="mt-5 text-move fw-bolder mt-1 text-move">
          أنشأ كلمه مرور جديدة
        </h2>
        <p
          style={{ fontSize: "15px", width: "80%" }}
          className="text-move fw-normal mt-1 text-center">
          رجاءا أدخل كلمة المرور مع التأكيد كلمة مرورك الجديدة ستحتاح إلى إعادة
          تسجيل الدخول
        </p>

        <form
          className="d-flex flex-column justify-content-between w-100 px-5 h-75 "
          onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-column gap-2">
            <label
              htmlFor="password"
              className="fs_auth fw-bold  text-move">
              كلمة المرور
            </label>
            <span className=" span_input  position-relative z-2 d-flex  justify-content-end">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input_style_auth"
                placeholder="كلمة المرور"
                {...formik.getFieldProps("password")}
              />
              <img src={eye} onClick={togglePasswordVisibility}  className="eye-icon  position-absolute  top-0 pb-2 pt-3 ps-4  justify-content-end z-3"/>
            </span>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}

            <label
              htmlFor="confirmPassword"
              className="fs_auth fw-bold  text-move">
              تأكيد كلمة المرور
            </label>
            <span className=" span_input position-relative z-2 d-flex  justify-content-end">
              <input
                id="confirmPassword"
                type={showPasswordConfirm ? 'text' : 'password'}
                
                className="input_style_auth"
                placeholder="تأكيد كلمة المرور"
                {...formik.getFieldProps("confirmPassword")}
              />
              {/* ... */}
              <img src={eye} onClick={togglePasswordVisibilityConfirm}  className="  eye-icon position-absolute  top-0 pb-2 pt-3 ps-4  justify-content-end z-3"/>
            </span>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <div className=" text-text-move">{message}</div>
          <button
            type="submit"
            style={{ background: "#ed5ab3", border: "1px" }}
            className="btn-move mt-3 fs_auth">
            {isloading ? <Loader /> : "تغيير كلمة المرور"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewPassword;
