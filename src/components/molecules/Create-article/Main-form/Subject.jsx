import { useSelector } from "react-redux";
import styles from "./main.module.css";
import { useDispatch } from "react-redux";
import { setTopic } from "@/redux/slices/createArticle/articleSlice";

export default function Subject() {
  const { topic } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  return (
    <div className={`${styles["input-container"]}`}>
      <label htmlFor="topic" className="form-label mb-1">
        الموضوع
      </label>
      <input
        name="topic"
        type="text"
        className={`${styles["input"]} form-control`}
        id="topic"
        placeholder="اكتب الموضوع"
        onChange={(e) => dispatch(setTopic(e.target.value))}
        value={topic}
      />
    </div>
  );
}
