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
import EditorToolbar from "./EditorToolbar";
import Image from "@tiptap/extension-image";
import { useEffect, useRef } from "react";
import Editor from "./Editor";
import "./editor-panel.css";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateDocMutation,
  useLazyGetDocQuery,
  useUpdateDocMutation,
} from "@/redux/slices/editor/editorEndpoints";
import { tryCatch } from "@/Util/Create-article/helpers";
import Skeleton from "react-loading-skeleton";
import { setContent, setText } from "@/redux/slices/editor/editorSlice";
import {
  setTitle,
  toggleDocIsCreated,
  toggleIsDocFromWeb,
} from "@/redux/slices/editor/editorSlice";
import Showdown from "showdown";
import { Indent } from "./indent";
const EditorPanel = ({
  isInner = false,
  placeholderText = "ابدأ بكتابة نص",
}) => {
  ///////////////////////////////////<Variables>////////////////////////////
  const [getDocument, { isFetching: getDocLoading }] = useLazyGetDocQuery();
  const [createDecument] = useCreateDocMutation();
  const [updateDecument] = useUpdateDocMutation();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { title, content, isDocFromWeb, docIsCreated } = useSelector(
    (state) => state.editor
  );
  const timer = useRef(null);
  // const documentCreated = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";

  const handleDocUpdate = async (title, data, id) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      if (!docIsCreated && data) {
        // documentCreated.current = true;
        dispatch(toggleDocIsCreated(true));
        const create = await tryCatch(
          createDecument.bind(null, {
            id,
            content: data,
            title: title || "مستند بدون عنوان",
          })
        );
        if (!create) dispatch(toggleDocIsCreated(false));
      }
      if (docIsCreated && data) {
        tryCatch(
          updateDecument.bind(null, {
            id,
            content: data,
            title: title || "مستند بدون عنوان",
          })
        );
      }
    }, 1000);
  };

  const editor = useEditor({
    content: "",
    parseOptions: { preserveWhitespace: "full" },
    editable: true,
    onUpdate: ({ editor }) => {
      dispatch(setContent(editor.getHTML()));
      dispatch(setText(editor.getText()));
      handleDocUpdate(title, editor.getHTML(), params.id);
    },
    extensions: [
      Indent,
      StarterKit,
      TextStyle,
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

  //////////////////////////////<UseEffect>///////////////////////////////
  useEffect(() => {
    if (params.id && !searchParams.get("new") && editor)
      tryCatch(getDocument.bind(null, { id: params.id })).then((docDetails) => {
        if (docDetails) {
          // documentCreated.current = true;
          dispatch(toggleDocIsCreated(true));
          dispatch(setTitle(docDetails.title));
          dispatch(setContent(docDetails.content));
          editor.commands.setContent(docDetails.content, false, {
            preserveWhitespace: "full",
          });
        }
      });
  }, [params.id, editor]);

  useEffect(() => {
    if (editor?.getText() && searchParams.get("new")) {
      searchParams.delete("new");
      setSearchParams(searchParams, {
        replace: true,
      });
    }
    // It only runs if the editor switches from blank
  }, [!editor?.getText()]);

  useEffect(() => {
    if ((location.state?.content || location.state?.message) && editor) {
      dispatch(setContent(location.state?.content || location.state?.message));
      editor.commands.setContent(
        location.state?.content || location.state?.message,
        true,
        {
          preserveWhitespace: "full",
        }
      );
    }
  }, [editor]);

  useEffect(() => {
    if (location.state?.title) dispatch(setTitle(location.state.title));
  }, []);

  useEffect(() => {
    if (isDocFromWeb && editor) {
      const converter = new Showdown.Converter();
      editor
        .chain()
        .focus("end")
        // .createParagraphNear()
        .insertContent(converter.makeHtml(content), {
          preserveWhitespace: "full",
        })
        .run();
      dispatch(toggleIsDocFromWeb(false));
    }
  }, [isDocFromWeb]);
  // editor.commands.setImage({});

  if (editor === null) return null;

  return (
    <>
      <Stack
        className={`${
          isBelowDesktop || isInner ? "px-1" : "px-5 h-100"
        }  ${isInner && ".editor-panel"}  bg-white rounded-3`}
        style={isInner ? { width: "100%", margin: 0, height: "100%" } : {}}
        gap={4}
      >
        <Stack className="justify-content-center" direction="horizontal">
          {!isInner && <EditorToolbar editor={editor} />}
        </Stack>
        <Stack
          className={`flex-fill editor border ${
            isInner
              ? isBelowDesktop
                ? "rounded-4 p-3"
                : "rounded-4 p-5"
              : "rounded-3 p-4"
          }  position-relative `}
          style={{
            minHeight: isBelowDesktop || isInner ? "75vh" : "",
            [isInner && "borderRadius"]: "1rem !important",
            fontSize: "14px",
            color: "black",
            maxHeight: "calc(100vh - 184px)",
            overflowY: "scroll",
          }}
        >
          <Stack
            style={{
              marginTop: getDocLoading ? 0 : "2rem",
              [isInner && "margin"]: 0,
            }}
          >
            {isInner ? (
              <>
                <EditorToolbar
                  editor={editor}
                  iconSize={20}
                  gap={2}
                  rmMargin={true}
                  style={{
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    mt: { xs: "25px", md: "50px" },
                    width: "100%",
                    height: "100%",
                    flex: "1",
                    overflow: "scroll",
                    "& input": { pointerEvents: "none" },
                  }}
                >
                  <Editor
                    onTitleChange={handleDocUpdate}
                    editor={editor}
                    hideExtraComp={true}
                    placeholderText={placeholderText}
                  />
                </Box>
              </>
            ) : getDocLoading ? (
              <Skeleton height={50} count={15} />
            ) : (
              <Stack
                style={{
                  marginTop: "3rem",
                }}
              >
                <Editor
                  onTitleChange={handleDocUpdate}
                  editor={editor}
                  placeholderText={placeholderText}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default EditorPanel;
