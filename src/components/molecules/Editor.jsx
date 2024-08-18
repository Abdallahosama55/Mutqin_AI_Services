import { EditorContent } from "@tiptap/react";
import { Spinner, Stack } from "react-bootstrap";
import CustomButton from "../atoms/Button";
import { useEffect, useState } from "react";
import PlusCircleIcon from "@/assets/icons/PlusCircle";
import AskAIModal from "./AskAIModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  editorAskAi,
  setTitle,
  updateDocument,
} from "@/redux/features/api/apiSlice";
import { useLocation } from "react-router-dom";
import { styled, Box } from "@mui/material";

const Editor = ({
  editor,
  placeholderText = "ابدأ بكتابة نص",
  hideExtraComp = false,
}) => {
  const location = useLocation();
  const StyledStack = styled(Stack)({});
  const [askAi, setAskAi] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const onAskAi = (content) => {
    dispatch(editorAskAi({ content }));
  };

  useEffect(() => {
    editor
      .chain()
      .focus("end")
      .createParagraphNear()
      .insertContent(state.checker.ai.aiResponse)
      .run();
  }, [state.checker.ai.aiResponse]);
  const { pathname } = useLocation();

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className={`position-absolute top-0 end-0 m-4 `}
      >
        <input
          type="text"
          className="text-secondary fw-medium border-0 outline-0 "
          value={
            hideExtraComp ? "" : location.state?.title || state.checker.title
          }
          placeholder={hideExtraComp ? "" : "أكتب اسم للملف"}
          onChange={(e) => {
            dispatch(setTitle(e.target.value));
            dispatch(
              updateDocument({
                content: state.checker.content,
                isEditor: pathname.includes("/editor"),
                title: e.target.value,
              })
            );
          }}
        />
      </Stack>

      <>
        <Box
          sx={
            hideExtraComp
              ? {
                  "& p": { fontSize: { xs: 15, md: 18 } },
                  "& > div > div": { px: "22px" },
                }
              : {}
          }
        >
          <EditorContent
            editor={editor}
            onClick={() => editor.commands.focus()}
            style={
              hideExtraComp
                ? {
                    position: "absolute",
                    width: "100%",
                    fontFamily: '"Tajawal",sans-serif',
                  }
                : {}
            }
          />
        </Box>
        {!hideExtraComp && (
          <div className="d-flex gap-3 align-items-center overflow-x-hidden">
            <CustomButton
              onlyIcon
              onClick={() => {
                !(state.checker.ai.aiStatus === "loading") && setAskAi(!askAi);
              }}
            >
              <Stack
                direction="horizontal"
                className="justify-center items-center"
                gap={3}
              >
                <div
                  style={{
                    transform: askAi ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <PlusCircleIcon />
                </div>
                {state.checker.ai.aiStatus === "loading" && <Spinner />}
              </Stack>
            </CustomButton>
            <div
              tabIndex={askAi ? 0 : -1}
              aria-hidden={!askAi}
              style={{
                opacity: askAi ? 1 : 0,
                visibility: askAi ? "visible" : "hidden",
                transform: askAi
                  ? "translateX(0%)"
                  : "translateX(100%) scale(0)",
                width: "100%",
                zIndex: askAi ? "auto" : -1,
              }}
            >
              <AskAIModal
                onClose={() => setAskAi(false)}
                show={askAi}
                action={onAskAi}
              />
            </div>
          </div>
        )}
      </>
      {!editor.getText() && (
        <StyledStack
          className={`place-holder position-absolute text-text-gray ${
            !hideExtraComp && "fw-light"
          }`}
          style={
            hideExtraComp
              ? {
                  opacity: 0.5,
                  fontWeight: "500 !important",
                }
              : {
                  opacity: 0.3,
                }
          }
          sx={
            hideExtraComp
              ? {
                  fontSize: { xs: 15, md: 18 },
                  px: "22px",
                  "& p": {
                    fontSize: { xs: "2px !important", md: 18 },
                  },
                  pointerEvents: "none",
                }
              : {}
          }
          onClick={() => editor.commands.focus()}
        >
          {placeholderText}
        </StyledStack>
      )}
    </>
  );
};

export default Editor;
