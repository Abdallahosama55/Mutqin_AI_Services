import { useSelector } from "react-redux";
import styles from "./main.module.css";
import toast from "react-hot-toast";
import { useSetStepInfoMutation } from "@/redux/slices/createArticle/createArticleEndpoints";
import { useParams, useSearchParams } from "react-router-dom";
import { tryCatch } from "@/Util/Create-article/helpers";
import ArrowIcon2 from "@/assets/icons/Arrow2";

export default function Arrows({ phase, onPhaseChanched, formik }) {
  const { keywords, title, subTitles, topic, language, tone_of_voice } =
    useSelector((s) => s.article);
  const params = useParams();
  const [setStepInfo] = useSetStepInfoMutation();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className={`${styles["arrows"]} d-flex 
				gap-3 justify-content-end ${phase !== 1 ? "" : ""}`}
    >
      <button
        type="button"
        disabled={phase < 1}
        className={`${phase < 1 ? styles["disabled"] : ""}`}
        onClick={() => {
          onPhaseChanched(phase - 1);
          if (phase === 3) {
            // Set saved step to previous
            const body = {
              step: phase - 1,
              topic,
              keywords,
              language,
              tone_of_voice,
              num_titles: formik.values.num_titles,
              selected_SubTitles: subTitles.filter((s) => s),
              title: title,
              selected_keywords: keywords,
              num_keywords: formik.values.num_of_keywords,
              selected_title: title,
            };
            tryCatch(
              setStepInfo.bind(null, { id: params.id, body: { step: body } })
            );
          }
          if (phase === 2) {
            // Set saved step to previous
            const body = {
              step: phase - 1,
              topic,
              selected_title: title,
              language,
              num_titles: formik.values.num_titles,
              tone_of_voice,
              selected_keywords: keywords,
              num_keywords: formik.values.num_of_keywords,
            };
            tryCatch(
              setStepInfo.bind(null, { id: params.id, body: { step: body } })
            );
          }
          if (phase === 1) {
            // Set saved step to previous
            const body = {
              step: phase - 1,
              topic,
              language,
              num_keywords: formik.values.num_of_keywords,
              selected_keywords: keywords,
            };
            tryCatch(
              setStepInfo.bind(null, { id: params.id, body: { step: body } })
            );
          }
        }}
      >
        <ArrowIcon2 width={24} height={24} />
      </button>
      <button
        type="button"
        disabled={phase > 2}
        className={`${phase > 2 ? styles["disabled"] : ""}`}
        onClick={() => {
          if (phase === 0) {
            if (keywords.filter((k) => k).length) {
              onPhaseChanched(phase + 1);
              // Set saved step to current
              const body = {
                step: phase,
                topic,
                language,
                num_keywords: formik.values.num_of_keywords,
                selected_keywords: keywords,
              };
              tryCatch(
                setStepInfo.bind(null, { id: params.id, body: { step: body } })
              ).then((data) => {
                if (data.step != null && searchParams.get("new")) {
                  searchParams.delete("new");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              });
              if (!keywords.filter((k) => k).slice(4).length)
                toast.error("يُفضل إختيار أكثر من 5 كلمات مفتاحية.", {
                  style: {
                    direction: "rtl",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  },
                });
            } else
              toast.error(
                "برجاء إدخال الكلمات المفتاحية من المُقترحات أو يدويًا",
                {
                  style: { direction: "rtl" },
                }
              );
          }
          if (phase === 1) {
            if (title) {
              // Set saved step to current
              const body = {
                step: phase,
                topic,
                selected_title: title,
                language,
                num_titles: formik.values.num_titles,
                tone_of_voice,
                selected_keywords: keywords,
                num_keywords: formik.values.num_of_keywords,
              };

              tryCatch(
                setStepInfo.bind(null, { id: params.id, body: { step: body } })
              ).then((data) => {
                if (data.step != null && searchParams.get("new")) {
                  searchParams.delete("new");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              });
              onPhaseChanched(phase + 1);
            } else
              toast.error("برجاء إختيار العنوان من المُقترحات", {
                style: { direction: "rtl" },
              });
          }
          if (phase === 2) {
            if (!subTitles.filter((s) => s).length)
              toast.error(`برجاء إختيار العناوين الفرعية من المُقترحات`, {
                style: { direction: "rtl" },
              });
            else {
              // Set saved step to current
              const body = {
                step: phase,
                topic,
                keywords,
                language,
                tone_of_voice,
                num_titles: formik.values.num_titles,
                selected_SubTitles: subTitles.filter((s) => s),
                title: title,
                selected_keywords: keywords,
                num_keywords: formik.values.num_of_keywords,
                selected_title: title,
              };

              tryCatch(
                setStepInfo.bind(null, { id: params.id, body: { step: body } })
              ).then((data) => {
                if (data.step != null && searchParams.get("new")) {
                  searchParams.delete("new");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              });
              onPhaseChanched(phase + 1);
            }
          }
        }}
      >
        <ArrowIcon2 width={24} height={24} rotate={180} />
      </button>
    </div>
  );
}
