import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import logo from "@/assets/logo.svg";
import logoutIcon from "@/assets/Images/navBar/logoutNav.png";
import myaccout from "@/assets/Images/control/octicon_feed-person-16.svg";
import plan from "@/assets/Images/control/solar_money-bag-bold.svg";
import resfresh from "@/assets/Images/navBar/shape.png";
import app from "@/assets/Images/control/ri_app-store-fill.svg";
import contact from "@/assets/Images/control/streamline_customer-support-1-solid.svg";
import signout from "@/assets/Images/control/humbleicons_logout.svg";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import TextWithSansSerifNumbers from "../../helpers/TextwithSensSierfNumber";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaInfinity } from "react-icons/fa";
import ArrowIcon from "@/assets/icons/Arrow";
import avatar from "@/assets/Images/navBar/Avatar.png";
import HistoryArticleIcon from "@/Util/HistoryArticleIcon";
import { TbArrowDown, TbArrowDownBar, TbPointFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { themeColors } from "@/Util/theme";
import CustomButton from "../../components/atoms/Button";
import { fetchData } from "../../redux/slices/apiSlice";
import { useEffect } from "react";
import { setShow } from "../../redux/slices/chatSlice";
import axios from "axios";

import { ProgressBar } from "react-bootstrap";

const Navbar = ({ width = "100%" }) => {
  const [show_active, setShow_active] = useState(false);

  const dispatch = useDispatch();
  dispatch(setShow(show_active));

  const [navDroplist, setNavDroplist] = useState(false);
  const [showUsage, setShowUsage] = useState(false);
  const userImage = useSelector((state) => state.api.userImage);
  const userWordsRemain = useSelector((state) => state.api.userWordsRemain);
  const userWordsSubscription = useSelector(
    (state) => state.api.userWordsSubscription
  );
  const userSubscriptionPlanEn = useSelector(
    (state) => state.api.userSubscriptionPlanEn
  );

  const userSubscriptionPlan = useSelector(
    (state) => state.api.userSubscriptionPlan
  );

  const [Userword, setUserword] = useState();

  //Logout Nav For Api
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initialValues = {
    search: "",
  };

  const validationSchema = Yup.object({
    search: Yup.string(),
  });

  const [widthNav, setWidth] = useState(width);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setWidth("100%");
      } else {
        setWidth("100%");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission if needed
    // You can perform additional actions here
    setSubmitting(false);
  };

  const handleShowUsage = () => {
    setShowUsage(!showUsage);
    setNavDroplist(false);
  };
  const handleShowNav = () => {
    setShowUsage(false);
    setNavDroplist(!navDroplist);
    setShow_active(!navDroplist);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/signin");
  };

  const goToPlan = () => {
    navigate("/myplan");
  };
  const goToAccount = () => {
    navigate("/myaccount");
  };

  useEffect(() => {
    // Function to update show_active based on window size
    const updateShowActive = () => {
      const isMobileOrTablet = window.innerWidth <= 768; // Define your threshold for mobile/tablet
      setShow_active(!isMobileOrTablet); // Set show_active to true for desktop and false for mobile/tablet
    };

    // Call the function once on component mount
    updateShowActive();

    // Event listener for window resize
    const handleResize = () => {
      updateShowActive();
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Rest of your component code...


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
        try {
            const response = await axios.get('https://backend.mutqinai.com/api/userinfo/', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUserword(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data initially
    fetchData();


}, []);


const handleClick = async () => {
  const token = localStorage.getItem("token");

  const user = await axios.get("https://backend.mutqinai.com/api/userinfo/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  setUserword(user?.data);

};

const progress = (((Userword?.subscription_details.word_count||userWordsSubscription) -( Userword?.subscription_details.remaining_word_count||userWordsRemain)) /  (Userword?.subscription_details.word_count||userWordsSubscription)) * 100;

console.log("word====>" , Userword?.subscription_details.remaining_word_count)

  return (
    <div
      dir="rtl"
      style={{ width: widthNav , backgroundColor:"#fff" ,borderRadius:"6px" }}
      className=" d-flex ps-1 width-nav pb-0  pt-0 .align-items-center align-items-center justify-content-between flex-row "
    >
    
  
      {/* <div className=" nav-input-container flex-grow-1 "></div> */}
      <div className=" d-flex p-0  text-black align-items-center">
  
     
        <div className=" d-flex p-0 justify-content-center align-items-center">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
              handleClick()
            }}
            src={logo}
            className=" hover-of-link w-100 h-100 side-logo"
          />
        </div>
        {!pathname.includes("control") ? (
          <CustomButton
            onlyIcon
            onClick={() => {
              navigate("/");
              handleClick()
            }}
          >
            <ArrowIcon
              color={themeColors.colors.primary}
              width={15}
              className="me-lg-4 me-xl-4 me-xxl-4 me-md-4 m-0"
              height={15}
            />
          </CustomButton>
        ) : (
          ""
        )}

        <div>
          <div>
            {pathname.includes("/create-article") ||
            pathname.includes("reformulate") ||
            pathname.includes("/editor") ||
            pathname.includes("/content-section") ? (
              <div className="ps-md-3 pe-md-3 ps-xl-3 pe-xl-3 pe-lg-3 ps-lg-3 pe-xxl-3 ps-xxl-3  p-0 ">
                <HistoryArticleIcon />
              </div>
            ) : null}
          </div>

          <div>
            {pathname.includes("/chat") ? (
              <div
                className="ps-md-3 pe-md-3 ps-xl-3 pe-xl-3 pe-lg-3 ps-lg-3 pe-xxl-3 ps-xxl-3  p-0"
                onClick={() => setShow_active(!show_active)}
              >
                <HistoryArticleIcon />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="  position-relative     gap-0 d-flex  px-2   flex-row">
      <div className="  d-flex gap-2  align-items-center progress-row   "   dir='ltr' >
   
 
       <div className=" col-5">
       {((Userword?.subscription_details.plan.en === "Premium" || userSubscriptionPlan === "الاحترافية" || userSubscriptionPlanEn === "Premium") ?
       (
         <div className="progress-bar-nav">
           <div className="progress-nav" style={{ width: "0%" }}></div>
         </div>
       ) :
       (
         <div className="progress-bar-nav">
           <div className="progress-nav" style={{ width: `${progress}%` }}></div>
         </div>
       )
    )}
    
  
       </div>

       <div className=" col-7 d-flex " style={{color:"#001B79"}}>

       {
        (Userword?.subscription_details.plan.en === "Premium" || userSubscriptionPlan === "الاحترافية" || userSubscriptionPlanEn === "Premium") ? 
        <span className="pe-1"><FaInfinity /></span> :
        <span className="pe-1">{Userword?.subscription_details.word_count || userWordsSubscription}</span>
    }: الإستخدام
    
   </div>
     
    
    
      </div>
      <div className="usage p-md-3 p-1">
   
        </div>
        { Userword?.subscription_details.plan.en==="Free" || userWordsRemain===0 || (userSubscriptionPlan==="مجاني")?  <button
        onClick={goToPlan}
        className="btn-upgrade  ms-3  
      "
      >
        ترقية
      </button>:<button
      onClick={goToPlan}
      className="btn-upgrade  d-none ms-3
      "
    >
      ترقية
    </button>}
      

        <button onClick={() => handleShowNav()} className="nav-icon ">
          <img
            className="nav-icon "
            src={`https://backend.mutqinai.com${userImage}`}
          />
        </button>
        {navDroplist && (
          <>
            <div className=" position-absolute  user-list">
              <div>
                <div className=" d-flex gap-2 pt-3 flex-column">
                  <button className=" button-user-list d-flex  align-items-center  gap-1"  onClick={goToAccount}>
                    <img
                     
                      src={myaccout}
                      alt="myaccout"
                      className="  droplist-sub-icon"
                    />
                    <div className="droplist-subtext">حسابي</div>
                  </button>
                  <button
                    onClick={goToPlan}
                    className=" button-user-list align-items-center d-flex gap-1 "
                  >
                    <img
                      src={plan}
                      alt="myaccout"
                      className="  droplist-sub-icon"
                    />
                    <div className="droplist-subtext">الخطط و الاشتراكات </div>
                  </button>
              
                 
                </div>
                <div className="" />

                <button
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    outline: "none",
                  }}
                  className=" d-flex  pt-3  align-items-center gap-2"
                >
                  <img
                    src={logoutIcon}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                    alt="logOut"
                  />
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#000",
                      fontWeight: "600",
                    }}
                  >
                    تسجيل الخروج
                  </div>
                </button>
              </div>
            </div>
            <div
              className="   bg-transparent  position-absolute z-3  user-list-shadow "
              onClick={() => handleShowNav()}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
