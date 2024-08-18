import styles from "./main.module.css";

export default function NumKeywords({ changeHandler, blurHandler, value }) {
  return (
    <div className={`${styles["input-container"]}`}>
      <label htmlFor="num_of_keywords" className="form-label mb-1">
        عدد الكلمات المفتاحية
      </label>
      <input
        name="num_of_keywords"
        type="number"
        min={0}
        className={`${styles["input"]} form-control`}
        id="num_of_keywords"
        placeholder="اكتب عدد الكلمات المفتاحية التي تريد إنشائها"
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      />
    </div>
  );
}
