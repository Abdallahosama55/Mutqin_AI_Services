// let x = ["الانسان", "الققديم", "الذى", ""];
// let y = {
//   "error 0": {
//     "word/sentence error": "الانسان",
//     "type of language error": "Spelling Mistake",
//     correction: "الإنسان",
//   },
//   "error 1": {
//     "word/sentence error": "الققديم",
//     "type of language error": "Spelling Mistake",
//     correction: "القديم",
//   },
//   "error 2": {
//     "word/sentence error": "الذى",
//     "type of language error": "Grammatical Error",
//     correction: "الذي",
//   },
// };

// let arr = [];
// let resultx = x.filter((word) => {
//   Object.values(y).forEach((value) => {
//     if (word === value["word/sentence error"]) {
//       console.log(value.correction);
//       arr.push(value.correction);
//     }
//   });
// });

// resultx;
// arr;

// const [correct, setCorrect] = useState([]);

// //Ai PopUp
// useEffect(() => {
//   editor
//     .chain()
//     .focus("end")
//     .createParagraphNear()
//     .insertContent(checker.checkerAi.aiResponse)
//     .run();
// }, [checker.checkerAi.aiResponse]);

// const splitText = useMemo(() => {
//   return editor.getText().split(/\s+/);
// }, [editor.getText()]);

// useEffect(() => {
//   let arr = [];
//   splitText.filter((word) => {
//     Object.values(checker.mistakes).forEach((value) => {
//       if (word === value["word/sentence error"]) {
//         console.log(value.correction);
//         arr.push({
//           correct: value.correction,
//           mistake: value["word/sentence error"],
//         });
//       }
//       setCorrect(arr);
//     });
//   });
// }, [checker.mistakes, editor.getText()]);

// correct.forEach((value) => {
//   const regEx = new RegExp("(" + value.mistake + ")(?!([^<]+)?>)", "gi");
//   html = html.replace(
//     regEx,
//     ` <div class="mistake hover-to-display" style="position:relative;display:inline;z-index:50;">
//          ${value.mistake}
//          <div class="popuptext">
//            <div class="popuptext-content">
//              <div class="text-info">
//                  <small class="text-info">الصواب</small>
//              </div>
//              <div>
//                ${value.mistake} -> <span class="btn btn-primary hoverOnButton btn-correct mistake-${value.mistake}" id="${value.mistake}">${value.correct}</span>
//              </div>
//            </div>
//          </div>
//        </div>`
//   );
// });

// const accordionData = {
//   "Spelling Mistakes": {
//     class: "mistake",
//   },
//   "Grammar Check": {
//     class: "grammar",
//   },
//   Lexicon: {
//     class: "lexicon",
//   },
//   Drafting: {
//     class: "drafting",
//   },
//   "Other Corrections": {
//     class: "other-corrections",
//   },
// };

// // HTML Replace at the bottom of Input
// const replaceHtmlWithHighlightedText = (html, correct) => {
//   correct.forEach((value) => {
//     const regEx = new RegExp("(" + value.mistake + ")(?!([^<]+)?>)", "gi");
//     // can check if correct action happened before or not

//     html = html.replace(
//       regEx,
//       ` <div class="mistake hover-to-display" style="position:relative;display:inline;z-index:50;">
//          ${value.mistake}
//          <div class="popuptext">
//            <div class="popuptext-content">
//              <div class="text-info">
//                  <small class="text-info">الصواب</small>
//                    <div>
//                ${value.mistake} -> <p class="btn btn-primary hoverOnButton btn-correct mistake-${value.mistake}" id="${value.mistake}">${value.correct}</p>
//              </div>
//              </div>

//            </div>
//          </div>
//        </div>`
//     );
//   });

//   return html;
// };

//Modules
import { EditorContent } from "@tiptap/react";
import lodash from "lodash";
import { useBreakpoint } from "use-breakpoint";
import { Stack } from "react-bootstrap";

//Images
import PasteIcon from "@/assets/icons/Paste";
import UploadIcon from "@/assets/icons/Upload";
import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import html from "@/assets/Images/reformulate/html-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";
import CopyIcon from "@/assets/icons/Copy";
import DownloadIcon from "@/assets/icons/Download";

//Files
import CustomButton from "@/components/atoms/Button";
import Card from "./Card";
import { BREAKPOINTS } from "../../helpers/constants";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MdKeyboardArrowDown } from "react-icons/md";
import "../atoms/atoms.css";
import "./molecules.css";
import {
  correctMistake,
  correctMistakes,
  setContent,
} from "../../redux/features/api/apiSlice";
import { getTextFromFile } from "../../helpers/getTextFromFile";
import { exportToFile } from "../../helpers/exportToFile";

// Download Types
import {
  downloadAsDocx,
  downloadPdf,
  handleDownload,
  handleDownloadHTML,
} from "@/components/atoms/downloadContent/download";
import Highlighter from "react-highlight-words";
import { useTextLength } from "../../hooks/context/EditorTextLength";

const CheckerEditor = ({
  editor,
  handleCorrectAll,
  loading,
  handleMistakesErrorChange,
}) => {
  //Responsive
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [exportDropDown, setExportDropDown] = useState(false);

  const checker = useAppSelector((state) => state.checker);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useAppDispatch();
  const [correct, setCorrect] = useState([]);
  const { setTextLengthValue } = useTextLength();

  const [scrollPosition, setScrollPosition] = useState(0);
  const hiddenContentRef = useRef(null);
  const visibleContentRef = useRef(null);

  //Ai PopUp
  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(checker.checkerAi.aiResponse)
      .run();
  }, [checker.checkerAi.aiResponse]);

  const splitText = useMemo(() => {
    return editor.getText().split(/\s+/);
  }, [editor.getText()]);

  useEffect(() => {
    let arr = [];
    splitText.filter((word) => {
      Object.values(checker.mistakes).forEach((value) => {
        if (word === value["word/sentence error"]) {
          arr.push({
            correct: value.correction,
            mistake: value["word/sentence error"],
            type: value["type of language error"],
          });
        }
      });
    });
    setCorrect(arr);
    handleMistakesErrorChange(arr);
  }, [checker.mistakes, editor.getText()]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.classList.contains("btn-correct")) {
        const mistake = e.target.id;
        const correct = e.target.innerText;
        const text = editor.getText().replace(mistake, correct);
        dispatch(setContent(text));
        dispatch(correctMistake({ mistake, correct }));
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [checker.mistakes, dispatch]);

  //Close DropList
  const refExportDropdown = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        refExportDropdown.current &&
        !refExportDropdown.current.contains(event.target)
      ) {
        setExportDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refExportDropdown, setExportDropDown]);

  const accordionData = {
    "Spelling Mistake": {
      class: "mistake",
    },
    "Grammatical Error": {
      class: "grammar",
    },
    "Lexicon Error": {
      class: "lexicon",
    },
    "Drafting Error": {
      class: "drafting",
    },
  };

  const textLength = editor?.getText().length;
  useEffect(() => {
    setTextLengthValue(textLength);
  }, [editor?.getText().length]);

  const visableContentScroll = (e) => {
    if (visibleContentRef.current) {
      const scrollPosition = visibleContentRef.current.scrollTop;
      setScrollPosition(scrollPosition);
    }
  };

  useEffect(() => {
    if (hiddenContentRef.current) {
      hiddenContentRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  const mistakesError = correct.map((item) => item.mistake);

  return (
    <div className="">
      {/* Upload File */}
      {!editor.getText().length && (
        <Stack
          direction="horizontal"
          gap={3}
          className={`
          position-absolute 
           ${
             isBelowDesktop
               ? "bottom-0 start-50 translate-middle w-100 justify-content-center "
               : "top-0 start-0 m-4"
           } `}
          style={{ zIndex: 100 }}
        >
          <CustomButton
            iconPrefix={<PasteIcon width={18} height={18} />}
            outline
            className="add-text custom-backbround-Button   px-4 "
            onClick={() => {
              try {
                navigator.clipboard.readText().then((text) => {
                  dispatch(setContent(text));
                });
              } catch (error) {}
            }}
          >
            <span className="textcolor fw-bold ">ضع النص</span>
          </CustomButton>
          {/* <CustomButton
            iconPrefix={<UploadIcon width={18} height={18} />}
            outline
            className="position-relative   custom-backbround-Button add-text"
          >
            <input
              type="file"
              className="
              custom-backbround-Button
              opacity-0
              position-absolute
              w-100
              h-100
              top-0
              start-0
            "
              accept=".doc,.docx,.pdf,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file);
                  getTextFromFile(formData, checker.currentDoc).then((text) => {
                    dispatch(setContent(text));
                  });
                }
              }}
            />
            <span className="textcolor fw-bold">تحميل ملف</span>
          </CustomButton> */}
        </Stack>
      )}

      <div
        style={{
          opacity: 1,
          position: "absolute",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
          color: mistakesError?.length > 0 ? "#001B79" : "transparent",
          height: "500px",
          overflowY: "scroll",
          width: "97%",
          userSelect: "text",
          // top: 0,
        }}
        className="editor-content-highlighter"
        ref={hiddenContentRef}
        contentEditable={mistakesError?.length > 0 ? "true" : "false"}
      >
        <Highlighter
          searchWords={mistakesError}
          autoEscape={true}
          textToHighlight={editor.getText()}
          highlightStyle={{}}
          highlightTag={({ children }) => (
            <span
              style={{}}
              className={
                accordionData[
                  correct.find((item) => item.mistake === children)?.type
                ]?.class
              }
            >
              {children}
            </span>
          )}
        />
      </div>

      {/* Editor Input make scroll to contain big articles */}
      <div
        style={{
          width: "97%",
          height: "500px",
          overflowY: "scroll",
        }}
        className="editor-content"
        onScroll={visableContentScroll}
        ref={visibleContentRef}
      >
        <div
          style={{
            color: mistakesError?.length > 0 ? "transparent" : "#001B79",
            opacity: 1,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            cursor: "text",
            paddingBottom: "150px",
          }}
          className="editor-style"
          mistakes-error={mistakesError?.length > 0 ? "true" : "false"}
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* dropdown for show misatke word and correct and user can select correct word  */}
      <div
        className="mistake-popup"
        style={{
          color: "transparent",
          position: "absolute",
          width: "100%",
          // height: "100%",
          whiteSpace: "inherit",
          overflowWrap: "break-word",
          lineHeight: "inherit",
          lineBreak: "strict",
          paddingBottom: "150px",
          height: "200px",
        }}
      >
        {splitText.map((word, index) => {
          const relatedMistake = correct.find((item) => item.mistake === word);
          if (relatedMistake) {
            return (
              <span
                key={index}
                className="hover-to-display"
                style={{ position: "relative", display: "inline", zIndex: 50 }}
              >
                {word}
                {"\n"}
              </span>
            );
          }
          return word; // Render the word as it is if no mistake
        })}
      </div>

      {/* PlaceHolder */}
      {!editor.getText() && (
        <Stack
          // Stack
          style={{
            opacity: 1,
            color: "#001B7940",
            top: "13px",
          }}
          className="place-holder position-absolute  fw-light fs-6 "
        >
          <span>
            ابدأ بكتابة نص أو ضع النص الذي تريد تدقيقه لُغَوِيّاً في المحرر{" "}
            <span style={{ fontFamily: "sans-serif" }}> (+V) </span>
            أو تحميل
          </span>
          <div>
            {" "}
            مستند{" "}
            <span style={{ fontFamily: "sans-serif" }}>(DOC،PDF،TXT)</span>.
          </div>
        </Stack>
      )}

      {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Box at bottom */}
      {!isBelowDesktop && (
        <Card
          style={{ width: "40%" }}
          className="position-absolute    bottom-0   translate-middle mb-2 bg-light"
        >
          <Stack
            className="d-flex justify-content-between"
            direction="horizontal"
            gap={5}
          >
            <CustomButton
              className=" copy-download-box"
              onClick={() => {
                navigator.clipboard.writeText(editor.getText());
              }}
            >
              <CopyIcon width={30} height={30} />
            </CustomButton>

            <div>
              <div ref={refExportDropdown} className="p-0 copystyle">
                <div
                  className={
                    "position-relative  cursor-pointer-e copystyle p-0"
                  }
                  onClick={() => {
                    setExportDropDown((prev) => !prev);
                  }}
                >
                  {exportDropDown && (
                    <div
                      dir="ltr"
                      style={{ top: "-180px" }}
                      className="  dropListExport   position-absolute"
                    >
                      <button
                        onClick={() => handleDownloadHTML(editor)}
                        className="DroplistButton"
                      >
                        <div className="flex-grow-1 text-center">HTML</div>
                        <img src={html} className=" droplistImage" />
                      </button>
                      <button
                        onClick={() => handleDownload(editor)}
                        className="DroplistButton"
                      >
                        <div className="flex-grow-1 text-center">TXT</div>
                        <img src={txt} className=" droplistImage" />
                      </button>
                      <button
                        onClick={() => downloadPdf(editor)}
                        className="DroplistButton"
                      >
                        <div className=" flex-grow-1 text-center">PDF</div>
                        <img src={pdf} className=" droplistImage" />
                      </button>
                      <button
                        onClick={() => downloadAsDocx(editor)}
                        className="DroplistButton"
                      >
                        <div className=" flex-grow-1 text-center">DOXC</div>
                        <img src={doc} className=" droplistImage" />
                      </button>
                    </div>
                  )}

                  <DownloadIcon width={25} height={25} />
                </div>
              </div>
            </div>

            <div className="position-relative ">
              <CustomButton
                className="errorButton customnumber-button d-flex justify-content-around gap-1 align-items-center"
                outline
                style={{
                  border: "1px solid #5225CE33",
                  padding: "5px 15px",
                  gap: "2px",
                }}
                onClick={() => setDropDown(!dropDown)}
              >
                <span
                  style={{
                    fontFamily: "sans-serif",
                    padding: "0px 2px",
                    fontWeight: "300",
                  }}
                >
                  {editor.getText().trim().split(/\s+/).length - 1}
                </span>
                <span>كلمات</span>
                <MdKeyboardArrowDown className="stop-Transation  custom-arrow" />
              </CustomButton>
              {dropDown && (
                <MultiOptionDropDown
                  top
                  options={[
                    {
                      value: (
                        <div className=" d-flex gap-1 align-items-center text-center justify-content-start">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().trim().split(/\s+/).length - 1}{" "}
                          </span>
                          <span>كلمات</span>
                        </div>
                      ),
                      className: "px-4 fs-6 custom-word py-1 mt-2",
                    },
                    {
                      value: (
                        <div className=" d-flex gap-1  justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().replace(/\s+/g, "").length}{" "}
                          </span>
                          <span>حروف</span>
                        </div>
                      ),
                      className: " fs-6 px-4 custom-word py-1  mt-2",
                    },
                    {
                      value: (
                        <div className=" d-flex gap-1 justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().split(/[.,]\s*/).length - 1}{" "}
                          </span>
                          <span>جمل</span>
                        </div>
                      ),
                      className: " fs-6 px-4 custom-word  py-1  mt-2",
                    },
                  ]}
                  onClose={() => setDropDown(false)}
                />
              )}
            </div>

            <CustomButton
              className="errorButton anther-text"
              onClick={handleCorrectAll}
              disabled={editor.getText().length === 0}
            >
              تدقيق الأن
            </CustomButton>
            <button className=" border-0 bg-white border-customNumber" onlyIcon>
              <Stack
                direction="horizontal"
                className="rounded-circle number-copy-download-box border-customNumber   items-center justify-center position-relative"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <div
                  className="position-absolute top-50 start-50"
                  style={{
                    transform: "translate(-50%,-50%)",
                    fontFamily: "sans-serif",
                    fontSize: "12px",
                  }}
                >
                  {Object.keys(checker.mistakes || {}).length}
                </div>
              </Stack>
            </button>
          </Stack>
        </Card>
      )}
    </div>
  );
};

export default CheckerEditor;






////////////////////////////
import { EditorContent } from "@tiptap/react";
import lodash from "lodash";
import { useBreakpoint } from "use-breakpoint";
import { Stack } from "react-bootstrap";

//Images
import PasteIcon from "@/assets/icons/Paste";
import UploadIcon from "@/assets/icons/Upload";
import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import html from "@/assets/Images/reformulate/html-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";
import CopyIcon from "@/assets/icons/Copy";
import DownloadIcon from "@/assets/icons/Download";

//Files
import CustomButton from "@/components/atoms/Button";
import Card from "./Card";
import { BREAKPOINTS } from "../../helpers/constants";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MdKeyboardArrowDown } from "react-icons/md";
import "../atoms/atoms.css";
import "./molecules.css";
import {
  correctMistake,
  correctMistakes,
  setContent,
} from "../../redux/features/api/apiSlice";
import { getTextFromFile } from "../../helpers/getTextFromFile";
import { exportToFile } from "../../helpers/exportToFile";

// Download Types
import {
  downloadAsDocx,
  downloadPdf,
  handleDownload,
  handleDownloadHTML,
} from "@/components/atoms/downloadContent/download";
import Highlighter from "react-highlight-words";
import { useTextLength } from "../../hooks/context/EditorTextLength";

const CheckerEditor = ({
  editor,
  handleCorrectAll,
  loading,
  handleMistakesErrorChange,
}) => {
  //Responsive
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [exportDropDown, setExportDropDown] = useState(false);

  const checker = useAppSelector((state) => state.checker);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useAppDispatch();
  const [correct, setCorrect] = useState([]);
  const { setTextLengthValue } = useTextLength();

  const [scrollPosition, setScrollPosition] = useState(0);
  const hiddenContentRef = useRef(null);
  const visibleContentRef = useRef(null);
  const [highlightErea, setHighlightErea] = useState(false);

  //Ai PopUp
  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(checker.checkerAi.aiResponse)
      .run();
  }, [checker.checkerAi.aiResponse]);

  const splitText = useMemo(() => {
    return editor.getText().split(/\s+/);
  }, [editor.getText()]);

  useEffect(() => {
    let arr = [];
    splitText.filter((word) => {
      Object.values(checker.mistakes).forEach((value) => {
        if (word === value["word/sentence error"]) {
          arr.push({
            correct: value.correction,
            mistake: value["word/sentence error"],
            type: value["type of language error"],
          });
        }
      });
    });
    setCorrect(arr);
    handleMistakesErrorChange(arr);
  }, [checker.mistakes, editor.getText()]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.classList.contains("btn-correct")) {
        const mistake = e.target.id;
        const correct = e.target.innerText;
        const text = editor.getText().replace(mistake, correct);
        dispatch(setContent(text));
        dispatch(correctMistake({ mistake, correct }));
      } else if (e.target.classList.contains("editor-content-highlighter")) {
        setHighlightErea(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [checker.mistakes, dispatch]);

  //Close DropList
  const refExportDropdown = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        refExportDropdown.current &&
        !refExportDropdown.current.contains(event.target)
      ) {
        setExportDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refExportDropdown, setExportDropDown]);

  const accordionData = {
    "Spelling Mistake": {
      class: "mistake",
    },
    "Grammatical Error": {
      class: "grammar",
    },
    "Lexicon Error": {
      class: "lexicon",
    },
    "Drafting Error": {
      class: "drafting",
    },
  };

  const textLength = editor?.getText().length;
  useEffect(() => {
    setTextLengthValue(textLength);
  }, [editor?.getText().length]);

  const visableContentScroll = (e) => {
    if (visibleContentRef.current) {
      const scrollPosition = visibleContentRef.current.scrollTop;
      setScrollPosition(scrollPosition);
    }
  };

  useEffect(() => {
    if (hiddenContentRef.current) {
      hiddenContentRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  const mistakesError = correct.map((item) => item.mistake);

  return (
    <div className="">
      {/* Upload File */}
      {!editor.getText().length && (
        <Stack
          direction="horizontal"
          gap={3}
          className={`
          position-absolute 
           ${
             isBelowDesktop
               ? "bottom-0 start-50 translate-middle w-100 justify-content-center "
               : "top-0 start-0 m-4"
           } `}
          style={{ zIndex: 100 }}
        >
          <CustomButton
            iconPrefix={<PasteIcon width={18} height={18} />}
            outline
            className="add-text custom-backbround-Button   px-4 "
            onClick={() => {
              try {
                navigator.clipboard.readText().then((text) => {
                  dispatch(setContent(text));
                });
              } catch (error) {}
            }}
          >
            <span className="textcolor fw-bold ">ضع النص</span>
          </CustomButton>
          {/* <CustomButton
            iconPrefix={<UploadIcon width={18} height={18} />}
            outline
            className="position-relative   custom-backbround-Button add-text"
          >
            <input
              type="file"
              className="
              custom-backbround-Button
              opacity-0
              position-absolute
              w-100
              h-100
              top-0
              start-0
            "
              accept=".doc,.docx,.pdf,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file);
                  getTextFromFile(formData, checker.currentDoc).then((text) => {
                    dispatch(setContent(text));
                  });
                }
              }}
            />
            <span className="textcolor fw-bold">تحميل ملف</span>
          </CustomButton> */}
        </Stack>
      )}

      <div
        style={{
          opacity: 1,
          position: "absolute",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
          color:
            mistakesError?.length > 0 || !highlightErea
              ? "#001B79"
              : "transparent",
          height: "500px",
          overflowY: "scroll",
          width: "97%",
          userSelect: "text",
          // top: 0,
        }}
        className="editor-content-highlighter"
        ref={hiddenContentRef}
        contentEditable={
          mistakesError?.length > 0 && highlightErea ? "true" : "false"
        }
      >
        <Highlighter
          searchWords={mistakesError}
          autoEscape={true}
          textToHighlight={editor.getText()}
          highlightStyle={{}}
          highlightTag={({ children }) => (
            <span
              style={{}}
              className={
                accordionData[
                  correct.find((item) => item.mistake === children)?.type
                ]?.class
              }
            >
              {children}
            </span>
          )}
        />
      </div>

      {/* Editor Input make scroll to contain big articles */}
      <div
        style={{
          width: "97%",
          height: "500px",
          overflowY: "scroll",
        }}
        className="editor-content"
        onScroll={visableContentScroll}
        ref={visibleContentRef}
      >
        <div
          style={{
            color:
              mistakesError?.length > 0 || !highlightErea
                ? "transparent"
                : "#001B79",
            opacity: 1,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            cursor: "text",
            paddingBottom: "150px",
          }}
          className="editor-style"
          mistakes-error={
            mistakesError?.length > 0 && highlightErea ? "true" : "false"
          }
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* dropdown for show misatke word and correct and user can select correct word  */}
      <div
        className="mistake-popup"
        style={{
          color: "transparent",
          position: "absolute",
          width: "100%",
          // height: "100%",
          whiteSpace: "inherit",
          overflowWrap: "break-word",
          lineHeight: "inherit",
          lineBreak: "strict",
          paddingBottom: "150px",
          height: "200px",
        }}
      >
        {splitText.map((word, index) => {
          const relatedMistake = correct.find((item) => item.mistake === word);
          if (relatedMistake) {
            return (
              <span
                key={index}
                className="hover-to-display"
                style={{ position: "relative", display: "inline", zIndex: 50 }}
              >
                {word}
                {"\n"}
              </span>
            );
          }
          return word; // Render the word as it is if no mistake
        })}
      </div>

      {/* PlaceHolder */}
      {!editor.getText() && (
        <Stack
          // Stack
          style={{
            opacity: 1,
            color: "#001B7940",
            top: "13px",
          }}
          className="place-holder position-absolute  fw-light fs-6 "
        >
          <span>
            ابدأ بكتابة نص أو ضع النص الذي تريد تدقيقه لُغَوِيّاً في المحرر{" "}
            <span style={{ fontFamily: "sans-serif" }}> (+V) </span>
            أو تحميل
          </span>
          <div>
            {" "}
            مستند{" "}
            <span style={{ fontFamily: "sans-serif" }}>(DOC،PDF،TXT)</span>.
          </div>
        </Stack>
      )}

      {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Box at bottom */}
      {!isBelowDesktop && (
        <Card
          style={{ width: "40%" }}
          className="position-absolute    bottom-0   translate-middle mb-2 bg-light"
        >
          <Stack
            className="d-flex justify-content-between"
            direction="horizontal"
            gap={5}
          >
            <CustomButton
              className=" copy-download-box"
              onClick={() => {
                navigator.clipboard.writeText(editor.getText());
              }}
            >
              <CopyIcon width={30} height={30} />
            </CustomButton>

            <div>
              <div ref={refExportDropdown} className="p-0 copystyle">
                <div
                  className={
                    "position-relative  cursor-pointer-e copystyle p-0"
                  }
                  onClick={() => {
                    setExportDropDown((prev) => !prev);
                  }}
                >
                  {exportDropDown && (
                    <div
                      dir="ltr"
                      style={{ top: "-180px" }}
                      className="  dropListExport   position-absolute"
                    >
                      <button
                        onClick={() => handleDownloadHTML(editor)}
                        className="DroplistButton"
                      >
                        <div className="flex-grow-1 text-center">HTML</div>
                        <img src={html} className=" droplistImage" />
                      </button>
                      <button
                        onClick={() => handleDownload(editor)}
                        className="DroplistButton"
                      >
                        <div className="flex-grow-1 text-center">TXT</div>
                        <img src={txt} className=" droplistImage" />
                      </button>
                      <button
                        onClick={() => downloadPdf(editor)}
                        className="DroplistButton"
                      >
                        <div className=" flex-grow-1 text-center">PDF</div>
                        <img src={pdf} className=" droplistImage" />
                      </button>
                      <button
                        onClick={() => downloadAsDocx(editor)}
                        className="DroplistButton"
                      >
                        <div className=" flex-grow-1 text-center">DOXC</div>
                        <img src={doc} className=" droplistImage" />
                      </button>
                    </div>
                  )}

                  <DownloadIcon width={25} height={25} />
                </div>
              </div>
            </div>

            <div className="position-relative ">
              <CustomButton
                className="errorButton customnumber-button d-flex justify-content-around gap-1 align-items-center"
                outline
                style={{
                  border: "1px solid #5225CE33",
                  padding: "5px 15px",
                  gap: "2px",
                }}
                onClick={() => setDropDown(!dropDown)}
              >
                <span
                  style={{
                    fontFamily: "sans-serif",
                    padding: "0px 2px",
                    fontWeight: "300",
                  }}
                >
                  {editor.getText().trim().split(/\s+/).length - 1}
                </span>
                <span>كلمات</span>
                <MdKeyboardArrowDown className="stop-Transation  custom-arrow" />
              </CustomButton>
              {dropDown && (
                <MultiOptionDropDown
                  top
                  options={[
                    {
                      value: (
                        <div className=" d-flex gap-1 align-items-center text-center justify-content-start">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().trim().split(/\s+/).length - 1}{" "}
                          </span>
                          <span>كلمات</span>
                        </div>
                      ),
                      className: "px-4 fs-6 custom-word py-1 mt-2",
                    },
                    {
                      value: (
                        <div className=" d-flex gap-1  justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().replace(/\s+/g, "").length}{" "}
                          </span>
                          <span>حروف</span>
                        </div>
                      ),
                      className: " fs-6 px-4 custom-word py-1  mt-2",
                    },
                    {
                      value: (
                        <div className=" d-flex gap-1 justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().split(/[.,]\s*/).length - 1}{" "}
                          </span>
                          <span>جمل</span>
                        </div>
                      ),
                      className: " fs-6 px-4 custom-word  py-1  mt-2",
                    },
                  ]}
                  onClose={() => setDropDown(false)}
                />
              )}
            </div>

            <CustomButton
              className="errorButton anther-text"
              onClick={handleCorrectAll}
              disabled={editor.getText().length === 0}
            >
              تدقيق الأن
            </CustomButton>
            <button className=" border-0 bg-white border-customNumber" onlyIcon>
              <Stack
                direction="horizontal"
                className="rounded-circle number-copy-download-box border-customNumber   items-center justify-center position-relative"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <div
                  className="position-absolute top-50 start-50"
                  style={{
                    transform: "translate(-50%,-50%)",
                    fontFamily: "sans-serif",
                    fontSize: "12px",
                  }}
                >
                  {Object.keys(checker.mistakes || {}).length}
                </div>
              </Stack>
            </button>
          </Stack>
        </Card>
      )}
    </div>
  );
};

export default CheckerEditor;



