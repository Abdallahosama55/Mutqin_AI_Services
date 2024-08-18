import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../../../assets/motqin.png";
import google from "../../../../assets/Images/google.png";
import { Link, useSearchParams } from "react-router-dom";
import { SiFacebook } from "react-icons/si";
import toast from "react-hot-toast";
import eye from "../../../../assets/icons/iconoir_eye (1).svg";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Loader } from "../../../atoms/Loader/Loader";

// import { baseURLl } from "../../../redux/api/url";

const SignUp = () => {
  const [isloading, setIsloading] = useState(false);
  const [currency, setCurrency] = useState("");
  const token = localStorage.getItem("token");

  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      // You might navigate using your preferred method here
      navigate("/control");
      window.location.reload(); // Redirect to the control page
    }
  }, [searchParams]);
  const getData = async () => {
    const res = await axios.get("https://ipapi.co/json/");
    setCurrency(res.data.currency);

  };
  

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  const navigate = useNavigate();
  const [errorSignUp, setErrorSignUp] = useState(null);
  const [settings, setSettings] = useState(true);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    region: currency,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("يرجى إدخال اسمك"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("يرجى إدخال بريدك الإلكتروني"),
    password: Yup.string().required("يرجى إدخال كلمة المرور"),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "يجب أن تتطابق كلمة المرور الجديدة"
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission here
    const { name, email, password, confirmPassword, region } = values;
    try {
      setIsloading(true);
      const response = await axios.post(
        `https://backend.mutqinai.com/api/users/`,
        {
          name,
          email,
          password,
          region: currency,
        }
      );

      // Assuming the response contains user data
      const userData = response.data;
      const tokenKey = userData.tokens.access;

      // Save token to localStorage
      localStorage.setItem("token", tokenKey);
      setIsloading(false);
      toast.success("تم انشاء حساب و ارسال الكود");
      // Navigate to the desired route
      navigate("/verifyaccount");
    } catch (error) {
      setIsloading(false);
      // Handle error
      toast.error(error.response.data.message);
    }
  };

  return (
    <div dir="rtl" className="  py-md-5 ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header ar">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
         
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <section className="d-flex justify-content-center align-items-center ar">
              <div className="d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 h_vh_UP">
                <LazyLoadImage
                  alt={"hi"}
                
                  src={logo}
                  className=" auth_logo"
                  opacity="true"
                  placeholderSrc={logo}
                />
                <h5
                  className="text-move  py-2"
                  style={{ color: "#ed5ab3", border: "1px" }}
                >
                  {" "}
                  إنشاء حساب جديد{" "}
                </h5>
                <div className="d-flex mt-3 flex-column gap-1 align-content-end w-100 px-5  gap-2">
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className="input_style_auth mb-1"
                    placeholder="ادخل اسم المستخدم "
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />

                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className="input_style_auth  mb-1"
                    placeholder="ادخل بريدك الإلكتروني  "
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
<div className="position-relative z-2 d-flex  justify-content-end ">

                  {/* <span className=" span_input  mb-1"> */}
                  <Field
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="input_style_auth "
                    placeholder="ادخل كلمة المرور "
                  />
                  <img src={eye} onClick={togglePasswordVisibility}  className="eye-icon  position-absolute  top-0 pb-2 pt-3 ps-4  justify-content-end z-3"/>
                  </div>
                  {/* </span> */}

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                  <div className="position-relative z-2 d-flex  justify-content-end ">
                  <Field
                    id="confirmPassword"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    className="input_style_auth  mb-1"
                    placeholder="  ادخل تأكيد كلمة المرور "
                  />
                  <img src={eye} onClick={togglePasswordVisibilityConfirm}  className="eye-icon  position-absolute  top-0 pb-2 pt-3 ps-4  justify-content-end z-3"/>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                  <div className="form-check fw-bold  primary">
                    <Field
                      type="checkbox"
                      name="privacyPolicy"
                      id="privacyPolicy"
                      required
                      className="form-check-input pointer"
                    />
                    <Link to= "/Policy" target="_blank" className=" text-decoration-none">
                    
                    
                    <label
                    // htmlFor="privacyPolicy"
                    className="form-check-label text-move fs_auth fw-normal "
                    target="_blank"
                  >
                    أوافق على{" "}
                    <span
                      className="pointer"
                      // data-bs-toggle="modal"
                      // data-bs-target="#exampleModal"
                    >
                      سياسة الخصوصية
                    </span>
                  </label>
                    
                    
                    </Link>

                  </div>
                  <div className=" text-center text-danger">{errorSignUp}</div>
                  <button
                    type="submit"
                    className="button_auth fs_auth"
                    style={{ background: "#ed5ab3", border: "1px" }}
                  >
                    {" "}
                    {isloading ? <Loader /> : " إنشاء حساب "}
                  </button>
                </div>
                <p className=" fw-normal my-2  text-move">أو إنشاء بواسطة </p>
                <div className="d-flex flex-column gap-3 align-content-end w-100 px-5  gap-2">
                  <Link
                    to="https://backend.mutqinai.com/api/google-login"
                    className="button_auth fs_auth text-decoration-none bg-white"
                    // target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="bg-white button"
                      type="button"
                      style={{ position: "relative", color: "#001b79" }}
                    >
                      <LazyLoadImage
                        alt={"hi"}
                        effect="blur"
                        src={google}
                        className="h-100 ps-1"
                        opacity="true"
                        placeholderSrc={google}
                      />
                        جوجل
                    </button>
                  </Link>

                  <button className="button_auth fs_auth d-none">
                    <SiFacebook className=" -white fs-5" />
                      فيس بوك
                  </button>
                </div>
                <span className="mt-4 d-flex gap-2">
                  <p className=" fs-6 text-black-50"> لديك حساب؟</p>
                  <Link
                    to="/signin"
                    className=" text-move fw-bold  primary  text-decoration-none"
                  >
                    تسجيل الدخول
                  </Link>
                </span>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
