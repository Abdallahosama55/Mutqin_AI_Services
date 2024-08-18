import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import { toggleShowHistory } from "@/redux/slices/createArticle/articleSlice";
import { useLocation } from "react-router-dom";

export default function HistortIcon() {
  const dispatch = useDispatch();
  const showHistory = useSelector((state) => state.article.showHistory);
  // const showHistoryEditor = useSelector((state) => state.editor.showHistory);

  return (
    <div className={`${styles["container"]} d-flex align-items-center`}>
      <span
        onClick={() => {
          // pathname.includes("create-article")
          //   ?
          dispatch(toggleShowHistory(!showHistory));
          // : pathname.includes("editor")
          // ? dispatch(toggleShowHistoryEditor(!showHistoryEditor))
          // : //TODO: Another action
          //   "Another action";
        }}
      >
        <svg
          className={`${styles["icon"]}`}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="17.5" cy="16.5" r="10.5" fill="white" />
          <path
            d="M17.3679 4.00465C10.5963 3.81802 5.0486 9.27029 5.0486 16.0023H2.66723C2.06856 16.0023 1.77588 16.7222 2.2016 17.1354L5.91334 20.868C6.17942 21.1346 6.59184 21.1346 6.85791 20.868L10.5697 17.1354C10.6616 17.0414 10.7237 16.9223 10.7482 16.793C10.7726 16.6637 10.7584 16.5301 10.7071 16.4089C10.6559 16.2877 10.5701 16.1844 10.4604 16.1121C10.3507 16.0397 10.2221 16.0015 10.0907 16.0023H7.70935C7.70935 10.8033 11.9399 6.60414 17.155 6.6708C22.104 6.73745 26.2681 10.91 26.3346 15.869C26.4011 21.0813 22.2104 25.3338 17.022 25.3338C14.8801 25.3338 12.8978 24.6006 11.328 23.3609C11.0732 23.1597 10.7534 23.0594 10.4297 23.0791C10.1059 23.0988 9.80059 23.237 9.57188 23.4675C9.01312 24.0274 9.05303 24.9739 9.67831 25.4538C11.7685 27.1101 14.3572 28.0076 17.022 28C23.7404 28 29.1816 22.441 28.9954 15.6557C28.8224 9.40359 23.6073 4.17795 17.3679 4.00465ZM16.6894 10.67C16.1439 10.67 15.6916 11.1233 15.6916 11.6698V16.5755C15.6916 17.0421 15.9444 17.482 16.3435 17.722L20.4943 20.1882C20.9732 20.4681 21.5852 20.3081 21.8645 19.8416C22.1439 19.3616 21.9843 18.7484 21.5186 18.4685L17.6872 16.1889V11.6565C17.6872 11.1233 17.2348 10.67 16.6894 10.67Z"
            fill="#5225CE"
          />
        </svg>
      </span>
    </div>
  );
}
