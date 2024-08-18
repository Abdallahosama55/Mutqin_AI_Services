import {
  addSubTitle,
  delSubTitle,
  updateSubTitleType,
} from "@/redux/slices/createArticle/articleSlice";
import styles from "./main.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrashIcon from "@/assets/icons/Trash";
import InsertIcon from "@/assets/icons/Insert";
import { useLazyAdditionalSubTitlesQuery } from "@/redux/slices/createArticle/createArticleEndpoints";
import { tryCatch } from "@/Util/Create-article/helpers";
export default function SubTitleOption({
  mainSubTxt,
  subTxt,
  mainIndex,
  maxLength,
  index,
  onSubTitleDelete,
  onSubTitleInsert,
  // isInserted,
}) {
  const [getSubTitles, { isFetching }] = useLazyAdditionalSubTitlesQuery();
  const {
    topic,
    tone_of_voice,
    language,
    subTitles,
    allSubTitlesSelected,
    subTitlesInserted,
  } = useSelector((state) => state.article);

  const isInserted = subTitlesInserted[mainSubTxt]?.includes?.(subTxt);

  const initRender = useRef(true);

  const dispatch = useDispatch();

  let isSelected = null;
  const subTitlesObj = subTitles[mainIndex]?.[mainSubTxt];
  if (subTitlesObj)
    isSelected = subTitlesObj.find((subObj) => subObj.value === subTxt);

  const subHeadings = ["h3", "h4"];
  const currentSubHeading =
    isSelected?.type || (isInserted ? subHeadings[1] : subHeadings[0]);
  const [subHeading, setSubHeading] = useState(currentSubHeading);

  useEffect(() => {
    if (allSubTitlesSelected === "SELECTED" && !isSelected) {
      dispatch(
        addSubTitle({
          mainSubTxt,
          subTxt,
          subHeading,
          place: mainIndex,
          maxLength,
        })
      );
      initRender.current = false;
    } else if (allSubTitlesSelected === "NOT_SELECTED" && isSelected) {
      dispatch(
        delSubTitle({
          place: mainIndex,
          mainSubTxt,
          subTxt,
        })
      );
      initRender.current = false;
    }
  }, [allSubTitlesSelected]);

  return (
    <li
      className={`${styles["list-item"]} ${
        isFetching ? styles["fade"] : ""
      } py-2 d-flex justify-content-between ${
        subHeading === "h4"
          ? language !== "ar" && language !== "arz"
            ? styles["inner-sub-title_en"]
            : styles["inner-sub-title_ar"]
          : ""
      } px-3`}
    >
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          value={subTxt}
          checked={!!isSelected}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(
                addSubTitle({
                  mainSubTxt,
                  subTxt,
                  subHeading,
                  place: mainIndex,
                  maxLength,
                })
              );
            } else
              dispatch(
                delSubTitle({
                  place: mainIndex,
                  mainSubTxt,
                  subTxt,
                })
              );
          }}
        />
        <button
          type="button"
          className={`${styles["fix-font-family"]} ${
            styles["toggle-heading"]
          } ${
            language
              ? language !== "ar" && language !== "arz"
                ? "ms-1"
                : "me-1"
              : "me-1"
          } rounded-1 ${styles[subHeading]}`}
          onClick={() => {
            const current = subHeadings.indexOf(subHeading);
            if (!!isSelected)
              dispatch(
                updateSubTitleType({
                  mainSubTxt,
                  subTxt,
                  subHeading:
                    current === subHeadings.length - 1
                      ? subHeadings[0]
                      : subHeadings[current + 1],
                  place: mainIndex,
                })
              );

            if (current === subHeadings.length - 1) {
              setSubHeading(subHeadings[0]);
            } else {
              setSubHeading(subHeadings[current + 1]);
            }
          }}
        >
          {subHeading.toUpperCase()}
        </button>
        <span
          className={`${
            language
              ? language !== "ar" && language !== "arz"
                ? "ms-3"
                : "me-3"
              : "me-3"
          }`}
        >
          {subTxt}
        </span>
      </div>
      <div className="d-flex gap-md-2 align-items-center">
        <button
          className={`${styles["sub-title-option_btn"]} bg-white`}
          onClick={async () => {
            const data = await tryCatch(
              getSubTitles.bind(null, {
                topic,
                mainSubTitle: mainSubTxt,
                subTitle: subTxt,
                tone_of_voice,
                language,
              })
            );
            if (Array.isArray(data))
              onSubTitleInsert({
                place: mainIndex,
                index,
                dataFetched: data,
              });
          }}
        >
          <InsertIcon />
        </button>
        <button
          className={`${styles["sub-title-option_btn"]} bg-white`}
          onClick={() => {
            onSubTitleDelete({
              place: mainIndex,
              subTxt,
            });
            if (isSelected)
              dispatch(delSubTitle({ mainSubTxt, place: mainIndex, subTxt }));
          }}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
