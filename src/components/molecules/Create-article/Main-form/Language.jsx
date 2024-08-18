import { MenuItem, Select } from "@mui/material";
import { allLanguages } from "@/Util/Create-article/constants";
import styles from "./main.module.css";
import "./mui.css";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/slices/createArticle/articleSlice";

export default function Language() {
  const { language } = useSelector((s) => s.article);
  const dispatch = useDispatch();
  return (
    <div className={`${styles["input-container"]}`}>
      <label htmlFor="language" className="form-label mb-1">
        اللغة
      </label>
      <Select
        className={`${styles["form-select"]} ${styles["input"]}`}
        value={language}
        name="language"
        onChange={(e) => dispatch(setLanguage(e.target.value))}
      >
        {allLanguages.map((lang) => (
          <MenuItem
            key={lang.code}
            value={lang.code}
            className={`${styles["select-item"]}`}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
