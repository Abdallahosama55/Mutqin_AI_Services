import styles from "./main.module.css";

export default function NumTitles({ changeHandler, blurHandler, value }) {
  return (
    <div className={`${styles["input-container"]}`}>
      <label htmlFor="num_titles" className="form-label mb-1">
        عدد العناوين
      </label>
      <input
        name="num_titles"
        type="number"
        min={0}
        className={`${styles["input"]} form-control`}
        id="num_titles"
        placeholder="اكتب عدد العناوين التي تريد إنشائها"
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      />
    </div>
  );
}
