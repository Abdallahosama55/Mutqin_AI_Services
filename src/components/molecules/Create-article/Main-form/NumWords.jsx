import styles from "./main.module.css";
import { MenuItem, Select } from "@mui/material";
import "./mui.css";

const numWordsOptions = [
  "500-800",
  "800-1100",
  "1100-1400",
  "1400-1700",
  "1700-2000",
];

export default function NumWords({ changeHandler, blurHandler, value }) {
  return (
    <div className={`${styles["input-container"]}`}>
      <label
        htmlFor="num_Article_words"
        className="form-label mb-1"
        // style={{
        //   color: +value > 2500 ? "red" : "",
        // }}
      >
        {/* {+value > 2500
          ? "* أقصى عدد لكلمات المقال هو 2500"
          : 
          " */}
        عدد كلمات المقال
        {/* "
           } */}
      </label>
      {/* <input
        // style={{
        //   borderColor: +value > 2500 ? "red" : "",
        // }}
        name="num_Article_words"
        type="number"
        min={0}
        className={`${styles["input"]} form-control`}
        id="num_Article_words"
        placeholder="اكتب عدد كلمات المقال التي تريد إنشائه"
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      /> */}

      <Select
        className={`${styles["form-select"]} ${styles["input"]}`}
        value={value}
        name="num_Article_words"
        onChange={(e) => changeHandler(e)}
      >
        {numWordsOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            className={`${styles["select-item"]}`}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
