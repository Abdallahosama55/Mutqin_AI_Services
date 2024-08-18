//ImportedModules
import { Stack } from "react-bootstrap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import { FontSize } from "@/helpers/tiptap-fontsize";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import Image from "@tiptap/extension-image";

// Imported Files
import { setContent, setText } from "@/redux/features/api/apiSlice";
import ReformulateToolbar from "./ReformulateToolbar";
import ReformulateEditor from "./ReformulateEditor";
import { useEffect, useState } from "react";
import { Indent } from "@/pages/editor/indent";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchData } from "../../../redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import LinkModal from "../../molecules/LinkModal";

const ReformulatePanel = ({
  onEditorUpdate,
  setEditorData,
  noGenerate,
  right,
  show_option,
  loading,
  data,
}) => {
  //Responsive
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  //Start with lang. Arabic
  const [isFirstTextArabic, setIsFirstTextArabic] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  
  //Editor
  const editor = useEditor({
    content: "",
    editable: true,
    parseOptions: { preserveWhitespace: "full" },
    //Change Editor content while writing
    onUpdate: ({ editor }) => {
      if (onEditorUpdate) onEditorUpdate(editor);

      // dispatch(setContent(editor.getHTML()));
      // dispatch(updateDocument({ content: editor.getText(), isEditor: true }));
      // dispatch(setText(editor.getText()));

      //Check if First letter is  Arabic
      if (editor.getText().length === 1) {
        const isFirstTextArabic =
          /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/.test(
            editor.getText().trim()
          );
        setIsFirstTextArabic(isFirstTextArabic);
      }
    },
    extensions: [
      StarterKit,
      TextStyle,
      Indent,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "right",
      }),
      Link.configure({
        linkOnPaste: false,
        openOnClick: false,
      }),
      Typography,
      FontSize,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { style: "max-width: 100%" },
      }),
    ],
  });

  useEffect(() => {
    if (editor && data)
      editor.commands.setContent(
        right === "yes" ? data.original_text : data.rephrased_text,
        true,
        {
          preserveWhitespace: "full",
        }
      );
  }, [data]);
  return editor ? (
    <>
      <Stack className={`${isBelowDesktop ? "px-0 ": " h-50  "}`} gap={2}>
        <Stack
          className={`justify-content-center pb-3   ${
            !noGenerate ? "px-3" : "px-3"
          }  border-top w-100  border-bottom   `}
          direction="horizontal"
        >
          {/* ToolBar */}
          <ReformulateToolbar editor={editor} noGenerate={noGenerate} />
         
        </Stack>
        <Stack className="flex-fill   w-100  editorCustom  fs-5 position-relative p-4">

   
        <LinkModal
        onClose={() => {
          setOpenModal(false);
          // setOpenPop(false);
        }}
        // show={openPop}
        show={openModal}
        />
          <Stack className="  w-100">
            {/* Editor */}
            {loading ? (
              <Skeleton height={50} count={10} />
            ) : (
              <ReformulateEditor
                isFirstTextArabic={isFirstTextArabic}
                noGenerate={noGenerate}
                editor={editor}
                show_option={show_option}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  ) : (
    <Skeleton count={10} height={40} />
  );
};

export default ReformulatePanel;
