//Icons
import {
  ImageIcon,
  DownloadIcon,
  CopyIcon,
  BoldIcon,
  ItalicIcon,
  PenIcon,
  ArrowIcon,
  UnderlineIcon,
  RightAlignIcon,
  CenterAlignIcon,
  LeftAlignIcon,
  ListIcon,
  OrderedListIcon,
  LeftTabIcon,
  RightTabIcon,
  BulletList,
  BulleOutlinetList,
  SquareList,
  Numberlist,
  LetterList,
  GreekIList,
  GreekList,
  UndoIcon,
  RedoIcon,
  UppercaseLetterList,
  UpperCaseGreekList,
} from "../../atoms/allIcons.js";
import linkurl from "@/assets/Images/reformulate/material-symbols_link.png";
import uploadicon from "@/assets/Images/reformulate/icons8_upload-2.png";
import linkImage from "@/assets/Images/reformulate/ph_link-bold.png";
import listNPragrphe from "@/assets/icons/Paragraph/Vector.png";
import listPragrphe from "@/assets/icons/Paragraph/Vector1.png";

//Modules
import { Stack } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useBreakpoint } from "use-breakpoint";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";

//Files
import DropdownColor from "@/components/atoms/DropdownColor";
import MultiOptionDropDown from "@/components/molecules/MultiOptionDropDown";
import LinkModal from "@/components/molecules/LinkModal";
import CustomButton from "@/components/atoms/Button";
import { themeColors } from "@/Util/theme";
import { BREAKPOINTS } from "@/helpers/constants";

import ListDropDown from "@/components/molecules/ListDropDown";
//Css
import "./Res.css";

//Download Image
import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import html from "@/assets/Images/reformulate/html-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";

//Export Types
import {
  downloadAsDocx,
  downloadPdf,
  handleDownload,
  handleDownloadHTML,
  insertImg,
  insertImgURl,
} from "../../atoms/downloadContent/download";

import { PiArrowsInLineVerticalBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import geSSTwoRegular from '../../../assets/fonts/GESSTwoMedium-Medium.ttf'; // Adjust the path to your font file

const handleConvertAndDownload = (text) => {
  const doc = new jsPDF();

  doc.addFont(geSSTwoRegular, 'ge_ss_two', 'normal'); // Register the font
  doc.setFontSize(14); // Set the font size to 14
  doc.setFont('ge_ss_two', 'normal'); // Set the font

  const lineHeight = 6; // Set the line height for the text

  let y = 20; // Initial y-coordinate
  let lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20); // Split text into lines

  // Set text direction to RTL
  doc.setLanguage('ar');
  doc.setDocumentProperties({
    language: 'ar',
  });

  lines.forEach((line) => {
    if (y + lineHeight > doc.internal.pageSize.height - 20) {
      doc.addPage(); // Add a new page if the text exceeds the page height
      y = 20; // Reset y-coordinate for the new page
    }
    doc.text(line, doc.internal.pageSize.width - 10, y, { align: 'right' }); // Add the line of text
    y += lineHeight; // Increment y-coordinate for the next line
  });

  const pdfBlob = doc.output('blob');

  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'converted.pdf';
  a.click();
  URL.revokeObjectURL(url);
};

//Container
const ReformulateToolbar = ({ editor, noGenerate }) => {

  const [exportDropDown, setExportDropDown] = useState(false);
  const refExportDropdown = useRef(null);
  const { breakpoint } = useBreakpoint(
    { mobile: 0, tablet: 782, desktop: 1200, extraDesktop: 1480 },
    "mobile"
  );
  const { id } = useAppSelector((state) => state.api.rephrasePost);
  const [openImage, setOpenImage] = useState(false);
  const [first, setFirst] = useState(true);
  const [sec, setSec] = useState(true);
  const dropdownRef = useRef(null);
  const params = useParams();

  /////////////////////////Responsive////////////////////////
  const isDesktop = breakpoint === "desktop";
  const isMobile = breakpoint === "mobile";
  const [showSlider, setShowSlider] = useState(false);
  const allItems = getToolbarData(
    dropdownRef,
    setFirst,
    setSec,
    first,
    sec,
    openImage,
    setOpenImage,
    editor,
    noGenerate,
    params.id,
    exportDropDown,
    setExportDropDown,
    refExportDropdown
  );
  const items = isDesktop
    ? allItems.slice(0, 13)
    : isMobile
    ? allItems.slice(0, 5)
    : allItems;

  // Close dropdown when clicking outside
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
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenImage(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <Stack
      direction="horizontal"
      className={`gapuser gap-1 w-100 justify-content-between ${
        noGenerate ? " px-2" : " px-2"
      } bg-light    ${breakpoint !== "desktop" ? "w-100 py-1 " : ""}`}
      style={
        breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between" }
          : {
              height: "auto",
              gap: "16px",
              maxWidth: "100%",
              flexWrap: "wrap",
              minWidth: "100%",
              justifyContent: "space-between",
            }
      }
    >
      {items.map((item, index) => (
        <ToolbarItem key={index} {...item} />
      ))}
      {(isMobile || isDesktop) && (
        <div
          onClick={() => setShowSlider((p) => !p)}
          className="position-relative"
        >
          <PiArrowsInLineVerticalBold
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
              color: "#5225ce",
            }}
          />
          {(isMobile || isDesktop) && showSlider && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="position-absolute drop-down-list_editor d-flex flex-column gap-2"
            >
              {allItems.slice(isMobile ? 5 : 13).map((item, index) => (
                <ToolbarItem key={index} {...item} />
              ))}
            </div>
          )}
        </div>
      )}
    </Stack>
  );
};

// Toolbar options
const ToolbarItem = ({
  icon,
  title,
  action,
  isColorDropDown,
  dropDownAction,
  isMultiOptionDropDown,
  options,
  Modal,
  isActiveOption,
  isListDropDown,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpenDropDown(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {Modal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
            // setOpenPop(false);
          }}
          // show={openPop}
          show={openModal}
        />
      )}
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center"
        role="button"
        onClick={() => {
          if (action) {
            action();
          }
          if (isColorDropDown || isMultiOptionDropDown || isListDropDown) {
            setOpenDropDown((prev) => !prev);
          }
          if (Modal) {
            setOpenModal(true);
          }
        }}
        ref={ref}
        style={{ width: "max-content" }}
      >
        <span className="position-relative">
          {icon}
          {openDropDown && isColorDropDown && (
            <DropdownColor dropDownAction={dropDownAction} />
          )}
          {openDropDown && isMultiOptionDropDown && (
            <MultiOptionDropDown
              className=" customTranslateX"
              options={options}
              dropDownAction={dropDownAction}
              isActive={isActiveOption || 0}
            />
          )}
          {openDropDown && isListDropDown && (
            <ListDropDown options={options} dropDownAction={dropDownAction} />
          )}
        </span>
        {!!title && (
          <span className="fw-medium text-primary fs-6">{title}</span>
        )}
      </Stack>
    </>
  );
};

// Toolbar Icons and actions
const getToolbarData = (
  dropdownRef,
  setFirst,
  setSec,
  first,
  sec,
  openImage,
  setOpenImage,
  editor,
  noGenerate,
  id,
  exportDropDown,
  setExportDropDown,
  refExportDropdown
) =>
  //Made it 2 array bcs not to add object case extra space in toolbar ?
  !noGenerate
    ? [

        {
          icon: (
            <div
              ref={refExportDropdown}
              className="p-0 copystyle"
              title="تصدير الملف"
            >
              <CustomButton
                onlyIcon
                className={"position-relative copystyle p-0"}
                onClick={() => {
                  setExportDropDown((prev) => !prev);
                }}
              >
                {exportDropDown && (
                  <div
                    dir="ltr"
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
                      onClick={() => handleConvertAndDownload(editor.getText())}
                      className="DroplistButton"
                    >
                      <div className=" flex-grow-1 text-center">PDF</div>
                      <img src={pdf} className=" droplistImage" />
                    </button>
                    <button
                      onClick={() => downloadPdf(editor, "", "word")}
                      className="DroplistButton"
                    >
                      <div className=" flex-grow-1 text-center">DOXC</div>
                      <img src={doc} className=" droplistImage" />
                    </button>
                  </div>
                )}
                <DownloadIcon width={16} height={16} />
              </CustomButton>
            </div>
          ),
        },

        {
          icon: (
            <CustomButton
              title="نسخ المحتوى"
              className={" copystyle p-0"}
              onlyIcon
              onClick={() => {
                try {
                  if (editor.getText().length === 0)
                    return toast.error("لا يوجد محتوي لنسخه");
                  navigator.clipboard.writeText(editor.getText());
                  toast.success("تم نسخ النص");
                } catch (error) {
                  toast.error("حدث خطا اثناء النسخ");
                }
              }}
            >
              <CopyIcon width={16} height={16} noshow={"test"} />
            </CustomButton>
          ),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={0.5}
              className="align-content-center titlePragraph  text-primary bg-reverse  rounded-1"
            >
              <span className=" px-1">
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
              <span
                style={{ padding: noGenerate ? "1px 2px " : "1px 2px" }}
                className={`position-relative custom-sansFont  `}
              >
                {`${
                  editor.getAttributes("heading").level
                    ? `Heading ${editor.getAttributes("heading").level}`
                    : "paragraph"
                }`}
              </span>
            </Stack>
          ),
          options: [
            { value: "heading 1", className: "fs-1 firstFont" },
            {
              value: "heading 2",
              className: "fs-2 firstFont2",
            },
            {
              value: "heading 3",
              className: "fs-3 firstFont3",
            },
            {
              value: "heading 4",
              className: "fs-4 firstFont4",
            },
            {
              value: "heading 5",
              className: "fs-5 firstFont5",
            },
            {
              value: "heading 6",
              className: "fs-6 firstFont6",
            },
          ],
          isMultiOptionDropDown: true,
          dropDownAction: (value) => {
            editor.chain().focus().unsetFontSize().run();

            if (value === "paragraph")
              editor.chain().focus().setParagraph().run();
            if (value === "heading 1") {
              editor.chain().focus().setHeading({ level: 1 }).run();
            }
            if (value === "heading 2") {
              editor.chain().focus().setHeading({ level: 2 }).run();
            }
            if (value === "heading 3") {
              editor.chain().focus().setHeading({ level: 3 }).run();
            }
            if (value === "heading 4") {
              editor.chain().focus().setHeading({ level: 4 }).run();
            }
            if (value === "heading 5") {
              editor.chain().focus().setHeading({ level: 5 }).run();
            }
            if (value === "heading 6") {
              editor.chain().focus().setHeading({ level: 6 }).run();
            }
          },
          isActiveOption: editor.getAttributes("heading").level,
        },
        {
          icon: <BoldIcon width={16} height={16} title="خط سميك" />,
          action: () => editor.chain().focus().toggleBold().run(),
        },
        {
          icon: <ItalicIcon width={16} height={16} title="خط مائل" />,
          action: () => editor.chain().focus().toggleItalic().run(),
        },

        {
          icon: (
            <Stack direction="horizontal" gap={1} className=" ">
              <span>
                <PenIcon width={16} height={16} />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setHighlight({ color }).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="align-content-center"
            >
              <span>
                <UnderlineIcon width={16} height={16} />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setColor(color).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="items-center  ps-1 justify-center"
            >
              <input
                type="text"
                pattern="[0-9]{5}"
                maxLength={2}
                placeholder={
                  editor.getAttributes("textStyle")?.fontSize?.split("px")[0] ||
                  20
                }
                // defaultValue={() => {
                //   return (
                // editor
                //   .getAttributes("textStyle")
                //   ?.fontSize?.split("px")[0] || 16
                //   );
                // }}
                style={{
                  width: "16px",
                  height: "16px",
                  fontSize: "9px",
                }}
                className="text-center placeholder-custom inputToolbar-Custom custom-sansFont border border-primary rounded-1 text-primary fw-medium"
                onBlur={(e) => {
                  editor
                    .chain()
                    .focus()
                    .setFontSize(`${e.target.value}px`)
                    .run();
                }}
              />
              <span className="  arrow1Input-custom position-absolute">
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isMultiOptionDropDown: true,
          options: [
            {
              value: "8",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "10",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "12",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "14",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "16",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "18",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "20",
              className: "px-2 py-0 custom-sansFont",
            },
          ],
          dropDownAction: (value) =>
            editor.chain().focus().setFontSize(`${value}px`).run(),
          isActiveOption: editor
            .getAttributes("textStyle")
            ?.fontSize?.split("px")[0],
        },

        {
          icon: (
            <RightAlignIcon width={16} height={16} title="محاذاة إلى اليمين" />
          ),
          action: () => editor.chain().focus().setTextAlign("right").run(),
        },
        {
          icon: (
            <CenterAlignIcon
              width={16}
              height={16}
              title="محاذاة إلى المنتصف"
            />
          ),
          action: () => editor.chain().focus().setTextAlign("center").run(),
        },
        {
          icon: (
            <LeftAlignIcon width={16} height={16} title="محاذاة إلى اليسار" />
          ),
          action: () => editor.chain().focus().setTextAlign("left").run(),
        },
        {
          icon: (
            // <div className=" d-flex align-items-center gap-1">
            <span>
              <img
                className="listIcons1-custom"
                src={listPragrphe}
                // width={18}
                // height={15}
                title="قائمة غير مرتبة"
                alt="قائمة غير مرتبة"
              />
            </span>
            // <span>
            //   <ArrowIcon
            //     rotate={90}
            //     width={5}
            //     height={5}
            //     color={themeColors.colors.primary}
            //   />
            // </span>
            // </div>
          ),
          action: () => editor.chain().focus().toggleBulletList().run(),
          // isListDropDown: true,
          // options: [
          //   {
          //     value: (
          //       <button
          //         onClick={() =>
          //           editor.chain().focus().toggleBulletList().run()
          //         }
          //         className={
          //           editor.isActive("bulletList") ? "is-active " : " bg-white"
          //         }
          //       >
          //         <BulletList />
          //       </button>
          //     ),
          //   },
          //   {
          //     value: (
          //       <button
          //         onClick={() =>
          //           editor.chain().focus().sinkListItem("listItem").run()
          //         }
          //         disabled={!editor.can().sinkListItem("listItem")}
          //       >
          //         <BulleOutlinetList />
          //       </button>
          //     ),
          //   },
          //   {
          //     value: <SquareList />,
          //   },
          // ],
          // dropDownAction: () => {
          //   editor.chain().focus().toggleBulletList().run();
          // },
        },
        {
          icon: (
            // <div className=" d-flex align-items-center gap-1">
            <span>
              <img
                className="listIcons1-custom"
                src={listNPragrphe}
                // width={18}
                // height={15}
                title="قائمة مرتبة"
                alt="قائمة مرتبة"
              />
            </span>
            //   <span>
            //     <ArrowIcon
            //       rotate={90}
            //       width={5}
            //       height={5}
            //       color={themeColors.colors.primary}
            //     />
            //   </span>
            // </div>
          ),
          // isListDropDown: true,
          // options: [
          //   {
          //     value: (
          //       <button
          //         onClick={() =>
          //           editor.chain().focus().toggleOrderedList().run()
          //         }
          //         className={
          //           editor.isActive("orderedList")
          //             ? "is-active "
          //             : " bg-white  "
          //         }
          //       >
          //         <Numberlist width={70} height={70} />
          //       </button>
          //     ),
          //   },
          //   {
          //     value: <LetterList width={70} height={70} />,
          //   },
          //   {
          //     value: <GreekList width={70} height={70} />,
          //   },
          //   {
          //     value: <GreekIList width={70} height={70} />,
          //   },
          //   {
          //     value: <UppercaseLetterList width={70} height={70} />,
          //   },
          //   {
          //     value: <UpperCaseGreekList width={70} height={70} />,
          //   },
          // ],
          // dropDownAction: () =>
          //   editor.chain().focus().toggleOrderedList().run(),
          action: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
          icon: (
            <LeftTabIcon width={16} height={16} title="إدخال مسافة بادئة" />
          ),
          action: () =>
            // editor
            //   .chain()
            //   .focus("end")
            //   .createParagraphNear()
            //   .insertContent("\t")
            //   .run(),
            editor.chain().focus().indent().run(),
        },
        {
          icon: (
            <RightTabIcon width={16} height={16} title="حذف المسافة بادئة" />
          ),
          action: () =>
            // editor
            //   .chain()
            //   .focus("start")
            //   .createParagraphNear()
            //   .insertContent("\t")
            //   .run(),
            editor.chain().focus().outdent().run(),
        },
        {
          icon: <UndoIcon width={16} height={16} title="خطوة للخلف" />,
          action: () => editor.chain().focus().undo().run(),
        },
        {
          icon: <RedoIcon width={16} height={16} title="خطوة للأمام" />,
          action: () => editor.chain().focus().redo().run(),
        },
        {
          icon: (
            <div ref={dropdownRef} title="إدراج صورة">
              <div onClick={() => setOpenImage((imge) => !imge)}>
                <ImageIcon width={16} height={16} noshow={"test"} />
                {openImage && (
                  <div className=" d-flex gap-3 px-2 py-1 position-absolute links-Containerss bg-white">
                    <div>
                      <img
                        onClick={() => insertImg(editor, id)}
                        onMouseEnter={() => {
                          setSec(true);
                          setFirst(false);
                        }}
                        onMouseLeave={() => {
                          // setSec(false);
                          // setFirst(true);
                        }}
                        className=" imageCurser"
                        src={uploadicon}
                        style={{ maxHeight: "16px", maxWidth: "16px" }}
                      />
                    </div>
               
                    {first && (
                      <>
                  
                      </>
                    )}
                    {sec && (
                      <button className="  position-absolute imageCustom ">
                        <div></div>
                        اسحب صورة هنا <br />
                        أو
                        <br /> اضغط
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ),
        },
      ]
    : [
        {
          icon: (
            <div
              ref={refExportDropdown}
              className="p-0 copystyle"
              title="تصدير الملف"
            >
              <CustomButton
                onlyIcon
                className={"position-relative copystyle p-0"}
                onClick={() => {
                  setExportDropDown((prev) => !prev);
                }}
              >
                {exportDropDown && (
                  <div
                    dir="ltr"
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
                      onClick={() => downloadPdf(editor, "", "pdf")}
                      className="DroplistButton"
                    >
                      <div className=" flex-grow-1 text-center">PDF</div>
                      <img src={pdf} className=" droplistImage" />
                    </button>
                    <button
                      onClick={() => downloadPdf(editor, "", "word")}
                      className="DroplistButton"
                    >
                      <div className=" flex-grow-1 text-center">DOXC</div>
                      <img src={doc} className=" droplistImage" />
                    </button>
                  </div>
                )}

                <DownloadIcon width={16} height={16} />
              </CustomButton>
            </div>
          ),
        },

        {
          icon: (
            <CustomButton
              title="نسخ المحتوى"
              className={" copystyle p-0"}
              onlyIcon
              onClick={() => {
                try {
                  if (editor.getText().length === 0)
                    return toast.error("لا يوجد محتوي لنسخه");
                  navigator.clipboard.writeText(editor.getText());
                  toast.success("تم نسخ النص");
                } catch (error) {
                  toast.error("حدث خطا اثناء النسخ");
                }
              }}
            >
              <CopyIcon width={16} height={16} noshow={"test"} />
            </CustomButton>
          ),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={0.5}
              className="align-content-center titlePragraph custom-sansFont  text-primary bg-reverse  rounded-1"
            >
              <span className=" px-1">
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
              <span
                style={{ padding: noGenerate ? "1px 2px " : "1px 2px" }}
                className={`position-relative custom-sansFont  `}
              >
                {`${
                  editor.getAttributes("heading").level
                    ? `Heading ${editor.getAttributes("heading").level}`
                    : "paragraph"
                }`}
              </span>
            </Stack>
          ),
          options: [
            { value: "heading 1", className: "fs-1 firstFont" },
            {
              value: "heading 2",
              className: "fs-2 firstFont2",
            },
            {
              value: "heading 3",
              className: "fs-3 firstFont3",
            },
            {
              value: "heading 4",
              className: "fs-4 firstFont4",
            },
            {
              value: "heading 5",
              className: "fs-5 firstFont5",
            },
            {
              value: "heading 6",
              className: "fs-6 firstFont6",
            },
          ],
          isMultiOptionDropDown: true,
          dropDownAction: (value) => {
            editor.chain().focus().unsetFontSize().run();

            if (value === "paragraph")
              editor.chain().focus().setParagraph().run();
            if (value === "heading 1") {
              editor.chain().focus().setHeading({ level: 1 }).run();
            }
            if (value === "heading 2") {
              editor.chain().focus().setHeading({ level: 2 }).run();
            }
            if (value === "heading 3") {
              editor.chain().focus().setHeading({ level: 3 }).run();
            }
            if (value === "heading 4") {
              editor.chain().focus().setHeading({ level: 4 }).run();
            }
            if (value === "heading 5") {
              editor.chain().focus().setHeading({ level: 5 }).run();
            }
            if (value === "heading 6") {
              editor.chain().focus().setHeading({ level: 6 }).run();
            }
          },
          isActiveOption: editor.getAttributes("heading").level,
        },
        {
          icon: <BoldIcon width={16} height={16} title="خط سميك" />,
          action: () => editor.chain().focus().toggleBold().run(),
        },
        {
          icon: <ItalicIcon width={16} height={16} title="خط مائل" />,
          action: () => editor.chain().focus().toggleItalic().run(),
        },
        {
          icon: (
            <Stack direction="horizontal" gap={1} className=" ">
              <span>
                <PenIcon width={16} height={16} />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setHighlight({ color }).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="align-content-center"
            >
              <span>
                <UnderlineIcon width={16} height={16} />
              </span>
              <span>
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isColorDropDown: true,
          dropDownAction: (color) =>
            editor.chain().focus().setColor(color).run(),
        },
        {
          icon: (
            <Stack
              direction="horizontal"
              gap={1}
              className="items-center  ps-1 justify-center"
            >
              <input
                type="text"
                pattern="[0-9]{5}"
                maxLength={2}
                placeholder={
                  editor.getAttributes("textStyle")?.fontSize?.split("px")[0] ||
                  20
                }
                // defaultValue={() => {
                //   return (
                // editor
                //   .getAttributes("textStyle")
                //   ?.fontSize?.split("px")[0] || 16
                //   );
                // }}
                style={{
                  width: "16px",
                  height: "16px",
                  fontSize: "9px",
                }}
                className="text-center placeholder-custom inputToolbar-Custom custom-sansFont border border-primary rounded-1 text-primary fw-medium"
                onBlur={(e) => {
                  editor
                    .chain()
                    .focus()
                    .setFontSize(`${e.target.value}px`)
                    .run();
                }}
              />
              <span className="  arrow1Input-custom position-absolute">
                <ArrowIcon
                  rotate={90}
                  width={5}
                  height={5}
                  color={themeColors.colors.primary}
                />
              </span>
            </Stack>
          ),
          isMultiOptionDropDown: true,
          options: [
            {
              value: "8",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "10",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "12",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "14",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "16",
              className: "px-2 py-0 custom-sansFont",
            },
            {
              value: "18",
              className: "px-2 py-0 custom-sansFont",
            },       {
              value: "20",
              className: "px-2 py-0 custom-sansFont",
            },
          ],
          dropDownAction: (value) =>
            editor.chain().focus().setFontSize(`${value}px`).run(),
          isActiveOption: editor
            .getAttributes("textStyle")
            ?.fontSize?.split("px")[0],
        },

        {
          icon: (
            <RightAlignIcon width={16} height={16} title="محاذاة إلى اليمين" />
          ),
          action: () => editor.chain().focus().setTextAlign("right").run(),
        },
        {
          icon: (
            <CenterAlignIcon
              width={16}
              height={16}
              title="محاذاة إلى المنتصف"
            />
          ),
          action: () => editor.chain().focus().setTextAlign("center").run(),
        },
        {
          icon: (
            <LeftAlignIcon width={16} height={16} title="محاذاة إلى اليسار" />
          ),
          action: () => editor.chain().focus().setTextAlign("left").run(),
        },
        {
          icon: (
            // <div className=" d-flex gap-1 align-items-center">
            <span>
              {/* <ListIcon
                  width={16}
                  height={16}
                /> */}

              <img
                src={listPragrphe}
                className="listIcons1-custom"
                title="قائمة غير مرتبة"
                alt="قائمة غير مرتبة"
              />
            </span>
            //   <span>
            //     <ArrowIcon
            //       rotate={90}
            //       width={5}
            //       height={5}
            //       color={themeColors.colors.primary}
            //     />
            //   </span>
            // </div>
          ),
          // isListDropDown: true,
          // options: [
          //   {
          //     value: (
          //       <button
          //         onClick={() =>
          //           editor.chain().focus().toggleBulletList().run()
          //         }
          //         className={
          //           editor.isActive("bulletList") ? "is-active " : " bg-white"
          //         }
          //       >
          //         <BulletList />
          //       </button>
          //     ),
          //   },
          //   {
          //     value: <BulleOutlinetList />,
          //   },
          //   {
          //     value: <SquareList />,
          //   },
          // ],
          // dropDownAction: () => {
          //   editor.chain().focus().toggleBulletList().run();
          // },
          action: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
          icon: (
            // <div className=" d-flex gap-1 align-items-center">
            <span>
              <img
                src={listNPragrphe}
                className="listIcons1-custom"
                title="قائمة مرتبة"
                alt="قائمة مرتبة"
              />
            </span>
            //   <span>
            //     <ArrowIcon
            //       rotate={90}
            //       width={5}
            //       height={5}
            //       color={themeColors.colors.primary}
            //     />
            //   </span>
            // </div>
          ),
          // isListDropDown: true,
          // options: [
          //   {
          //     value: (
          //       <button
          //         onClick={() =>
          //           editor.chain().focus().toggleOrderedList().run()
          //         }
          //         className={
          //           editor.isActive("orderedList")
          //             ? "is-active "
          //             : " bg-white  "
          //         }
          //       >
          //         <Numberlist width={70} height={70} />
          //       </button>
          //     ),
          //   },
          //   {
          //     value: <LetterList width={70} height={70} />,
          //   },
          //   {
          //     value: <GreekList width={70} height={70} />,
          //   },
          //   {
          //     value: <GreekIList width={70} height={70} />,
          //   },
          //   {
          //     value: <UppercaseLetterList width={70} height={70} />,
          //   },
          //   {
          //     value: <UpperCaseGreekList width={70} height={70} />,
          //   },
          // ],
          // dropDownAction: () =>
          //   editor.chain().focus().toggleOrderedList().run(),
          action: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
          icon: (
            <LeftTabIcon width={16} height={16} title="إدخال مسافة بادئة" />
          ),
          action: () =>
            //   editor
            //     .chain()
            //     .focus("end")
            //     .createParagraphNear()
            //     .insertContent("\t")
            //     .run(),
            editor.chain().focus().indent().run(),
        },
        {
          icon: (
            <RightTabIcon width={16} height={16} title="حذف المسافة بادئة" />
          ),
          action: () =>
            // editor
            //   .chain()
            //   .focus("start")
            //   .createParagraphNear()
            //   .insertContent("\t")
            //   .run(),
            editor.chain().focus().outdent().run(),
        },
        {
          icon: <UndoIcon width={16} height={16} title="خطوة للخلف" />,
          action: () => editor.chain().focus().undo().run(),
        },
        {
          icon: <RedoIcon width={16} height={16} title="خطوة للأمام" />,
          action: () => editor.chain().focus().redo().run(),
        },
        {
          icon: (
            <div ref={dropdownRef} title="إدراج صورة">
              <div onClick={() => setOpenImage((imge) => !imge)}>
                <ImageIcon width={16} height={16} noshow={"test"} />
                {openImage && (
                  <div className=" d-flex gap-3 px-2 py-1 position-absolute links-Containerss bg-white">
                    <div>
                      <img
                        onClick={() => insertImg(editor, id)}
                        onMouseEnter={() => {
                          setSec(true);
                          setFirst(false);
                        }}
                        onMouseLeave={() => {
                          // setSec(false);
                          // setFirst(true);
                        }}
                        className="imageCurser"
                        src={uploadicon}
                        style={{ maxHeight: "16px", maxWidth: "16px" }}
                      />
                    </div>
                    <div className=" position-relative">
                      <img
                        onMouseEnter={() => {
                          setFirst(true);
                          setSec(false);
                        }}
                        onMouseLeave={() => {
                          // setFirst(false);
                          // setSec(true);
                        }}
                        src={linkurl}
                        className="imageCurser"
                        style={{ maxHeight: "16px", maxWidth: "16px" }}
                      />
                    </div>
                    {first && (
                      <>
                        <button
                          style={{ borderRadius: "8px" }}
                          className="  px-2 py-1 position-absolute imageCustom "
                        >
                          إضافة رابط
                        </button>
                        <div
                          style={{ top: "65px", fontSize: "12px" }}
                          className="position-absolute adrag "
                        >
                          إدراج
                        </div>
                      </>
                    )}
                    {sec && (
                      <button className="  position-absolute imageCustom ">
                        <div></div>
                        اسحب صورة هنا <br />
                        أو
                        <br /> اضغط
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ),
        },
      ];

export default ReformulateToolbar;
