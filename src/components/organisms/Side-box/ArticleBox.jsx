import useTypingAnimation from "@/hooks/typingAnimation";
import styles from "./main.module.css";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setArticle } from "@/redux/slices/createArticle/articleSlice";
import { useDispatch } from "react-redux";
import { setArticleCompleted } from "@/redux/slices/createArticle/articleSlice";
export default function ArticleBox({ loading }) {
  const articleRef = useRef(null);
  const isScrollToEnd = useRef(true);
  const { article, articleCompleted } = useSelector((s) => s.article);
  const dispatch = useDispatch();
  const articleTypingAnimation = useTypingAnimation(
    article.split(" "),
    130,
    articleCompleted
  );

  useEffect(() => {
    if (articleRef.current) {
      const controller = new AbortController();
      articleRef.current.addEventListener(
        "scroll",
        (e) => {
          const offset = e.target.getClientRects()?.[0]?.height + 50;
          if (e.target?.scrollHeight <= e.target?.scrollTop + offset)
            isScrollToEnd.current = true;
          else isScrollToEnd.current = false;

          if (articleCompleted) controller.abort();
        },
        { signal: controller.signal }
      );
      return () => controller.abort();
    }
  }, [articleRef.current]);

  useEffect(() => {
    isScrollToEnd.current &&
      articleRef.current &&
      (articleRef.current.scrollTop = articleRef.current.scrollHeight);

    if (articleTypingAnimation.length >= article.length)
      dispatch(setArticleCompleted(true));
  }, [articleTypingAnimation]);

  return (
    <ContentEditable
      className={`form-control ${styles["main-article"]} px-2  h-100 overflow-y-scroll`}
      html={sanitizeHtml(!articleCompleted ? articleTypingAnimation : article)}
      onChange={(e) => dispatch(setArticle(e.target.value))}
      tagName="article"
      innerRef={articleRef}
    />
  );
}
