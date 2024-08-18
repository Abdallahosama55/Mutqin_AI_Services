import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";

import {
  addKeyword,
  delKeyword,
  setTitle,
} from "@/redux/slices/createArticle/articleSlice";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ArticleBox from "./ArticleBox";
import MainSubTitle from "./MainSubTitle";
import {
  toggleAllSubTitlesSelected,
  setSubTitlesInserted,
} from "@/redux/slices/createArticle/articleSlice";
import ArticleLoading from "../../atoms/ArticleLoading";

let timer;

export default function SideBox({
  phase,
  keywordsData,
  titlesData,
  subTitlesData,
  loading,
  subTitlesLoading,
  articleLoading,
}) {
  const dispatch = useDispatch();
  const { keywords, title, article, language, subTitles } = useSelector(
    (s) => s.article
  );
  const [subTitlesState, setSubTitlesState] = useState([]);

  const [articleLoadingStep, setArticleLoadingStep] = useState(0);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(subTitlesState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSubTitlesState(items);
  }

  const onSubTitleDelete = ({ place, subTxt }) => {
    const newSubTitlesState = structuredClone(subTitlesState);
    newSubTitlesState[place][1] = subTitlesState[place][1].filter(
      (sub) => sub !== subTxt
    );
    if (!newSubTitlesState[place][1].length) newSubTitlesState.splice(place, 1);
    setSubTitlesState(newSubTitlesState);
  };

  const onSubTitleInsert = ({ index, place, dataFetched }) => {
    const newSubTitlesState = structuredClone(subTitlesState);
    const newSub = [
      ...subTitlesState[place][1].slice(0, index + 1),
      ...dataFetched,
      ...subTitlesState[place][1].slice(index + 1),
    ];
    // Repeated removal
    newSubTitlesState[place][1] = [...new Set(newSub)];
    setSubTitlesState(newSubTitlesState);
  };

  useEffect(() => {
    if (!subTitlesState.length && !!subTitlesData)
      setSubTitlesState(Object.entries(subTitlesData));
    if (subTitlesLoading) {
      setSubTitlesState([]);
      dispatch(
        setSubTitlesInserted({
          reset: true,
        })
      );
    }
  }, [subTitlesLoading]);

  const dataNotValid = () => {
    return phase === 0
      ? !keywordsData?.length
      : phase === 1
      ? !titlesData?.length
      : phase === 2
      ? !subTitlesData || !subTitlesState.length
      : !article?.length;
  };

  useEffect(() => {
    // If is already seted
    clearInterval(timer);
    if (articleLoadingStep < 3 && articleLoading) {
      timer = setInterval(() => setArticleLoadingStep((s) => s + 1), 35000);
      setTimeout(() => clearInterval(timer), 35000 * 3 + 1000);
    }
    if (article.length) setArticleLoadingStep(0);
  }, [articleLoading, article]);

  return (
    <div className={`${styles["box-container"]} h-100 `}>
      <h5 className={`${styles["title"]} px-2 mb-0`}>
        {phase === 0
          ? "الكلمات المقترحة"
          : phase === 1
          ? "العناويين المقترحة"
          : phase === 2
          ? "العناويين الفرعية المقترحة"
          : "المقال"}
      </h5>
      {
        // true

        loading ? (
          <>
            {articleLoading && (
              <ArticleLoading step={articleLoadingStep} />
              // <div
              //   className={`d-flex gap-3 flex-wrap px-2 pt-2 pb-1 ${styles["article-loading"]}`}
              //   dir="rtl"
              // >
              //   {articleLoadingStep >= 0 && (
              //     <div>
              //       {articleLoadingStep > 0 ? (
              //         <CheckCircleIcon
              //           className={`${styles["article-done"]}`}
              //         />
              //       ) : (
              //         <span
              //           className="spinner-border spinner-border-sm"
              //           aria-hidden="true"
              //         ></span>
              //       )}
              //       <span className="m-1">مراجعة المصادر</span>
              //     </div>
              //   )}
              //   {articleLoadingStep >= 1 && (
              //     <div>
              //       {articleLoadingStep > 1 ? (
              //         <CheckCircleIcon
              //           className={`${styles["article-done"]}`}
              //         />
              //       ) : (
              //         <span
              //           className="spinner-border spinner-border-sm "
              //           aria-hidden="true"
              //         ></span>
              //       )}
              //       <span className="m-1">تدقيق المحتوى</span>
              //     </div>
              //   )}{" "}
              //   {articleLoadingStep >= 2 && (
              //     <div>
              //       {articleLoadingStep > 2 ? (
              //         <CheckCircleIcon
              //           className={`${styles["article-done"]}`}
              //         />
              //       ) : (
              //         <span
              //           className="spinner-border spinner-border-sm"
              //           aria-hidden="true"
              //         ></span>
              //       )}
              //       <span className="m-1">كتابة المحتوى</span>
              //     </div>
              //   )}
              // </div>
            )}
            <Skeleton count={10} height={30} />
          </>
        ) : dataNotValid() ? (
          <>
            {
              <p className={`${styles["description"]} mb-0 py-2 pe-2`}>
                {phase === 0
                  ? "سيتم إدراج الكلمات المفتاحية التي تم إنشاؤها هنا"
                  : phase === 1
                  ? "سيتم إدراج العناوين التي تم إنشاؤها هنا"
                  : phase === 2
                  ? "سيتم إدراج العناوين الفرعية التي تم إنشاؤها هنا"
                  : "سيتم إدراج المقال هنا"}
              </p>
            }
            {phase === 0 ? (
              <p className={`${styles["extra-description"]} mb-0 py-2 pe-2`}>
                * يتم إنشاء جميع الكلمات المفتاحية بناءً على موضوعك
              </p>
            ) : null}
          </>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {phase === 3 && article.length && (
              <>
                {/* <div
                  className={`d-flex gap-3 flex-wrap p-2 ${styles["article-loading"]}`}
                  dir="rtl"
                >
                  <div>
                    <CheckCircleIcon className={`${styles["article-done"]}`} />
                    <span className="m-1">مراجعة المصادر</span>
                  </div>
                  <div>
                    <CheckCircleIcon className={`${styles["article-done"]}`} />
                    <span className="m-1">تدقيق المحتوى</span>
                  </div>
                  <div>
                    <CheckCircleIcon className={`${styles["article-done"]}`} />
                    <span className="m-1">كتابة المحتوى</span>
                  </div>
                </div> */}

                <ArticleLoading isComplete />
                <hr className="m-0" />
              </>
            )}

            <div
              dir={language !== "ar" && language !== "arz" ? "ltr" : "rtl"}
              className={`${styles["content"]}  ${"overflow-y-scroll"} p-1 ${
                phase === 3 && article.length ? "" : "pt-3"
              }`}
              style={{
                height:
                  phase === 3 && article.length
                    ? "calc(100% - 90px)"
                    : "calc(100% - 50px)",
              }}
            >
              {phase === 3 && article.length ? (
                <ArticleBox />
              ) : (phase === 0 || phase === 1) &&
                (keywordsData || titlesData) ? (
                <ul className={`${styles["list-item"]}`}>
                  {(phase === 0 ? keywordsData : titlesData).map((item, i) => (
                    <li
                      key={i}
                      className={`${
                        language !== "ar" && language !== "arz"
                          ? "px-3"
                          : "px-3"
                      }`}
                    >
                      <label className="d-flex align-items-center ">
                        <input
                          checked={
                            phase === 0
                              ? keywords.includes(item)
                              : title === item
                          }
                          name="list-item"
                          type="checkbox"
                          value={item}
                          onChange={(e) => {
                            if (phase === 0)
                              e.target.checked
                                ? dispatch(addKeyword(item))
                                : dispatch(delKeyword(item));
                            else if (phase === 1)
                              e.target.checked
                                ? dispatch(setTitle(item))
                                : dispatch(setTitle(""));
                          }}
                        />
                        <span
                          className={`${
                            language !== "ar" && language !== "arz"
                              ? "ms-3"
                              : "me-3"
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <Droppable droppableId="subTitles">
                  {(provided) => {
                    return (
                      <div
                        className={`subTitles ${styles["not-animated"]}`}
                        {...provided?.droppableProps}
                        ref={provided?.innerRef}
                      >
                        <div
                          className={`${
                            styles["select-all"]
                          }  mb-3 d-flex align-items-center gap-2 ${
                            language !== "ar" && language !== "arz"
                              ? "ps-3"
                              : "pe-3"
                          }`}
                        >
                          <input
                            id="select-all_sub-titles"
                            type="checkbox"
                            checked={
                              subTitlesState.length ===
                              subTitles.filter((s) => s).length
                            }
                            onChange={(e) => {
                              if (e.target.checked)
                                dispatch(
                                  toggleAllSubTitlesSelected("SELECTED")
                                );
                              else
                                dispatch(
                                  toggleAllSubTitlesSelected("NOT_SELECTED")
                                );
                            }}
                          />
                          <label htmlFor="select-all_sub-titles">
                            إختيار الكل
                          </label>
                        </div>

                        {subTitlesState.map((entery, index) => {
                          return (
                            <Draggable
                              key={entery[0]}
                              draggableId={entery[0]}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  key={entery[0]}
                                  className={` align-items-start subTitles ${styles["not-animated"]}`}
                                  ref={provided?.innerRef}
                                  {...provided?.draggableProps}
                                >
                                  <MainSubTitle
                                    onSubTitleDelete={onSubTitleDelete}
                                    onSubTitleInsert={onSubTitleInsert}
                                    dragHandle={provided.dragHandleProps}
                                    entery={entery}
                                    mainIndex={index}
                                    maxLength={subTitlesState.length}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              )}
            </div>
          </DragDropContext>
        )
      }
    </div>
  );
}
