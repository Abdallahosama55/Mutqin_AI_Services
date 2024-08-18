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
import EditorToolbar from "@/components/molecules/EditorToolbar";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import Editor from "@/components/molecules/Editor";
import {
  setContent,
  setText,
  updateDocument,
} from "@/redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import "./editor-panel.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Toolbar from "../components/molecules/Toolbar";
import { Box } from "@mui/material";
const EditorPanel = ({
  isInner = false,
  placeholderText = "ابدأ بكتابة نص",
  neverSplit = false,
}) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const state = useAppSelector((state) => state);

  const location = useLocation();
  const editor = useEditor({
    content: location.state?.article || location.state?.message || "",

    parseOptions: { preserveWhitespace: "full" },
    editable: true,
    onUpdate: ({ editor }) => {
      dispatch(setContent(editor.getHTML()));
      dispatch(setText(editor.getText()));
      if (editor.getText().slice(-1) === " ") {
        dispatch(updateDocument({ content: editor.getHTML(), isEditor: true }));
      }
    },

    onBlur: ({ editor }) => {
      dispatch(setContent(editor.getHTML()));
      dispatch(setText(editor.getText()));
      dispatch(updateDocument({ content: editor.getHTML(), isEditor: true }));
    },

    extensions: [
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
      }),
    ],
  });

  useEffect(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(state.checker.content, false, {
        preserveWhitespace: "full",
      });
      editor.commands.setTextSelection({ from, to });
    }
  }, [state.checker.content]);
  const dispatch = useAppDispatch();
  if (editor === null) return null;
  return (
    <>
      <Stack
        className={`${
          isBelowDesktop || isInner ? "px-0" : "px-5 h-100"
        } m-auto ${isInner && ".editor-panel"}`}
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
          } fs-5 position-relative `}
          style={{
            minHeight: isBelowDesktop || isInner ? "75vh" : "",
            [isInner && "borderRadius"]: "1rem !important",
          }}
        >
          <Stack
            style={{
              marginTop: "3rem",
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
                  neverSplit={neverSplit}
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
                    editor={editor}
                    hideExtraComp={true}
                    placeholderText={placeholderText}
                  />
                </Box>
              </>
            ) : (
              <Stack
                style={{
                  marginTop: "3rem",
                }}
              >
                <Editor editor={editor} placeholderText={placeholderText} />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default EditorPanel;
