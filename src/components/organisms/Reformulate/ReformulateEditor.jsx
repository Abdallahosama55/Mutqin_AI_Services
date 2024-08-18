import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Res.css";
import LinkModal from "../../molecules/LinkModal";
import webicon from "../../../assets/Images/reformulate/streamline_web.png"
import uploadicon from "../../../assets/Images/reformulate/lets-icons_upload-light.png"
import writeicon from "../../../assets/Images/reformulate/system-uicons_write.png"

const ReformulateEditor = ({ editor, noGenerate, isFirstTextArabic ,  show_option}) => {
  // Reformulated Data
  const { data } = useSelector((state) => state.api?.rephrasePost);

  // State to check if the editor has text or not
  const [hasText, setHasText] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showOption,setShowOption]= useState(true);
  useEffect(() => {
    if (editor) {
      editor.on('update', () => {
        setHasText(editor.getHTML() !== "<p></p>");
      });
    }
  }, [editor]);

  // Put Reformulate "rephrased_text" data to Left Editor
  useEffect(() => {
    if (noGenerate && data?.rephrased_text && data?.paraphrase) {
      editor.commands.setContent(data.rephrased_text, true);
    }
  }, [editor, data?.rephrased_text, noGenerate]);

  // Put Reformulate "original_text" data to Left Editor
  useEffect(() => {
    if (!noGenerate && data?.original_text) {
      editor.commands.setContent(data.original_text, true);
    }
  }, [editor, data?.original_text, noGenerate]);

  return (
    <div
      className="w-100 position-relative"
      dir={isFirstTextArabic ? "rtl" : "ltr"}
    >
      {!hasText? (
        <div className={` ${!showOption ||!show_option   ? "d-none" :""} w-100 d-flex justify-content-center top-100 mt-5 position-absolute  z-3 py-3 `}>
          <div className=" row  px-md-5 mt-md-5  w-100 justify-content-center">

            <div className=" col-md-4 p-2 h-md-100">
              <button className=" bg-transparent rounded-4 border-options-reformulate p-2 py-3 h-md-100 w-100" onClick={() => setOpenModal(true)}>
                <div className=" d-flex justify-content-center align-items-center">
                  <div className=" d-block">
                    <img src={webicon} alt="import" style={{width:"45px"}}/>
                    <div className=" mt-md-3">إسترداد من الويب</div>
                  </div>
                </div>
              </button>
            </div>
            <div className=" col-md-4 p-2 h-md-100">
              <button className="  write-btn bg-transparent rounded-4 border-options-reformulate p-2 py-3 h-md-100 w-100" onClick={() => {
                setShowOption(false)
                editor.commands.focus();
              }}>
                <div className=" d-flex justify-content-center align-items-center">
                  <div className=" d-block">
                    <img src={writeicon} alt="import" style={{width:"45px"}}/>
                    <div className=" mt-md-3">ضع نص</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <LinkModal
            onClose={() => setOpenModal(false)}
            show={openModal}
          />
        </div>
      ) : ""}
      <EditorContent
        editor={editor}
        className="editorFontText"
        onClick={() => editor.commands.focus()}
      />
      {
        !noGenerate && !hasText && (
          <p
            className="place-holder custom-placeHolder position-absolute text-text-gray top-0 end-0"
            onClick={() => editor.commands.focus()}
          >
            يُرجى تقديم النص الذي ترغب في صياغته، وسأكون سعيدًا بمساعدتك في ذلك
          </p>
        )
      }
    </div>
  );
};

export default ReformulateEditor;
