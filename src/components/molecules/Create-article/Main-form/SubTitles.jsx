import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import {
  addSubTitleInPlace,
  changeSubTitle,
  delSubTitle,
} from "@/redux/slices/createArticle/articleSlice";
import toast from "react-hot-toast";
import {
  changeMainSubTitle,
  delMainSubTitle,
  updateSubTitleType,
} from "@/redux/slices/createArticle/articleSlice";

export default function SubTitles() {
  const { subTitles } = useSelector((s) => s.article);
  const dispatch = useDispatch();
  const filtredSubTitles = subTitles.filter((s) => s);

  return (
    <div className={`${styles["input-container"]}`}>
      <p htmlFor={"sub-title"} className={`${styles["label"]} form-label mb-1`}>
        العناوين الفرعية
      </p>
      {filtredSubTitles.length ? (
        subTitles.map((mainSubObj, mainIndex) => {
          return mainSubObj
            ? Object.entries(mainSubObj).map((mainSubObjEntry, i) => {
                return (
                  <div key={i}>
                    <div className="mb-3 d-flex align-items-center position-relative gap-2">
                      <button
                        type="button"
                        className={`${styles["hash"]} ${styles["h2"]} ms-1 position-absolute bottom-0 end-0 m-0`}
                      >
                        H2
                      </button>
                      <input
                        type="text"
                        className={`${styles["input"]} form-control flex-grow-1 w-auto`}
                        value={mainSubObjEntry[0]}
                        onChange={(e) => {
                          dispatch(
                            changeMainSubTitle({
                              place: mainIndex,
                              mainSubTxt: mainSubObjEntry[0],
                              newValue: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>
                    {mainSubObjEntry[1].map((subObj, i) => {
                      return (
                        <div
                          key={mainSubObjEntry[0] + " " + i}
                          className="mb-3 d-flex align-items-center position-relative gap-2"
                        >
                          <button
                            type="button"
                            className={`${styles["hash"]} ${
                              styles[subObj.type]
                            } ms-1 position-absolute bottom-0 end-0 m-0`}
                            onClick={() => {
                              dispatch(
                                updateSubTitleType({
                                  mainSubTxt: mainSubObjEntry[0],
                                  subHeading:
                                    subObj.type === "h3" ? "h4" : "h3",
                                  place: mainIndex,
                                  subTxt: subObj.value,
                                })
                              );
                            }}
                          >
                            {subObj.type?.toUpperCase()}
                          </button>
                          <input
                            type="text"
                            className={`${styles["input"]} form-control flex-grow-1 w-auto`}
                            value={subObj.value}
                            onChange={(e) => {
                              dispatch(
                                changeSubTitle({
                                  place: mainIndex,
                                  mainSubTxt: mainSubObjEntry[0],
                                  index: i,
                                  newValue: e.target.value,
                                })
                              );
                            }}
                          />
                          <button
                            onClick={() => {
                              dispatch(
                                addSubTitleInPlace({
                                  mainSubTxt: mainSubObjEntry[0],
                                  place: mainIndex,
                                  index: i + 1,
                                })
                              );
                            }}
                            type="button"
                            className={`${styles["sub-title_btn"]} ${styles["sub-title_btn__add"]} btn p-0`}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className={`${styles["sub-title_btn"]} ${styles["sub-title_btn__del"]} btn p-0`}
                            onClick={() => {
                              if (mainSubObjEntry[1].length > 1)
                                dispatch(
                                  delSubTitle({
                                    mainSubTxt: mainSubObjEntry[0],
                                    place: mainIndex,
                                    subTxt: subObj.value,
                                  })
                                );
                              else if (filtredSubTitles.length > 1) {
                                dispatch(
                                  delMainSubTitle({
                                    place: mainIndex,
                                  })
                                );
                              } else
                                toast.error(
                                  "لا يمكن مسح جميع العناوين الفرعية",
                                  {
                                    style: { direction: "rtl" },
                                  }
                                );
                            }}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            : null;
        })
      ) : (
        <p className="text-danger bg-warning-subtle">لا يوجد عناوين فرعية</p>
      )}
    </div>
  );
}
