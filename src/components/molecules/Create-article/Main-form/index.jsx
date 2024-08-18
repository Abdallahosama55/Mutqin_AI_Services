import styles from "./main.module.css";
import { Divider } from "@mui/material";
import { useFormik } from "formik";
import Arrows from "./Arrows";
import Subject from "./Subject";
import Title from "./Title";
import SubTitles from "./SubTitles";
import Keywords from "./Keywords";
import ContentStyle from "./ContentStyle";
import Language from "./Language";
import NumKeywords from "./NumKeywords";
import NumTitles from "./NumTitles";
import { useDispatch, useSelector } from "react-redux";
import { tryCatch, validation } from "@/Util/Create-article/helpers";
import NumWords from "./NumWords";
import { setArticle } from "@/redux/slices/createArticle/articleSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  replaceKeywords,
  setSubTitles,
  setTitle,
} from "@/redux/slices/createArticle/articleSlice";
import {
  useLazyGetStepInfoQuery,
  useSetStepInfoMutation,
} from "@/redux/slices/createArticle/createArticleEndpoints";
import { useEffect } from "react";
import {
  setLanguage,
  setToneOfVoice,
  setTopic,
} from "@/redux/slices/createArticle/articleSlice";
import toast from "react-hot-toast";

export default function MainForm({ phase, onPhaseChanched, getData, loading }) {
  const { id: newArticleId } = useParams();
  const [setStepInfo] = useSetStepInfoMutation();
  const [getStepInfo] = useLazyGetStepInfoQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    language,
    topic,
    tone_of_voice,
    title,
    keywords,
    subTitles,
    article,
    content,
  } = useSelector((s) => s.article);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      num_of_keywords: "",
      num_titles: "",
      num_Article_words: "",
    },
    onSubmit: async ({ num_of_keywords, num_titles, num_Article_words }) => {
      if (loading) return;
      // Validation (value and message)
      const validateMsgs = {
        num_Article_words: {
          value: num_Article_words,
          msg: "عدد كلمات المقال",
        },
        topic: {
          value: topic,
          msg: "الموضوع",
        },
        title: {
          value: title,
          msg: "العنوان",
        },
        language: {
          value: language,
          msg: "اللغة",
        },
        tone_of_voice: {
          value: tone_of_voice,
          msg: "أسلوب المحتوى",
        },
        keywords: {
          value: keywords,
          msg: "الكلمات المفتاحية",
        },
        num_titles: {
          value: num_titles,
          msg: "عدد العناوين",
        },
        num_of_keywords: {
          value: num_of_keywords,
          msg: "عدد العناوين الفرعية",
        },
        subTitles: {
          value: subTitles.filter((s) => s),
          msg: "العناوين الفرعية",
        },
      };

      if (phase === 0) {
        // Get Keywords
        const valid = validation([
          validateMsgs.topic,
          validateMsgs.num_of_keywords,
          validateMsgs.language,
        ]);
        if (!valid) return;
        const body = { topic, num_of_keywords, language };
        const data = await tryCatch(getData.bind(null, body));
        if (data) dispatch(replaceKeywords([]));
      } else if (phase === 1) {
        // Get Titles
        const valid = validation([
          validateMsgs.topic,
          validateMsgs.keywords,
          validateMsgs.num_titles,
          validateMsgs.tone_of_voice,
          validateMsgs.language,
        ]);
        if (!valid) return;
        const body = { topic, language, tone_of_voice, keywords, num_titles };
        const data = await tryCatch(getData.bind(null, body));
        if (data) dispatch(setTitle(""));
      } else if (phase === 2) {
        // Get Sub titles
        const valid = validation([
          validateMsgs.title,
          validateMsgs.keywords,
          validateMsgs.tone_of_voice,
          validateMsgs.language,
        ]);
        if (!valid) return;
        const body = {
          title,
          keywords,
          tone_of_voice,
          language,
        };
        const data = await tryCatch(getData.bind(null, body));
        if (data) dispatch(setSubTitles([]));
      } else {
        // Get Article
        const valid = validation([
          validateMsgs.title,
          validateMsgs.keywords,
          validateMsgs.tone_of_voice,
          validateMsgs.language,
          validateMsgs.num_Article_words,
          validateMsgs.subTitles,
        ]);
        if (!valid) return;

        // Transform data for integration with backend
        const selected_SubTitles = subTitles
          .filter((s) => s)
          .map((obj) => {
            const newObj = {};
            for (const [key, values] of Object.entries(obj)) {
              newObj[key] = {};
              values.forEach(({ value, type }) => {
                newObj[key][value] = type;
              });
            }
            return newObj;
          });

        const body = {
          title,
          language,
          selected_SubTitles,
          keywords,
          tone_of_voice,
          num_Article_words,
        };
        const articleData = await tryCatch(
          getData.bind(null, { id: newArticleId, body })
        );
        if (articleData?.content) {
          dispatch(setArticle(articleData.content));
          //Save last step
          const body = {
            step: 3,
            topic,
            content: articleData.content,
            title,
            language,
            selected_keywords: keywords,
            num_Article_words,
            num_keywords: num_of_keywords,
            tone_of_voice,
            selected_SubTitles: subTitles.filter((s) => s),
            num_titles,
            selected_title: title,
          };

          const data = await tryCatch(
            setStepInfo.bind(null, { id: newArticleId, body: { step: body } })
          );
          if (data.step != null && searchParams.get("new")) {
            searchParams.delete("new");
            setSearchParams(searchParams, {
              replace: true,
            });
          }
        }
      }
    },
  });

  ///////////////////////Try get step info////////////////////
  useEffect(() => {
    if (!searchParams.get("new"))
      tryCatch(getStepInfo.bind(null, newArticleId)).then((stepInfo) => {
        if (stepInfo?.step != null) {
          //Set state of cureent step
          onPhaseChanched(stepInfo.step || 0);
          dispatch(setTopic(stepInfo.topic || ""));
          dispatch(setLanguage(stepInfo.language || ""));
          dispatch(replaceKeywords(stepInfo.selected_keywords || []));
          formik.setFieldValue("num_of_keywords", stepInfo.num_keywords || "");
          if (stepInfo.step > 0) {
            formik.setFieldValue("num_titles", stepInfo.num_titles || "");
            dispatch(setToneOfVoice(stepInfo.tone_of_voice || ""));
            dispatch(setTitle(stepInfo.selected_title || ""));
          }
          if (stepInfo.step > 1)
            dispatch(setSubTitles(stepInfo.selected_SubTitles || []));
          if (stepInfo.step > 2) {
            formik.setFieldValue(
              "num_Article_words",
              stepInfo.num_Article_words || ""
            );
            dispatch(setArticle(""));
            setTimeout(() => dispatch(setArticle(stepInfo.content || "")));
          }
        }
      });
  }, [newArticleId]);

  return (
    <form className={styles["main-form"]} onSubmit={formik.handleSubmit}>
      {phase > 1 ? (
        <Title className={`${styles["input-container"]}`} />
      ) : (
        <Subject />
      )}
      {phase === 3 && <SubTitles />}
      {phase === 0 ? (
        <NumKeywords
          value={formik.values.num_of_keywords}
          changeHandler={formik.handleChange}
        />
      ) : (
        <>
          <Keywords
            className={`${phase !== 0 ? styles["input-container"] : ""}`}
          />
          {phase === 1 && (
            <NumTitles
              value={formik.values.num_titles}
              changeHandler={formik.handleChange}
            />
          )}
          <ContentStyle formik={formik} value={formik.values.tone_of_voice} />
        </>
      )}
      <Language />
      {phase === 3 && (
        <NumWords
          value={formik.values.num_Article_words}
          changeHandler={formik.handleChange}
        />
      )}
      <div>
        <div
          className={`${phase !== 1 ? "col-12" : "col-12"} ${
            phase === 2 ? "d-flex" : ""
          } ${
            phase === 3 ? "d-flex justify-content-between items-center" : ""
          }`}
        >
          <button
            className={`${styles["submit-btn"]} btn ${
              loading ? "d-flex items-center justify-content-center gap-2" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">تحميل...</span>
              </>
            ) : phase === 0 ? (
              "اقتراح الكلمات المفتاحية"
            ) : phase === 1 ? (
              "اقتراح العناوين"
            ) : phase === 2 ? (
              "اقتراح العناوين الفرعية"
            ) : (
              "إنشاء المقال"
            )}
          </button>

          {/* {phase === 2 && (
            <input
              onChange={formik.handleChange}
              value={formik.values.num_Of_points}
              name="num_Of_points"
              type="number"
              placeholder="العدد"
              min={0}
              className={`${styles["input"]} form-control d-inline-block me-2`}
              id="num_Of_points"
            />
          )} */}
          {phase === 3 && article.length > 0 && (
            <button
              className={`${styles["to-editor-btn"]} btn `}
              type="button"
              onClick={async () => {
                // Save Last Step (requird if user edit article)
                const body = {
                  step: 3,
                  topic,
                  content: article,
                  title,
                  language,
                  selected_keywords: keywords,
                  num_Article_words: formik.values.num_Article_words,
                  num_keywords: formik.values.num_of_keywords,
                  tone_of_voice,
                  selected_SubTitles: subTitles.filter((s) => s),
                  num_titles: formik.values.num_titles,
                  selected_title: title,
                };
                tryCatch(
                  setStepInfo.bind(null, {
                    id: newArticleId,
                    body: { step: body },
                  })
                );
                navigate("/editor", {
                  state: {
                    content: article,
                    title,
                  },
                });
              }}
            >
              الإنتقال إلى المحرر
            </button>
          )}
        </div>
        {(phase === 0 || phase === 1) && (
          <>
            <Divider className={`${styles["skip"]}`}>أو</Divider>
            <p className={`${styles["skip"]} text-center`}>
              {phase === 0
                ? "هل لديك كلمات مفتاحية بالفعل؟ أدخل الكلمات المفتاحية وتخطى هذه الخطوة"
                : " هل لديك عنوان بالفعل؟ أدخل العنوان الخاص بك وتخطى هذه الخطوة"}
            </p>
            {phase === 0 ? (
              <Keywords
                className={`${phase !== 0 ? styles["input-container"] : ""}`}
              />
            ) : (
              <Title
                className={`${phase !== 1 ? styles["input-container"] : ""}`}
              />
            )}
          </>
        )}
        <Arrows
          onPhaseChanched={onPhaseChanched}
          phase={phase}
          formik={formik}
        />
      </div>
    </form>
  );
}
