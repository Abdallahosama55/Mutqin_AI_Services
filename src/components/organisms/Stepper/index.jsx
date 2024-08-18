import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import styles from "./main.module.css";
import { useSelector } from "react-redux";
import { Notify } from "notiflix";
import toast from "react-hot-toast";

export default function Stepper({ phase, onPhaseChanched }) {
  const { keywords, title, subTitles } = useSelector((s) => s.article);

  return (
    <div className={`${styles["stepper"]}`}>
      <div className="stepper d-flex justify-content-center align-items-center ">
        <div
          className={`${styles["step"]}`}
          onClick={() => {
            onPhaseChanched(0);
          }}
        >
          <CheckCircleIcon
            className={`${styles["stepper-icon"]} ${styles["stepper-icon-done"]}`}
          />
        </div>
        <div
          className={`${styles["stepper-progress"]} progress`}
          style={{ height: "3px" }}
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar"
            style={{ width: phase > 0 ? "100%" : "0%" }}
          ></div>
        </div>
        <div
          className={`${styles["step"]}`}
          onClick={() => {
            if (keywords.filter((k) => k).length) onPhaseChanched(1);
            else
              toast.error(
                "برجاء إدخال الكلمات المفتاحية من المُقترحات أو يدويًا",
                {
                  style: { direction: "rtl" },
                }
              );
          }}
        >
          {phase > 0 ? (
            <CheckCircleIcon
              className={`${styles["stepper-icon"]} ${styles["stepper-icon-done"]}`}
            />
          ) : (
            <CircleIcon className={styles["stepper-icon"]} />
          )}
        </div>
        <div
          className={`${styles["stepper-progress"]} progress`}
          style={{ height: "3px" }}
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar"
            style={{ width: phase > 1 ? "100%" : "0%" }}
          ></div>
        </div>
        <div
          className={`${styles["step"]}`}
          onClick={() => {
            if (title) onPhaseChanched(2);
            else
              toast.error("برجاء إختيار العنوان من المُقترحات", {
                style: { direction: "rtl" },
              });
          }}
        >
          {phase > 1 ? (
            <CheckCircleIcon
              className={`${styles["stepper-icon"]} ${styles["stepper-icon-done"]}`}
            />
          ) : (
            <CircleIcon className={styles["stepper-icon"]} />
          )}
        </div>
        <div
          className={`${styles["stepper-progress"]} progress`}
          style={{ height: "3px" }}
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar"
            style={{ width: phase > 2 ? "100%" : "0%" }}
          ></div>
        </div>
        <div
          className={`${styles["step"]}`}
          onClick={() => {
            if (subTitles.length) onPhaseChanched(3);
            else
              toast.error(`برجاء إختيار العناوين الفرعية من المُقترحات`, {
                style: { direction: "rtl" },
              });
          }}
        >
          {phase > 2 ? (
            <CheckCircleIcon
              className={`${styles["stepper-icon"]} ${styles["stepper-icon-done"]}`}
            />
          ) : (
            <CircleIcon className={styles["stepper-icon"]} />
          )}
        </div>
      </div>
      <div className={`${styles["step-text"]} d-flex justify-content-between `}>
        <p className={` text-center`}>الكلمات المفتاحية</p>
        <p className={` text-center`}> العنوان</p>
        <p className={` text-center`}>العناوين الفرعية</p>
        <p className={` text-center`}>المقال</p>
      </div>
    </div>
  );
}
