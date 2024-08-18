import { MenuItem, Select } from "@mui/material";
import { contentStyles } from "@/Util/Create-article/constants";
import styles from "./main.module.css";
import "./mui.css";
import { useDispatch } from "react-redux";
import { setToneOfVoice } from "@/redux/slices/createArticle/articleSlice";
import { useSelector } from "react-redux";
export default function ContentStyle() {
  const dispatch = useDispatch();
  const { tone_of_voice } = useSelector((s) => s.article);
  return (
    <div className={`${styles["input-container"]}`}>
      <label htmlFor="tone_of_voice" className="form-label mb-1">
        أسلوب المحتوى
      </label>

      <Select
        className={`${styles["form-select"]} ${styles["input"]}`}
        value={tone_of_voice}
        name="tone_of_voice"
        onChange={(e) => dispatch(setToneOfVoice(e.target.value))}
      >
        {contentStyles.map((c, i) => (
          <MenuItem
            key={i}
            value={c.value}
            className={`${styles["select-item"]}`}
          >
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
