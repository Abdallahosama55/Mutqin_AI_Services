import { EditorContent } from "@tiptap/react";
import { Spinner, Stack } from "react-bootstrap";
import CustomButton from "@/components/atoms/Button";
import { useEffect, useState } from "react";
import PlusCircleIcon from "@/assets/icons/PlusCircle";
import AskAIModal from "./AskAIModal";
import { useLocation, useParams } from "react-router-dom";
import { styled, Box } from "@mui/material";
import { setTitle } from "@/redux/slices/editor/editorSlice";
import { useDispatch, useSelector } from "react-redux";
import { tryCatch } from "@/Util/Create-article/helpers";
import { useAskAiMutation } from "@/redux/slices/editor/editorEndpoints";
import Showdown from "showdown";

const Editor = ({
  editor,
  placeholderText = "ابدأ بكتابة نص",
  hideExtraComp = false,
  onTitleChange,
}) => {
  const { title, content } = useSelector((state) => state.editor);

  const [getAskAi, { isLoading: askAiLoading }] = useAskAiMutation();
  const params = useParams();
  const location = useLocation();
  const StyledStack = styled(Stack)({});
  const [askAi, setAskAi] = useState(false);
  const dispatch = useDispatch();

  const onAskAi = async (content) => {
    const askAiRes = await tryCatch(getAskAi.bind(null, content));

    const converter = new Showdown.Converter();

    if (askAiRes.response && editor) {
      editor
        .chain()
        .focus("end")
        // .createParagraphNear()
        .insertContent(converter.makeHtml(askAiRes.response), {
          preserveWhitespace: "full",
        })
        .run();
    }
  };

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className={`position-absolute  top-0 end-0 m-4 `}
      >
        <input
          type="text"
          className=" text-secondary fw-bolder outline-0 border-0 p-1 text-dark"
          value={title}
          style={{
            fontSize: "16px",
            width:
              (title ? title.length : "إكتب اسم للمستند".length) + 50 + "ch",
            maxWidth: "40vw",
            transition: "none",
          }}
          placeholder={"إكتب اسم للمستند"}
          onChange={(e) => {
            dispatch(setTitle(e.target.value));
            onTitleChange(e.target.value, content, params.id);
          }}
        />
      </Stack>

      <>
        <Box
          sx={hideExtraComp ? { "& p": { fontSize: { xs: 15, md: 20 } } } : {}}
        >
          <EditorContent
            editor={editor}
            
            onClick={() => editor.commands.focus()}
            style={hideExtraComp ? { position: "absolute", width: "100%" } : {fontSize:"20px"}}
          />
        </Box>
        {!hideExtraComp && (
          <div
            className={`${
              askAi ? "editor_ask-ai" : ""
            } col-md-6  pe-2 ps-2 pb-2 `}
          >
            <CustomButton
              onlyIcon
              onClick={() => {
                !askAiLoading && setAskAi(!askAi);
              }}
            >
              <Stack
                direction="horizontal"
                className="justify-center items-center "
                gap={3}
              >
                <div
                  style={{
                    transform: askAi ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <PlusCircleIcon />
                </div>
                {askAiLoading && <Spinner />}
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

                // height: askAi ? "auto" : 0,
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
          className={`place-holder  position-absolute text-text-gray `}
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
                  "& p": { fontSize: { xs: "2px !important", md: 18 } },
                  pointerEvents: "none",
                }
              : { fontSize:"20px"}
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
