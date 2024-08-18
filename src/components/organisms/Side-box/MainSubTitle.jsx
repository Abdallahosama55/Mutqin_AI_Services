import styles from "./main.module.css";
import SubTitleOption from "./SubTitleOption";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateSubTitleOrder } from "@/redux/slices/createArticle/articleSlice";
import DragIcon from "@/assets/icons/Drag";
import {
  setSubTitlesInserted,
  toggleAllSubTitlesSelected,
} from "@/redux/slices/createArticle/articleSlice";

export default function MainSubTitle({
  entery,
  mainIndex,
  maxLength,
  dragHandle,
  onSubTitleDelete,
  onSubTitleInsert,
}) {
  const { subTitles, subTitlesInserted } = useSelector((s) => s.article);
  const dispatch = useDispatch();
  const indexRef = useRef(mainIndex);
  const isSelected = !!subTitles[indexRef.current];

  const onSubTitleDeleteHandle = ({ place, subTxt }) => {
    dispatch(
      setSubTitlesInserted({
        mainSubTxt: entery[0],
        inserted: subTitlesInserted[entery[0]]?.filter?.((s) => s !== subTxt),
      })
    );
    onSubTitleDelete({
      place,
      subTxt,
    });
  };
  const onSubTitleInsertHandle = ({ place, index, dataFetched }) => {
    dispatch(
      setSubTitlesInserted({
        mainSubTxt: entery[0],
        inserted: dataFetched,
      })
    );
    onSubTitleInsert({
      place,
      index,
      dataFetched,
    });
  };

  useEffect(() => () => dispatch(toggleAllSubTitlesSelected("INIT")));

  // Drag / Drop
  useEffect(() => {
    indexRef.current = mainIndex;
    if (isSelected)
      dispatch(
        updateSubTitleOrder({
          mainSubTxt: entery[0],
          newPlace: mainIndex,
        })
      );
  }, [mainIndex]);
  return (
    <>
      <div className="d-flex align-items-center gap-2 px-3">
        <div {...dragHandle}>
          <DragIcon />
        </div>
        <h6 className={`${styles["main-sub-title"]} text-color-main mb-0`}>
          {entery[0]}
        </h6>
      </div>
      <div className="flex-grow-1">
        <ul className={`${styles["list-item"]} mb-3`}>
          {entery[1].map((sub, i) => (
            <SubTitleOption
              isInserted={subTitlesInserted[entery[0]]?.includes?.(sub)}
              onSubTitleDelete={onSubTitleDeleteHandle}
              onSubTitleInsert={onSubTitleInsertHandle}
              mainSubTxt={entery[0]}
              mainIndex={mainIndex}
              maxLength={maxLength}
              subTxt={sub}
              index={i}
              key={i}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
