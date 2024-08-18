//Modules
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner, Stack } from "react-bootstrap";
import { useBreakpoint } from "use-breakpoint";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import PaperIcon from "@/assets/icons/Paper";
import MenuIcon from "@/assets/icons/Menu";
import { BREAKPOINTS } from "@/helpers/constants";
import { toggleShowHistory } from "@/redux/slices/createArticle/articleSlice";
import { tryCatch } from "./Create-article/helpers";
import {
  useLazyAllArticlesQuery,
  useLazyGetArticleByIdQuery,
  useLazySearchQuery,
} from "@/redux/slices/createArticle/createArticleEndpoints";
import {
  useLazyGetDocumentsQuery,
  useLazyDocumentSearcherQuery,
} from "@/redux/api/templateSlice";
import {
  useLazyAllRepharesQuery,
  useLazyGetRepharesByIdQuery,
  useLazySearchRepharesQuery,
} from "@/redux/slices/createArticle/createArticleEndpoints";
import { useLazyGetDocsQuery } from "@/redux/slices/editor/editorEndpoints";
import SearchIcon from "@/assets/icons/Search";
import toast from "react-hot-toast";
import { useLazyGetNextHistoryQuery } from "@/redux/api/mutqinApi";

const HistoryArticles = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [selectedId, setSelectedId] = useState();
  const navigate = useNavigate();
  const { showHistory } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const timer = useRef(null);
  const [scrollToEnd, setScrollToEnd] = useState(false);

  const closePanel = () => dispatch(toggleShowHistory(false));
  const [searchQuery, setSearchQuery] = useState(undefined);

  // Create article
  const [getArticlesHistory, { isFetching: isAllArticlesLoading }] =
    useLazyAllArticlesQuery();
  const [getArticlesSearch, { isFetching: isArticlesSearchLoading }] =
    useLazySearchQuery();
  const [getAticleById, { isFetching: getArticleByIdLoading }] =
    useLazyGetArticleByIdQuery();

  //Content Section
  const [getDocuments] = useLazyGetDocumentsQuery();
  const [documentSearcher] = useLazyDocumentSearcherQuery();

  //Editor
  const [getDocs, { isFetching: getDocsLoading }] = useLazyGetDocsQuery();

  //Refomulation
  const [getRepharesHistory, { isFetching: pepharesLoading }] =
    useLazyAllRepharesQuery();
  const [getSearchRephares, { isFetching: fetchingRephares }] =
    useLazySearchRepharesQuery();

  //Getting data by routing
  const { pathname } = useLocation();
  const createArticleRoute = pathname.includes("/create-article");
  const editorRoute = pathname.includes("/editor");
  const rephareseRoute = pathname.includes("/reformulate");
  const contentSectionRoute = pathname.includes("/content-section");

  const [getNextHistory, { isFetching: getNextHistoryLoading }] =
    useLazyGetNextHistoryQuery();

  let getHistoryFun;
  let getSearchFun;

  //Based on location getting data
  if (pathname.includes("content-section")) {
    getHistoryFun = useCallback(getDocuments, [getDocuments]);
    getSearchFun = useCallback(documentSearcher, [documentSearcher]);
  } else if (rephareseRoute) {
    getHistoryFun = useCallback(getRepharesHistory, [getRepharesHistory]);
    getSearchFun = useCallback(getSearchRephares, [getSearchRephares]);
  } else if (createArticleRoute) {
    getHistoryFun = useCallback(getArticlesHistory.bind(null, null, true), [
      getArticlesHistory,
    ]);
    getSearchFun = useCallback(getArticlesSearch, [getArticlesSearch]);
  } else if (editorRoute) {
    getHistoryFun = useCallback(getDocs.bind(null, null, true), [getDocs]);
    getSearchFun = useCallback(getDocs, [getDocs]);
  }

  const [historyData, setHistoryData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  useEffect(() => {
    if (searchQuery !== undefined) {
      clearTimeout(timer.current);
      timer.current = setTimeout(
        () =>
          tryCatch(getSearchFun.bind(null, searchQuery, true)).then(
            (data) => data && setHistoryData(data)
          ),
        600
      );
    }
  }, [searchQuery, getSearchFun]);

  useEffect(() => {
    //Getting data when open History
    if (showHistory) {
      tryCatch(getHistoryFun).then((data) => data && setHistoryData(data));
    }
  }, [showHistory, getHistoryFun, isAllArticlesLoading]);

  let endpoint;
  if (pathname.includes("reformulate")) {
    endpoint = "v1/text-rephrase/texts/";
  } else if (createArticleRoute) {
    endpoint = "v1/spacetly_articleGenerator/get_all_articles/";
  } else if (editorRoute) {
    endpoint = "v1/writing-assistant/get_user_documents/";
  } else if (contentSectionRoute) {
    endpoint = "v1/templates/user-template/";
  }

  const scrollHandle = (e) => {
    const offset = e.target.getClientRects()?.[0]?.height + 50;
    const isToEnd = e.target?.scrollHeight <= e.target?.scrollTop + offset;
    if (isToEnd && historyData.next && !scrollToEnd) {
      setScrollToEnd(true);
      tryCatch(getNextHistory.bind(null, historyData.next, true)).then(
        (data) => {
          if (data) {
            setHistoryData((prev) => ({
              ...data,
              results: [...prev.results, ...data.results],
            }));
            setScrollToEnd(false);
          }
        }
      );
    }
  };
  return (
    <Stack
      className={`flex-fill position-fixed h-100 top-0 bg-light pt-4 border-start px-3 bg-ligh mb-4`}
      style={{
        transform: showHistory ? "translateX(0)" : "translateX(150%)",
        width: isBelowDesktop ? "100%" : "16.666666%",
        maxHeight: "100vh",
        overflowY: "auto",
        zIndex: 100,
      }}
      gap={3}
    >
      <div
        className="d-flex justify-content-between"
        style={{ fontSize: "calc(12px + 0.12vw)" }}
      >
        <div className="title text-secondary  fw-medium">
          سجل {createArticleRoute ? "المقالات" : "الملفات"}
        </div>
        <span onClick={closePanel} role="button">
          <MenuIcon />
        </span>
      </div>
      <div className={`${styles["search-box"]} position-relative `}>
        <label
          htmlFor="search-history"
          className="form-label position-absolute end-0 top-50 translate-middle-y me-2"
        >
          <span>
            <SearchIcon />
          </span>
        </label>
        <input
          className={`${styles["search-input"]} form-control`}
          id="search-history"
          placeholder="بحث..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
      </div>
      <Stack
        onScroll={(e) => {
          clearTimeout(timer.current);
          timer.current = setTimeout(() => scrollHandle(e), 300);
        }}
        gap={3}
        className="z-top "
        style={{
          fontSize: "calc(12px + 0.13vw)",
          height: "calc(100vh - 120px)",
          overflowY: "scroll",
        }}
      >
        {isAllArticlesLoading ||
        isArticlesSearchLoading ||
        fetchingRephares ||
        pepharesLoading ||
        getDocsLoading ? (
          <Stack className="items-center justify-center">
            <Spinner variant="secondary" />
          </Stack>
        ) : historyData.results.length === 0 ? (
          <div className="text-center">لا يوجد نتائج</div>
        ) : (
          historyData.results.map((item) => {
            return (
              <Link
                title={
                  createArticleRoute && item.content ? "الذهاب إلى المحرر" : ""
                }
                className={`${styles["link"]} position-relative ${
                  selectedId === item?.id && getArticleByIdLoading
                    ? styles["link-fade"]
                    : ""
                }`}
                to={
                  pathname.includes("content-section")
                    ? `/content-section/${item.template}/${item.document}/${item.id}`
                    : createArticleRoute && item.content
                    ? "/editor"
                    : `/${pathname.split("/")[1]}/${item.id}`
                }
                key={item.id}
                onClick={
                  !(createArticleRoute && item.content)
                    ? // Just Close History and change id in same route
                      () => closePanel()
                    : // Fetch Content to sent to editor
                      async (e) => {
                        e.preventDefault();
                        try {
                          setSelectedId(item.id);
                          const data = await tryCatch(
                            getAticleById.bind(null, item.id, true)
                          );
                          if (data?.content) {
                            navigate("/editor", {
                              state: {
                                content: data.content,
                                title: data.title || "مستند جديد",
                              },
                            });
                          } else {
                            toast.error("لا يو جد محتوى يمكن عرضه في المحرر", {
                              style: { direction: "rtl" },
                            });
                          }
                        } catch (error) {
                          toast.error(
                            "تعذر جلب تفاصيل المقال، معذراً حاول مرة أخرى لاحقًا",
                            {
                              style: { direction: "rtl" },
                            }
                          );
                        }
                      }
                }
              >
                {selectedId === item.id && getArticleByIdLoading && (
                  <div className="position-absolute top-0 start-0 h-100 w-100 z-1 d-flex align-items-center justify-content-center">
                    <Stack className="items-center justify-center">
                      <Spinner variant="secondary" />
                    </Stack>
                  </div>
                )}
                <div
                  className="border rounded-3  position-relative"
                  style={{ fontSize: "calc(12px + 0.12vw)" }}
                >
                  <div
                    className={`${styles["paper-icon"]} text-center py-3 border-bottom px-3`}
                  >
                    <PaperIcon />
                  </div>
                  <div className="details p-2">
                    <p className={`text-primary  ${styles["title"]} mb-1 `}>
                      {/* TODO: Refactoring */}
                      {item?.rephrased_text
                        ? `${
                            isBelowDesktop
                              ? item?.rephrased_text.length > 60
                                ? item?.rephrased_text.slice(0, 60) + "..."
                                : item?.rephrased_text
                              : item?.rephrased_text.length > 27
                              ? item?.rephrased_text.slice(0, 27) + "..."
                              : item?.rephrased_text
                          }`
                        : item.topic
                        ? `${
                            isBelowDesktop
                              ? item.topic.length > 60
                                ? item.topic.slice(0, 60) + "..."
                                : item.topic
                              : item.topic.length > 27
                              ? item.topic.slice(0, 27) + "..."
                              : item.topic
                          }`
                        : item.title
                        ? `${
                            isBelowDesktop
                              ? item.title.length > 60
                                ? item.title.slice(0, 60) + "..."
                                : item.title
                              : item.title.length > 27
                              ? item.title.slice(0, 27) + "..."
                              : item.title
                          }`
                        : "لا يوجد عنوان"}
                    </p>

                    <p
                      className={` text-text-gray  label ${styles["sub-title"]} mb-0`}
                    >
                      آخر تحديث : {item?.updated_at}
                    </p>
                  </div>
                </div>
              </Link>
            );
            s;
          })
        )}
        {getNextHistoryLoading && (
          <div className="  h-100 w-100 py-4 z-1 d-flex align-items-center justify-content-center">
            <Stack className="items-center justify-center">
              <Spinner variant="secondary" />
            </Stack>
          </div>
        )}
      </Stack>
    </Stack>
  );
};

export default HistoryArticles;
