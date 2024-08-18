import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../Auth/auth.css";
import logo from "../../../../assets/motqin.png";
import google from "../../../../assets/Images/google.png";
import eye from "../../../../assets/icons/iconoir_eye (1).svg";
import { Link, redirect } from "react-router-dom";
import { SiFacebook } from "react-icons/si";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../../atoms/Loader/Loader";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

const SignIn = () => {

  const dispatch = useDispatch();
  const IsLogin = useSelector(
    (state) => state.api.IsLogin
  );



  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");
  const emailFromLocal = localStorage.getItem("email");
  const passwordFromLocal = localStorage.getItem("password");
  const token = localStorage.getItem("token");
  const [checkBoxValue, setCHeckBoxValue] = useState(false);
  const [searchParams] = useSearchParams();
;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const setIslogin = () => {
    localStorage.setItem('IsLogin', "true");
  };

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");


    if (accessToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem('IsLogin', "true");
      // localStorage.setItem("refreshToken", refreshToken);
      // You might navigate using your preferred method here
      navigate("/control");

      window.location.reload(); // Redirect to the control page
      localStorage.setItem('IsLogin', "true");
    }
  }, []);
 

  const errorMessage = (error) => {

  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("الإيميل غير صالح").required("ادخل الايميل"),
      password: Yup.string().required("ادخل الباسورد"),
    }),
    onSubmit: async (values) => {
      try {
        setIsloading(true);
        const response = await axios.post(
          `https://backend.mutqinai.com/api/user/login/`,
          values
        );

        // Assuming the response contains user data
        const userData = response.data;
        const tokenKey = userData.tokens.access;

        // Save token to localStorage
        if (checkBoxValue) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        localStorage.setItem("token", tokenKey);
       
        // if (!userData.is_active) {
        //   navigate("/verifyaccount");
        // }
   
        setIsloading(false);
        toast.success("تم التسجيل بنجاح");

        navigate("/control");
        window.location.reload(); // Redirect to the control page
        localStorage.setItem('IsLogin', "true");

      } catch (error) {
        setIsloading(false);
        // Handle error
        // console.log(error.response.data.message);
        toast.error(error.response.data.message);

        if (error.response.data.message === "يرجي تفعيل البريد الالكتروني") {
          navigate("/verifyaccount");
          try {
            //Resend OTP
            const response = await axios.post(
              `https://backend.mutqinai.com/api/user/resend-otp/`,
              { email: values.email }
            );
            const resData = response.data;
            toast.success("تم  ارسال الرقم ");
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
        // setErrorSignIn("يوجد خطأ بالايميل او الباسورد");
      }
    },
  });

  return (
    <section
      className="d-flex py-md-5 py-5 justify-content-center align-items-center ar bg-white "
      dir="rtl"
    >
      <div className="d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12">
        <LazyLoadImage
          alt={"hi"}
      
          src={logo}
          className=" auth_logo"
          opacity="true"
          placeholderSrc={logo}
        />

        <h5
          className="text-move  py-4"
          style={{ color: "#ed5ab3", border: "1px" }}
        >
          {" "}
          تسجيل الدخول إلى مُتقِن{" "}
        </h5>
        <form
          className="mt-2 d-flex flex-column gap-1 align-content-end w-100 px-5  gap-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-2">
            <label htmlFor="email" className=" fs_auth mb-2 text-move ">
              بريدك الإلكتروني{" "}
            </label>
            <input
              id="email"
              type="text"
              className="input_style_auth"
              placeholder="ادخل بريدك الإلكتروني"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password" className="fs_auth  text-move">
            كلمة المرور
          </label>
          <span className=" span_input position-relative z-2 d-flex  justify-content-end ">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="input_style_auth"
              placeholder="ادخل كلمة المرور "
              {...formik.getFieldProps("password")}
            />
            <img src={eye} onClick={togglePasswordVisibility}  className="  position-absolute  top-0 pb-2 pt-3 ps-4  eye-icon justify-content-end z-3"/>
          </span>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
          <div className=" d-flex row ">
            <div className=" col">
              <div className="form-check fw-bold   text-move">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={checkBoxValue}
                  onChange={() => setCHeckBoxValue(!checkBoxValue)}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label fw-medium fs_auth"
                  htmlFor="flexCheckDefault "
                >
                  تذكرني
                </label>
              </div>
            </div>

            <div className=" col " dir="ltr">
              <Link
                to="/forgotpassword"
                className=" fs-6 text-black-50   text-decoration-none fw-light"
              >
                نسيت كلمة المرور ؟
              </Link>
            </div>
          </div>
          <div className=" text-center text-danger">{errorSignIn}</div>
          <button
            type="submit"
            className="button_auth fs_auth"
            style={{ background: "#ed5ab3", border: "1px" }}
          >
            {isloading ? <Loader /> : "تسجيل الدخول"}
          </button>
        </form>
        <p className=" fw-normal my-2 p-3  text-move ">أو دخول بواسطة</p>

        <div className="d-flex flex-column gap-3 align-content-end w-100 px-5  gap-2" onClick={()=>setIslogin()}>
          <Link
            to="https://backend.mutqinai.com/api/google-login"
            className="button_auth fs_auth text-decoration-none bg-white"
            rel="noopener noreferrer"
          >
            <LazyLoadImage
              effect="blur"
              src={google}
              alt={"hi"}
              className="h-100"
              opacity="true"
              placeholderSrc={google}
            />
            <button
              className="bg-white"
              style={{ position: "relative", color: "#001b79" }}
            >
              جوجل
            </button>
          </Link>

          <button className="button_auth fs_auth  d-none" >
            <SiFacebook className=" white fs-5" />
            فيس بوك
          </button>
        </div>

        <span className="mt-4 d-flex gap-2">
          <p className=" fs-6 text-black-50">ليس لديك حساب؟</p>
          <Link
            to="/signup"
            className="fs-6 fw-bolder  text-move text-decoration-none   "
          >
            إنشاء حساب
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignIn;
