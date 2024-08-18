import styles from "./Atoms.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ArticleLoading({ isComplete, step }) {
  return (
    <div
      className={`d-flex gap-2 gap-md-3 flex-wrap ${
        isComplete ? "p-1 p-md-2" : "px-1 pt-1 pb-1 px-md-2 pt-md-2"
      } ${styles["article-loading"]}`}
      dir="rtl"
    >
      {(step >= 0 || isComplete) && (
        <div className="d-flex items-center justify-center">
          {step > 0 || isComplete ? (
            <CheckCircleIcon className={`${styles["article-done"]}`} />
          ) : (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}
          <span className="m-0 m-md-1">مراجعة المصادر</span>
        </div>
      )}
      {(step >= 1 || isComplete) && (
        <div className="d-flex items-center justify-center">
          {step > 1 || isComplete ? (
            <CheckCircleIcon className={`${styles["article-done"]}`} />
          ) : (
            <span
              className="spinner-border spinner-border-sm "
              aria-hidden="true"
            ></span>
          )}
          <span className="m-0 m-md-1">تدقيق المحتوى</span>
        </div>
      )}
      {(step >= 2 || isComplete) && (
        <div className="d-flex items-center justify-center">
          {step > 2 || isComplete ? (
            <CheckCircleIcon className={`${styles["article-done"]}`} />
          ) : (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}
          <span className="m-0 m-md-1">كتابة المحتوى</span>
        </div>
      )}
    </div>
  );
}
