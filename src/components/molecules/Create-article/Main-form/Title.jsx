import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import { setTitle } from "@/redux/slices/createArticle/articleSlice";
export default function Title({ className }) {
  const { title } = useSelector((s) => s.article);
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <label htmlFor="title" className="form-label mb-1">
        العنوان الرئيسى
      </label>
      <input
        name="title"
        type="text"
        className={`${styles["input"]} form-control`}
        id="title"
        value={title}
        placeholder="اكتب العنوان الرئيسي"
        onChange={(e) => dispatch(setTitle(e.target.value))}
      />
    </div>
  );
}
