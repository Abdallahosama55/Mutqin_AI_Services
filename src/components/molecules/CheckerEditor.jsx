import { useEffect, useState } from "react";
import { EditorContent } from "@tiptap/react";
import { Stack } from "react-bootstrap";
import CustomButton from "@/components/atoms/Button";
import { useBreakpoint } from "use-breakpoint";

// Images
import PasteIcon from "@/assets/icons/Paste";
import CopyIcon from "@/assets/icons/Copy";

// Files
import Card from "./Card";
import { BREAKPOINTS } from "../../helpers/constants";
import MultiOptionDropDown from "./MultiOptionDropDown";

import { useAppDispatch } from "../../redux/hooks";
import { MdKeyboardArrowDown } from "react-icons/md";
import "../atoms/atoms.css";
import "./molecules.css";
import { setContent } from "../../redux/features/api/apiSlice";

const CheckerEditor = ({
  editor,
  checker,
  loading,
  hoveredMistake,
  popperElement,
  setPopperElement,
  handleCheckMistakes,
  copyContent,
}) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const dispatch = useAppDispatch();

  const [dropDown, setDropDown] = useState(false);
  const [clipboardText, setClipboardText] = useState("");

  useEffect(() => {
    if (hoveredMistake) {
      setPopperElement(popperElement);
    }
  }, [hoveredMistake, setPopperElement]);

  useEffect(() => {
    if (editor) {
      dispatch(setContent(editor.getText()));
    }
  }, [editor, dispatch]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardText(text);
      dispatch(copyContent(text));
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <div className="editor-container">
      {!editor?.getText().length && (
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
            className="add-text custom-backbround-Button px-4"
            onClick={handlePaste}
          >
            <span className="textcolor fw-bold ">ضع النص</span>
          </CustomButton>
        </Stack>
      )}

      {/*  Editor */}
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>

      {/* PlaceHolder */}
      {!editor.getText() && (
        <Stack
          style={{
            opacity: 1,
            color: "#001B7940",
            top: "13px",
          }}
          className="place-holder position-absolute fw-light fs-6"
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
          className="position-absolute bottom-0 translate-middle mb-2 bg-light"
        >
          <Stack
            className="d-flex justify-content-between"
            direction="horizontal"
            gap={5}
          >
            <CustomButton
              className="copy-download-box"
              onClick={() => {
                navigator.clipboard.writeText(editor.getText());
              }}
            >
              <CopyIcon width={30} height={30} />
            </CustomButton>

            <div className="position-relative">
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
                <MdKeyboardArrowDown className="stop-Transation custom-arrow" />
              </CustomButton>
              {dropDown && (
                <MultiOptionDropDown
                  top
                  options={[
                    {
                      value: (
                        <div className="d-flex gap-1 align-items-center text-center justify-content-start">
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
                        <div className="d-flex gap-1 justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().replace(/\s+/g, "").length}{" "}
                          </span>
                          <span>حروف</span>
                        </div>
                      ),
                      className: "fs-6 px-4 custom-word py-1 mt-2",
                    },
                    {
                      value: (
                        <div className="d-flex gap-1 justify-content-start align-items-center">
                          <span style={{ fontFamily: "sans-serif" }}>
                            {editor.getText().split(/[.,]\s*/).length - 1}{" "}
                          </span>
                          <span>جمل</span>
                        </div>
                      ),
                      className: "fs-6 px-4 custom-word py-1 mt-2",
                    },
                  ]}
                  onClose={() => setDropDown(false)}
                />
              )}
            </div>

            <CustomButton
              className="errorButton anther-text"
              onClick={handleCheckMistakes}
              disabled={editor.getText().length === 0}
            >
              تدقيق الأن
            </CustomButton>
            <button className="border-0 bg-white border-customNumber" onlyIcon>
              <Stack
                direction="horizontal"
                className="rounded-circle number-copy-download-box border-customNumber items-center justify-center position-relative"
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
