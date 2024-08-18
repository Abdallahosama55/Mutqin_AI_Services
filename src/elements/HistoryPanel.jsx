import { Spinner, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useBreakpoint } from "use-breakpoint";
import {
  API_URL,
  BEARER_TOKEN,
  BREAKPOINTS,
  actionsTypes,
} from "@/helpers/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import MenuIcon from "@/assets/icons/Menu";
import PaperIcon from "@/assets/icons/Paper";
import { baseURL } from "../redux/api/url";
import { useNavigate } from "react-router-dom";

const HistoryPanel = () => {
  const navigate = useNavigate();
  const isOpenHistoryPanel = useAppSelector(
    (state) => state.isOpenHistoryPanel
  );
  const [allDoc, setAllDoc] = useState([]);

  const { pathname } = useLocation();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const dispatch = useAppDispatch();
  const closePanel = () => {
    isOpenHistoryPanel &&
      dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL_FALSE });
  };
  const [docs, setDocs] = useState([]);
  const [searchDoc, setSearchDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingAllDoc, setLoadingAllDOc] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [historyPage, setHistoryPage] = useState(2);

  const ref = useRef(null);

  useOnClickOutside(ref, closePanel);

  useEffect(() => {
    if (isOpenHistoryPanel) {
      setLoading(true);

      const url = !pathname.includes("/editor")
        ? "/grammmer-checker/documents?search=" + searchDoc
        : "/writing-assistant/get_user_documents/?search=" + searchDoc;
      axios
        .get(API_URL + url, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        })
        .then((res) => {
      
          setDocs(res?.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [searchDoc, isOpenHistoryPanel, pathname]);

  useEffect(() => {
    const gettingHistory = async () => {
      try {
        setLoadingAllDOc(true);

        const response = await axios.get(
          `${baseURL}v1/grammmer-checker/documents/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoadingAllDOc(false);
        setAllDoc(response?.data);
      } catch (error) {
        console.log(error);
        setLoadingAllDOc(false);
      }
    };
    gettingHistory();
  }, []);

  console.log("allDoc", allDoc);

  return (
    <Stack
      className={`flex-fill   position-fixed h-100 top-0 bg-light py-4 border-start px-3 bg-light`}
      style={{
        transform: isOpenHistoryPanel ? "translateX(0)" : "translateX(150%)",
        width: isBelowDesktop ? "100%" : "15%",
        maxHeight: "100vh",
        overflowY: "auto",
        zIndex: 100,
      }}
      gap={3}
      ref={ref}
    >
      <div className="d-flex justify-content-between">
        <div className="title text-secondary fs-5 fw-medium">سجل الملفات</div>
        <span onClick={closePanel} role="button">
          <MenuIcon />
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="بحث..."
        value={searchDoc}
        onChange={(e) => setSearchDoc(e.target.value)}
      />
      <Stack gap={3} className="z-top">
        {/* No search */}
        {searchDoc.length === 0 &&
          allDoc?.map((doc) => {
            return (
              <Link
                title="الذهاب إلى المحرر"
                to={`detector/${doc?.unique_id}`}
                key={doc.unique_id}
                onClick={async (e) => {
                  e.preventDefault();
                  navigate(`/detector/${doc?.unique_id}`, {
                    state: {
                      title: doc?.title,
                      content: doc?.content,
                      unique_id: doc?.unique_id,
                    },
                  });
                }}
              >
                <div className="border rounded-3  ">
                  <div className="top text-center py-4 border-bottom px-3">
                    <PaperIcon />
                  </div>

                  <div className="details p-3">
                    <div className="title  text-primary fw-medium">
                      {doc.title}{" "}
                    </div>

                    <div
                      className="sub-title text-text-gray fw-medium label"
                      dangerouslySetInnerHTML={{
                        __html: doc?.content?.substring(0, 100),
                      }}
                    ></div>
                  </div>
                </div>
              </Link>
            );
          })}
        {/* No search and loading */}
        {searchDoc.length === 0 && loadingAllDoc && (
          <Stack className="items-center justify-center">
            <Spinner variant="secondary" />
          </Stack>
        )}

        {/* Search */}

        {/* Search and loading */}
        {searchDoc.length > 0 && loading && (
          <Stack className="items-center justify-center">
            <Spinner variant="secondary" />
          </Stack>
        )}

        {/* Search and length 0 */}
        {searchDoc.length > 0 && !loading && docs.length === 0 && (
          <div className="text-center">لا يوجد نتائج</div>
        )}

        {/* Search and length > 0 */}
        {searchDoc.length > 0 &&
          !loading &&
          docs.length > 0 &&
          docs?.map((doc) => {
            return (
              <Link to={`detector/${doc.unique_id}`} key={doc.unique_id}>
                <div className="border rounded-3  ">
                  <div className="top text-center py-4 border-bottom px-3">
                    <PaperIcon />
                  </div>

                  <div className="details p-3">
                    <div className="title  text-primary fw-medium">
                      {doc.title}{" "}
                    </div>

                    <div
                      className="sub-title text-text-gray fw-medium label"
                      dangerouslySetInnerHTML={{
                        __html: doc?.content?.substring(0, 100),
                      }}
                    ></div>
                  </div>
                </div>
              </Link>
            );
          })}
        {/* {loading ? (
            <Stack className="items-center justify-center">
            <Spinner variant="secondary" />
          </Stack>
        ) : docs.length === 0 ? (
          <div className="text-center">لا يوجد نتائج</div>
        ) : (
          docs?.map((doc) => {
            return (
              <Link
                to={`detector/${doc.unique_id}`}
                key={doc.unique_id}>
                <div className="border rounded-3  ">
                  <div className="top text-center py-4 border-bottom px-3">
                    <PaperIcon />
                  </div>

                  <div className="details p-3">
                    <div className="title  text-primary fw-medium">
                      {doc.title}{" "}
                    </div>

                    <div
                      className="sub-title text-text-gray fw-medium label"
                      dangerouslySetInnerHTML={{
                        __html: doc?.content?.substring(0, 100),
                      }}></div>
                  </div>
                </div>
              </Link>
            );
          })
        )} */}
      </Stack>
    </Stack>
  );
};

export default HistoryPanel;
