import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoArrowLeft } from "react-icons/go";
import { correctMistake, correctMistakes } from "@/redux/features/api/apiSlice";
import CheckMarkIcon from "@/assets/icons/CheckMark";
import ArrowIcon from "@/assets/icons/Arrow";
import { Button, Stack } from "react-bootstrap";
import { themeColors } from "./../../Util/theme";
import { applyHighlight } from "@/helpers/applyHighlight";
import { setMistakes } from "../../redux/features/api/apiSlice";
import errorsColor from "../../helpers/errorsColor";

const CustomAccordion = ({ editor }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { mistakes } = useSelector((state) => state.checker);

  useEffect(() => {
    const handleEditorChange = () => {
      const content = editor.getText().trim();
      if (!content) {
        dispatch(setMistakes([]));
      }
    };

    editor?.on("text-change", handleEditorChange);

    return () => {
      editor?.off("text-change", handleEditorChange);
    };
  }, [editor, dispatch]);

  const buildAccordionData = (mistakes) => {
    if (!Array.isArray(mistakes)) {
      return [];
    }

    const categories = mistakes.reduce((acc, mistake) => {
      const { errorTypeId } = mistake;
      if (!acc[errorTypeId]) {
        const errorColor =
          errorsColor.colors.find((ec) => ec.id === errorTypeId)?.color ||
          "#000000";
        acc[errorTypeId] = {
          title: mistake.errorType,
          color: errorColor,
          value: errorTypeId,
        };
      }
      return acc;
    }, {});

    return Object.values(categories);
  };

  const accordionData = buildAccordionData(mistakes) || [];

  const categorizedErrors = Array.isArray(mistakes)
    ? mistakes.reduce((acc, mistake) => {
        const { errorTypeId } = mistake;
        if (!acc[errorTypeId]) {
          acc[errorTypeId] = [];
        }
        acc[errorTypeId].push(mistake);
        return acc;
      }, {})
    : {};

  const errorCounts = Array.isArray(mistakes)
    ? mistakes.reduce((acc, mistake) => {
        const { errorTypeId } = mistake;
        if (!acc[errorTypeId]) {
          acc[errorTypeId] = 0;
        }
        acc[errorTypeId] += 1;
        return acc;
      }, {})
    : {};

  const handleCorrectionAll = async () => {
    try {
      setLoading(true);
      const content = editor.getText();
      const selectedErrors =
        categorizedErrors[accordionData[selectedIndex].value];

      const response = await dispatch(
        correctMistakes({
          mistakes_to_correct: selectedErrors,
          content,
        })
      ).unwrap();

      editor.commands.setContent(response.corrected_text);
      dispatch(setMistakes(response.mistakes));
      applyHighlight(editor, response.mistakes);
    } catch (error) {
      console.error("Error correcting all mistakes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCorrection = async (mistake, replacement) => {
    try {
      setLoading(true);
      const content = editor.getText();
      const response = await dispatch(
        correctMistake({ mistake, content, replacement })
      ).unwrap();
      editor.commands.setContent(response.corrected_text);
      dispatch(setMistakes(response.mistakes));
      applyHighlight(editor, response.mistakes);
    } catch (error) {
      console.error("Error correcting the mistake:", error);
    } finally {
      setLoading(false);
    }
  };

  const editorContent = editor?.getText()?.trim();

  return (
    <div>
      {(!editorContent || mistakes?.length === 0) && (
        <div className="message-box">
          <p>
            سوف نقوم بعرض الأخطاء هنا بعد عملية التحقق من النص الخاص بك ويمكنك
            تصحيحها بسهولة
          </p>
        </div>
      )}

      {editorContent &&
        accordionData.map(({ title, color, value }, index) => {
          const categoryErrors = categorizedErrors[value] || [];

          return (
            <AccordionItem
              key={index}
              title={title}
              color={color}
              isSelected={selectedIndex === index}
              setSelectedIndex={setSelectedIndex}
              index={index}
              errors={categoryErrors}
              errorCount={errorCounts[value] || 0}
              handleCorrectionAll={handleCorrectionAll}
              editor={editor}
              loading={loading}
              handleCorrection={handleCorrection}
            />
          );
        })}
    </div>
  );
};

const AccordionItem = ({
  title,
  color,
  isSelected,
  setSelectedIndex,
  index,
  errors,
  errorCount,
  handleCorrectionAll,
  editor,
  loading,
  handleCorrection,
}) => {
  const dispatch = useDispatch();

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <>
      <div className="accordion-item py-3">
        <Stack
          direction="horizontal"
          className="justify-content-between z-3"
          role="button"
          onClick={() => {
            setSelectedIndex((prev) => (prev === index ? null : index));
          }}
        >
          <Stack direction="horizontal" gap={3}>
            <span>
              <CheckMarkIcon width={19} height={19} color={color} />
            </span>
            <span style={{ fontSize: "12px", fontWeight: "300" }}>{title}</span>
          </Stack>
          <ArrowIcon
            width={10}
            height={10}
            rotate={isSelected ? 270 : 90}
            color={themeColors.colors.primary}
          />
        </Stack>
      </div>
      {isSelected && (
        <div
          style={{
            background: "white",
            border: "1px solid #5225CE33",
            borderRadius: "12px",
          }}
          className="p-2 px-3 accordion-content"
        >
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-between"
          >
            <span
              style={{
                borderRadius: "8px",
                padding: "4px 10px",
                fontSize: "10px",
              }}
              className="btn btn-primary label errorButton"
              onClick={handleCorrectionAll}
            >
              صحح الأخطاء
            </span>
            {loading && (
              <span
                style={{
                  borderRadius: "8px",
                  padding: "4px 8px",
                  fontSize: "8px",
                }}
                className="btn btn-primary label errorButton"
              >
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                  style={{ width: "10px", height: "10px" }}
                ></span>
                <span role="status">جاري ...</span>
              </span>
            )}
            <span className="label">
              <span style={{ fontFamily: "sans-serif", fontWeight: "600" }}>
                {errors.length}
              </span>{" "}
              خطأ
            </span>
          </Stack>
          {errors?.length > 0 && (
            <div
              style={{ maxHeight: "100px", overflowY: "auto" }}
              className="bg-light rounded py-2 mt-2"
            >
              {errors.map((error, index) => {
                const incorrectWord = error.context.text.slice(
                  error.context.offset,
                  error.context.offset + error.context.length
                );
                return (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "7px",
                        }}
                        className="btn btn-outline-danger errorButton label m-1"
                      >
                        {incorrectWord}
                      </span>
                      <GoArrowLeft />
                      <div className="d-flex flex-wrap ml-2">
                        {error.replacements.map((replacement, repIndex) => (
                          <Button
                            key={repIndex}
                            style={{
                              borderRadius: "8px",
                              padding: "4px 18px",
                              fontSize: "10px",
                              margin: "2px",
                            }}
                            className="btn btn-primary label errorButton m-1"
                            onClick={() =>
                              handleCorrection(error, replacement.value)
                            }
                          >
                            {replacement.value}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default CustomAccordion;
