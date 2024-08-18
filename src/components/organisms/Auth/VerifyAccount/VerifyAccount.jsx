import React, { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import "../../Auth/auth.css";
import logo from "../../../../assets/motqin.png";
import axios from "axios";
import { Loader } from "../../../atoms/Loader/Loader";
const VerifyAccount = () => {
  const token = localStorage.getItem("token");
  const [isloading, setIsloading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const id = user?.id;
  const userEmail = user?.email;

  const initialValues = {
    code: ["", "", "", ""],
  };

  const validationSchema = Yup.object().shape({
    code: Yup.array()
      .of(Yup.string().length(1, "Must be exactly 1 character"))
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    // Handle form submission here OTP

    const { code } = values;
    const verifyCode = code.join("");

    try {
      setIsloading(true);
      const response = await axios.post(
        `https://backend.mutqinai.com/api/user/confirm-email/`,
        { user_id: id, otp: verifyCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data;
      setIsloading(false);
      toast.success("تم تاكيد البريد الالكتروني ");
      navigate("/control");
      window.location.reload();
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message);
    }
  };
  
  const [timer, setTimer] = useState(59);
  const resentCode = async () => {
    try {
      setTimer(59);
      //Resend OTP
      setIsloading(true);
      const response = await axios.post(
        `https://backend.mutqinai.com/api/user/resend-otp/`,
        { email: userEmail }
      );
      setIsloading(false);
      const resData = response.data;
      toast.success("تم  ارسال الرقم ");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    //Get user data
    async function getUserData() {
      const getUserData = await axios.get(
        `https://backend.mutqinai.com/api/userinfo/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = getUserData.data;
      setUser(userData);
    }
    getUserData();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [timer]); // Added timer as a dependency

  // useEffect to handle timerFinished
  useEffect(() => {
    if (timer === 0) {
      setTimerFinished(true);
    }
  }, [timer]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const moveFocus = (index, value) => {
    if (value.length === 0 && index > 0) {
      // If the value is empty and the current input field is not the first one, move focus to the previous input field
      inputRefs[index - 1].current.focus();
    } else if (value.length === 1 && index < 3) {
      // If a character is entered and the current input field is not the last one, move focus to the next input field
      inputRefs[index + 1].current.focus();
    }
  };
  
  return (
    <section
      className="d-flex  justify-content-center align-items-center ar bg-white   "
      dir="rtl">
      <div className=" py-5 d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 ">
        <LazyLoadImage
          alt={"hi"}
          
          src={logo}
          className="auth_logo"
          opacity="true"
          placeholderSrc={logo}
        />
        <h4 className="mt-3 text-move fw-bolder text-move">
            التحقق من بريدك الإلكتروني
        </h4>
        
        <p
          style={{ fontSize: "15px", width: "90%" }}
          className="text-move fw-normal mt-1 text-center   ">
          لقد أرسلنا رمزًا مكونًا من 4 أرقام إلى 
              <span className=" px-1 text-move fw-normal  font-number    ">{userEmail} </span>
              <span className=" d-block mt-3">       الرجاء إدخاله أدناه، لا يمكن العثور عليه؟ </span>
              <span className=" d-block"> تحقق من البريد المزعج  </span>
       
              </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting,values,setFieldValue  }) => (
            <Form className="d-flex flex-column justify-content-between w-100 px-5 h-75 ">
              <div className=" d-flex flex-column justify-content-center text-center">
                <label
                  htmlFor="code"
                  className=" mb-2 fs_auth   text-move">
                  إدخال الرمز {" "}
                </label>
                <div
                  dir="ltr"
                  className="d-flex gap-2 w-100 justify-content-center">
                  {initialValues.code.map((_, index) => (
                    <Field
                      key={index}
                      innerRef={inputRefs[index]}
                      id={`code-${index}`}
                      name={`code[${index}]`}
                      type="text"
                      maxLength="1"
                      className="input_style_auth verfiyotp text-center"
                      style={{ width: "15%" }}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldValue(`code[${index}]`, value);
                        moveFocus(index, value);
                      }}
                    />
                  ))}
                </div>
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-danger"
                />
                <div className=" text-danger">{message}</div>
                <p className=" text-move fw-normal mt-5 text-center ">
                لم تتلق الرمز؟  
                  {timerFinished && (
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        color: "#001b79",
                      }}
                      type="button"
                      className={`text-move  fw-normal pe-1 ${
                        timer > 1 && "d-none"
                      }`}
                      // to="/verifyaccount"
                      onClick={() => resentCode()}>
                      <span className=" text-decoration-underline ">
                      أعد إرسال الرمز
                      </span>
                    </button>
                  )}
                </p>
                <p className="text-move fw-normal  text-center">
                  إعادة ارسال الرمز في خلال 00:
                  {timer < 10 ? `0${timer}` : timer}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ background: "#ed5ab3", border: "1px" }}
                className=" btn-move fs_auth  m-3">
                {isSubmitting ? <Loader /> : "التحقق من الحساب"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default VerifyAccount;
