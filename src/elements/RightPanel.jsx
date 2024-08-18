import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkMistakes } from "@/redux/features/api/apiSlice";

import { Stack, Col, Card } from "react-bootstrap";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import CustomButton from "@/components/atoms/Button";
import CopyIcon from "@/assets/icons/Copy";
import MultiOptionDropDown from "@/components/molecules/MultiOptionDropDown";
import ArrowIcon from "@/assets/icons/Arrow";
import { themeColors } from "@/Util/theme";
import CheckerEditor from "../components/molecules/CheckerEditor";
import { setMistakes } from "../redux/features/api/apiSlice";
import { applyHighlight } from "../helpers/applyHighlight";
import Toolbar from "./../components/molecules/Toolbar";

const RightPanel = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const checker = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredMistake, setHoveredMistake] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { content, mistakes } = useSelector((state) => state.checker);

  console.log("mistakes", mistakes);

  const handleCheckMistakes = async () => {
    if (!editor) return;
    setLoading(true);
    try {
      const response = await dispatch(
        checkMistakes({ content: editor.getText() })
      ).unwrap();
      dispatch(setMistakes(response));
      applyHighlight(editor, response);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while checking mistakes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    applyHighlight(editor, mistakes);
  }, [mistakes, editor]);

  return (
    <>
      <Stack className={`${isBelowDesktop ? "px-0" : "px-3 h-100"}`} gap={4}>
        <Stack className="justify-content-center" direction="horizontal">
          <Toolbar editor={editor} />
        </Stack>
        <Stack
          className="flex-fill editor border rounded-3 fs-5 position-relative p-3 pl-4 position-relative"
          style={{ minHeight: isBelowDesktop ? "75vh" : "" }}
          onClick={() => editor && editor.commands.focus()}
        >
          {editor && (
            <CheckerEditor
              editor={editor}
              referenceElement={referenceElement}
              errorMistakes={mistakes}
              hoveredMistake={hoveredMistake}
              popperElement={popperElement}
              setPopperElement={setPopperElement}
              setReferenceElement={setReferenceElement}
              loading={loading}
              handleCheckMistakes={handleCheckMistakes}
              checker={checker}
              copyContent={(content) => editor.commands.setContent(content)}
            />
          )}
        </Stack>
      </Stack>
      {isBelowDesktop && (
        <Col className="my-3">
          <Card className="bg-light">
            <Stack
              direction="horizontal"
              gap={1}
              style={{ flexWrap: "wrap", justifyContent: "space-around" }}
            >
              <CustomButton
                onlyIcon
                onClick={() =>
                  editor && navigator.clipboard.writeText(editor.getText())
                }
              >
                <CopyIcon />
              </CustomButton>
              <div className="position-relative">
                <CustomButton
                  iconSuffix={
                    <ArrowIcon color={themeColors.colors.primary} rotate={90} />
                  }
                  outline
                  onClick={() => setDropDown(!dropDown)}
                >
                  {editor &&
                    editor.getText().trim().split(/\s+/).length - 1 + " كلمات"}
                </CustomButton>
                {dropDown && (
                  <MultiOptionDropDown
                    top
                    options={[
                      {
                        value:
                          editor.getText().trim().split(/\s+/).length -
                          1 +
                          " كلمات",
                        className: "px-4 border-bottom mt-2",
                      },
                      {
                        value:
                          editor.getText().replace(/\s+/g, "").length + " حرف",
                        className: "px-4 border-bottom mt-2",
                      },
                      {
                        value:
                          editor.getText().split(/[.,]\s*/).length -
                          1 +
                          " جملة",
                        className: "px-4 border-bottom mt-2",
                      },
                    ]}
                    onClose={() => setDropDown(false)}
                  />
                )}
              </div>
              <CustomButton onClick={handleCheckMistakes}>
                تدقيق الأن
              </CustomButton>
              <CustomButton onlyIcon>
                <Stack
                  direction="horizontal"
                  className="rounded-circle border border-primary align-items-center justify-content-center position-relative"
                  style={{ width: "35px", height: "35px" }}
                >
                  <span className="position-absolute top-50 start-50 translate-middle">
                    {mistakes?.length || 0}
                  </span>
                </Stack>
              </CustomButton>
            </Stack>
          </Card>
        </Col>
      )}
    </>
  );
};

export default RightPanel;
