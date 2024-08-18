import { Image, Navbar, Stack } from "react-bootstrap";
import CustomButton from "./../atoms/Button";
import ArrowIcon from "@/assets/icons/Arrow";
import logo from "@/assets/logo.svg";
import { themeColors } from "@/Util/theme";
import HistoryIcon from "@/assets/icons/History";
import contact from "@/assets/Images/control/streamline_customer-support-1-solid.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BREAKPOINTS, actionsTypes } from "@/helpers/constants";
import MenuIcon from "@/assets/icons/Menu";
import { TbArrowDown, TbArrowDownBar, TbPointFilled } from "react-icons/tb";
import { useBreakpoint } from "use-breakpoint";
import { useEffect, useRef, useState } from "react";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useOnClickOutside } from "usehooks-ts";
import { setTitle, updateDocument } from "@/redux/features/api/apiSlice";
import { exportToFile } from "@/helpers/exportToFile";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import avatar from "@/assets/Images/navBar/Avatar.png";
import logoutIcon from "@/assets/Images/navBar/logoutNav.png";
import myaccout from "@/assets/Images/control/octicon_feed-person-16.svg";
import plan from "@/assets/Images/control/solar_money-bag-bold.svg";
import app from "@/assets/Images/control/ri_app-store-fill.svg";
import { fetchData } from "../../redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaInfinity } from "react-icons/fa";

const Header = () => {
  const dispatch = useAppDispatch();

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [exportDropDown, setExportDropDown] = useState(false);
  const [optionsDropDown, setOptionsDropDown] = useState(false);
  const [Userword, setUserword] = useState();
  const [dropDownHeader, setDropDownHeader] = useState(false);
  const ref = useRef(null);
  const refOptions = useRef(null);
  const checker = useAppSelector((state) => state.checker);

  const handleClickOutside = () => {
    setExportDropDown(false);
  };
  const userImage = useSelector((state) => state.api.userImage);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useOnClickOutside(ref, handleClickOutside);
  useOnClickOutside(refOptions, () => setOptionsDropDown(false));
  const [dropDownProfile, setDropDownProfile] = useState(false);

  const userWordsSubscription = useSelector(
    (state) => state.api.userWordsSubscription
  );
  const userSubscriptionPlan = useSelector(
    (state) => state.api.userSubscriptionPlan
  );
  const userSubscriptionPlanEn = useSelector(
    (state) => state.api.userSubscriptionPlanEn
  );

  const userWordsRemain = useSelector((state) => state.api.userWordsRemain);
  //Navigate
  const goToPlan = () => {
    navigate("/myplan");
  };
  const goToAccount = () => {
    navigate("/myaccount");
  };
  const handleShowUsage = () => {
    setShowUsage(!showUsage);
    setNavDroplist(false);
  };
  const handleShowNav = () => {
    setShowUsage(false);
    setNavDroplist(!navDroplist);
  };
  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/signin");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://backend.mutqinai.com/api/userinfo/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserword(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const [showUsage, setShowUsage] = useState(false);
  const [navDroplist, setNavDroplist] = useState(false);
  const progress =
    (((Userword?.subscription_details.word_count || userWordsSubscription) -
      (Userword?.subscription_details.remaining_word_count ||
        userWordsRemain)) /
      (Userword?.subscription_details.word_count || userWordsSubscription)) *
    100;

  return (
    <Navbar
      className="    py-2 pb-2 px-xl-4 px-md-4 px-lg-4  px-3  position-relative"
      style={{ backgroundColor: "#EBECF4" }}
    >
      <Stack
        direction="horizontal"
        className="justify-content-between  py-2 rounded-2 bg-white  w-100"
      >
        <Stack
          className="justify-content-end text-end py-1 align-items-center"
          direction="horizontal"
          gap={0}
        >
          <div className=" d-flex  align-items-center">
            <div className=" d-flex justify-content-center align-items-center">
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                  handleClick();
                }}
                src={logo}
                className=" hover-of-link  w-100 h-100 side-logo"
              />
            </div>
            <div>
              <div>
                {pathname.includes("create-article") ||
                pathname.includes("reformulate") ? (
                  <HistoryArticleIcon />
                ) : (
                  ""
                )}

                {pathname.includes("content-section") ||
                pathname.includes("add-ads") ? (
                  <CustomButton
                    onlyIcon
                    onClick={() =>
                      dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
                    }
                  >
                    <HistoryArticleIcon width={20} height={20} />
                  </CustomButton>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {isBelowDesktop && (
            <>
              <CustomButton
                onlyIcon
                onClick={() => {
                  navigate("/");
                  handleClick();
                }}
              >
                <ArrowIcon
                  color={themeColors.colors.primary}
                  width={15}
                  height={15}
                />
              </CustomButton>
              <CustomButton
                onlyIcon
                onClick={() =>
                  dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
                }
              >
                <HistoryIcon width={20} height={20} />
              </CustomButton>

              <Stack className="align-items-center justify-content-center ">
                {isBelowDesktop ? (
                  <input
                    type="text"
                    style={{ width: "0px" }}
                    className="text-primary fw-medium border-0 outline-0"
                    value={checker.title}
                    placeholder="أكتب اسم للملف"
                    onChange={(e) => {
                      dispatch(setTitle(e.target.value));
                      dispatch(
                        updateDocument({
                          title: e.target.value,
                          isEditor: pathname.includes("/editor"),
                          content: checker.content,
                        })
                      );
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    style={{ width: "250px" }}
                    className="text-primary fw-medium border-0 outline-0"
                    value={checker.title}
                    placeholder="أكتب اسم للملف"
                    onChange={(e) => {
                      dispatch(setTitle(e.target.value));
                      dispatch(
                        updateDocument({
                          title: e.target.value,
                          isEditor: pathname.includes("/editor"),
                          content: checker.content,
                        })
                      );
                    }}
                  />
                )}
              </Stack>
            </>
          )}
          {!isBelowDesktop && (
            <div className=" d-flex align-items-center gap-2 me-4">
              <CustomButton
                onlyIcon
                onClick={() => {
                  navigate("/");
                  handleClick();
                }}
              >
                <ArrowIcon
                  color={themeColors.colors.primary}
                  width={15}
                  height={15}
                />
              </CustomButton>
              <CustomButton
                onlyIcon
                onClick={() =>
                  dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
                }
              >
                <HistoryIcon width={23} height={23} />
              </CustomButton>

             
            </div>
          )}
        </Stack>
        {isBelowDesktop ? (
          <Stack direction="horizontal">
            <div className="   ">
              <div
                className="  d-flex gap-3   align-items-center progress-row  "
                dir="ltr"
              >
                <div className=" col-5">
                  {Userword?.subscription_details.plan.en === "Premium" ||
                  userSubscriptionPlan === "الاحترافية" ||
                  userSubscriptionPlanEn === "Premium" ? (
                    <div className="progress-bar-nav">
                      <div
                        className="progress-nav"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  ) : (
                    <div className="progress-bar-nav">
                      <div
                        className="progress-nav"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className=" col-7 d-flex" style={{ color: "#001B79" }}>
                  {Userword?.subscription_details.plan.en === "Premium" ||
                  userSubscriptionPlan === "الاحترافية" ||
                  userSubscriptionPlanEn === "Premium" ? (
                    <span className="pe-1">
                      <FaInfinity />
                    </span>
                  ) : (
                    <span className="pe-1">
                      {Userword?.subscription_details.word_count ||
                        userWordsSubscription}
                    </span>
                  )}
                  : الإستخدام
                </div>
              </div>
            </div>
            <CustomButton onlyIcon className="position-relative z-3">
              <div>
                <button
                  onClick={() => setNavDroplist(!navDroplist)}
                  className="nav-icon "
                >
                  <img
                    className="nav-icon "
                    src={`https://backend.mutqinai.com${userImage}` || avatar}
                  />
                </button>
                {navDroplist && (
                  <div className=" position-absolute  user-list">
                    <div>
                      <div className=" d-flex gap-2 pt-3 flex-column">
                        <button className=" button-user-list d-flex  align-items-center  gap-1">
                          <img
                            onClick={goToAccount}
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
                          <div className="droplist-subtext">
                            الخطط و الاشتراكات{" "}
                          </div>
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
                )}
              </div>
              {dropDownProfile && (
                <MultiOptionDropDown
                  options={[
                    {
                      value: "حسابي",
                      className: "border border-primary px-3 py-3",
                    },
                    {
                      value: `${checker.text.split(" ").length - 1}/2500 متبقي`,
                      className: "border border-primary px-3 py-3",
                    },
                  ]}
                  dropDownAction={(value) => {
                    exportToFile(checker.content, value);
                    setDropDownProfile(false);
                  }}
                />
              )}
            </CustomButton>
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={4} ref={ref}>
            <div className=" nav-icon-container position-relative  .align-items-center  d-flex bg-white px-2   flex-row">
              <div
                className="  d-flex gap-2  align-items-center progress-row  "
                dir="ltr"
              >
                <div className=" col-5">
                  {Userword?.subscription_details.plan.en === "Premium" ||
                  userSubscriptionPlan === "الاحترافية" ||
                  userSubscriptionPlanEn === "Premium" ? (
                    <div className="progress-bar-nav">
                      <div className="progress" style={{ width: "0%" }}></div>
                    </div>
                  ) : (
                    <div className="progress-bar-nav">
                      <div
                        className="progress-nav"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className=" col-7 d-flex" style={{ color: "#001B79" }}>
                  {Userword?.subscription_details.plan.en === "Premium" ||
                  userSubscriptionPlan === "الاحترافية" ||
                  userSubscriptionPlanEn === "Premium" ? (
                    <span className="pe-1">
                      <FaInfinity />
                    </span>
                  ) : (
                    <span className="pe-1">
                      {Userword?.subscription_details.word_count ||
                        userWordsSubscription}
                    </span>
                  )}
                  : الإستخدام
                </div>
              </div>
              <div className="usage p-3"></div>
              {Userword?.subscription_details.plan.en === "Free" ||
              userWordsRemain === 0 ||
              userSubscriptionPlan === "مجاني" ? (
                <button
                  onClick={goToPlan}
                  className="btn-upgrade  ms-3   rounded-3
           p-0 ps-0 pe-1"
                >
                  ترقية
                </button>
              ) : (
                <button
                  onClick={goToPlan}
                  className="btn-upgrade  d-none  ms-3
           "
                >
                  ترقية
                </button>
              )}

              <button onClick={() => handleShowNav()} className="nav-icon ">
                <img
                  className="nav-icon "
                  src={`https://backend.mutqinai.com${userImage}` || avater}
                />
              </button>
              {navDroplist && (
                <div className=" position-absolute  user-list">
                  <div>
                    <div className=" d-flex gap-2 pt-3 flex-column">
                      <button className=" button-user-list d-flex  align-items-center  gap-1">
                        <img
                          onClick={goToAccount}
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
                        <div className="droplist-subtext">
                          الخطط و الاشتراكات{" "}
                        </div>
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
                  <div
                    className="  position-absolute z-3  user-list-shadow2  "
                    onClick={() => handleShowNav()}
                  ></div>
                </div>
              )}
            </div>
          </Stack>
        )}
      </Stack>
      <Stack
        className="position-absolute top-100  bg-light w-100  z-3 "
        style={{
          transform: dropDownHeader ? "translateY(0)" : "translateX(125%)",
          display: dropDownHeader ? "block" : "none",
        }}
      >
        <>
          <div className="border-bottom p-2 px-3">
            <CustomButton
              onlyIcon
              onClick={() =>
                dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
              }
            ></CustomButton>
          </div>

          <div className="border-bottom p-2 px-3">
            <Stack className="justify-content-center fs-3 fw-medium text-primary ">
              <input
                type="text"
                className="text-primary fw-medium border-0 outline-0"
                value={checker.title}
                placeholder="أكتب اسم للملف"
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                  dispatch(
                    updateDocument({
                      title: e.target.value,
                      isEditor: pathname.includes("/editor"),
                      content: checker.content,
                    })
                  );
                }}
              />
            </Stack>
          </div>
        </>
      </Stack>
    </Navbar>
  );
};

export default Header;
