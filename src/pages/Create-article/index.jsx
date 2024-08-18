import { useEffect } from "react";
import styles from "./main.module.css";
import { useState } from "react";
import {
  useLazyArticleQuery,
  useLazyKeywordsQuery,
  useLazySubTitlesQuery,
  useLazyTitlesQuery,
} from "@/redux/slices/createArticle/createArticleEndpoints";
import {
  replaceKeywords,
  setArticle,
  setArticleId,
  setSubTitles,
  setTitle,
  toggleShowHistory,
} from "@/redux/slices/createArticle/articleSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SideBox from "@/components/organisms/Side-box/index";
import Stepper from "@/components/organisms/Stepper/index";
import MainForm from "@/components/molecules/Create-article/Main-form/index";
import {
  setArticleCompleted,
  setLanguage,
  setTopic,
} from "../../redux/slices/createArticle/articleSlice";

function CreateArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phase, setPhase] = useState(0);
  const phaseChanched = (phase) => {
    setPhase(phase);
  };
  const [getKeywords, { data: keywordsData, isFetching: keywordsLoading }] =
    useLazyKeywordsQuery();
  const [getTitles, { data: titlesData, isFetching: titlesLoading }] =
    useLazyTitlesQuery();
  const [getSubTitles, { data: subTitlesData, isFetching: subTitlesLoading }] =
    useLazySubTitlesQuery();
  const [getArticle, { isFetching: articleLoading }] = useLazyArticleQuery();

  useEffect(() => {
    articleLoading && dispatch(setArticleCompleted(false));
  }, [articleLoading]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("يجب تسجيل الدخول أولا", {
        style: { direction: "rtl" },
      });
      setTimeout(() => navigate("/signin"), 3000);
    }
    return () => {
      // Cleanup State
      dispatch(setTitle(""));
      dispatch(setSubTitles([]));
      dispatch(replaceKeywords([]));
      dispatch(setArticle(""));
      dispatch(setArticleId(""));
      dispatch(toggleShowHistory(false));
      dispatch(setLanguage(""));
      dispatch(setTopic(""));
      dispatch(setArticleCompleted(false));
    };
  }, []);

  return (
    <>
      <div
        className={`${styles["main"]} d-flex px-2 bg-white ms-4 me-2 mx-md-0 rounded-3 overflow-y-scroll`}
        dir="rtl"
      >
        <div className={`d-flex flex-wrap  me-auto col-12`}>
          <div className="mb-md-0 mb-3 col-12 col-md-12 col-lg-6">
            <div
              className={`${styles["main-box"]} rounded-3 mx-1  me-md-4 ms-md-3`}
            >
              <div className="col-9 mx-auto ">
                <Stepper phase={phase} onPhaseChanched={phaseChanched} />
                <MainForm
                  phase={phase}
                  onPhaseChanched={phaseChanched}
                  getData={
                    phase === 0
                      ? getKeywords
                      : phase === 1
                      ? getTitles
                      : phase === 2
                      ? getSubTitles
                      : getArticle
                  }
                  loading={
                    phase === 0
                      ? keywordsLoading
                      : phase === 1
                      ? titlesLoading
                      : phase === 2
                      ? subTitlesLoading
                      : articleLoading
                  }
                />
              </div>
            </div>
          </div>
          <div className={` col-12 col-md-12 col-lg-6 mb-md-0 mb-3`}>
            <div
              className={`${styles["suggestion-box"]} rounded-3 mx-1 me-md-3 ms-md-4`}
            >
              <SideBox
                phase={phase}
                keywordsData={keywordsData?.keywords}
                titlesData={titlesData?.titles}
                subTitlesData={subTitlesData}
                loading={
                  phase === 0
                    ? keywordsLoading
                    : phase === 1
                    ? titlesLoading
                    : phase === 2
                    ? subTitlesLoading
                    : articleLoading
                }
                subTitlesLoading={subTitlesLoading}
                articleLoading={articleLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateArticle;
