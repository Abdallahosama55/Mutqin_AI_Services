// Icons
import {
  TashkilIcon,
  RemoveTashkilIcon,
  MagicStickIcon,
  LinkIcon,
  BoldIcon,
  ItalicIcon,
  PenIcon,
  ArrowIcon,
  UnderlineIcon,
  AIImage,
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
} from "../atoms/allIcons.js";
import listPragrphe from "@/assets/icons/Paragraph/Vector.png";
import listNPragrphe from "@/assets/icons/Paragraph/Vector1.png";
import { FaListUl } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import DownloadIcon from "@/assets/icons/Download";

import {
  downloadAsDocx,
  downloadPdf,
  handleDownload,
  handleDownloadHTML,
} from "../atoms/downloadContent/download";

import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";

//Modules
import { themeColors } from "@/Util/theme";
import { Stack } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useBreakpoint } from "use-breakpoint";

//Files
import { BREAKPOINTS } from "@/helpers/constants";
import LinkModal from "./LinkModal";
import { tashkeel } from "@/helpers/tashkeel";
import { removeTashkeel } from "@/helpers/removeTashkeel";
import { useAppDispatch } from "@/redux/hooks";
import { rephraseText } from "@/redux/features/api/apiSlice";
import ListDropDown from "./ListDropDown";
import DropdownColor from "../atoms/DropdownColor";
import AIModal from "./AIModal";
import MultiOptionDropDown from "./MultiOptionDropDown";
import "../atoms/atoms.css";
import { PiArrowsInLineVerticalBold } from "react-icons/pi";
import toast from "react-hot-toast";
import jsPDF from 'jspdf';
import geSSTwoRegular from '../../assets/fonts/GESSTwoMedium-Medium.ttf'; // Adjust the path to your font file

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
const Toolbar = ({ editor }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const dispatch = useAppDispatch();

  const [showSlider, setShowSlider] = useState(false);
  const items =
    breakpoint === "mobile"
      ? getToolbarData(editor, dispatch, breakpoint === "mobile").slice(0, 3)
      : getToolbarData(editor, dispatch, breakpoint === "mobile");

  return (
    <Stack
      direction="horizontal"
      className={` border rounded-2 py-1 px-2 bg-light  ${
        breakpoint !== "desktop" ? "w-100 mt-4 py-1 px-2" : ""
      }`}
      style={
        breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between", gap: "10px" }
          : { flexWrap: "wrap", gap: "20px" }
      }
    >
      {items.map((item, index) => (
        <ToolbarItem key={index} {...item} />
      ))}

      {breakpoint === "mobile" && (
        <div
          onClick={() => setShowSlider((p) => !p)}
          className="position-relative"
        >
          <PiArrowsInLineVerticalBold
            style={{
              width: "22px",
              height: "22px",
              cursor: "pointer",
              color: "#5225ce",
            }}
          />
          {breakpoint === "mobile" && showSlider && (
            <div
              className="position-absolute drop-down-list_editor d-flex flex-column gap-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {getToolbarData(editor, dispatch, breakpoint === "mobile")
                .slice(3)
                .map((item, index) => (
                  <ToolbarItem key={index} {...item} />
                ))}
            </div>
          )}
        </div>
      )}
    </Stack>
  );
};

//Tollbar Set items and its actions
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
          }}
          show={openModal}
        />
      )}
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center"
        role="button"
        //Every object has options
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
              options={options}
              dropDownAction={dropDownAction}
              isActive={isActiveOption || 0}
              onClose={() => setOpenDropDown(false)}
            />
          )}
          {openDropDown && isListDropDown && (
            <ListDropDown options={options} dropDownAction={dropDownAction} />
          )}
        </span>
        {/* Title of droplist */}
        {!!title && <span className="fw-medium text-primary ">{title}</span>}
      </Stack>
    </>
  );
};

//Toolbar Icons
const getToolbarData = (editor, dispatch, isMobile) => [
  {
    icon: <TashkilIcon width={20} height={20} title="التشكيل" />,
    title: "تشكيل",
    action: () => {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to);
      if (!text) return toast.error("برجاء بإختيار النص أولا");
      tashkeel(text).then((res) =>
        editor
          .chain()
          .focus()
          .insertContentAt(
            {
              from: from - 1,
              to,
            },
            res
          )
          .run()
      );
    },
  },
  {
    icon: <RemoveTashkilIcon width={20} height={20} title="إزالة التشكيل" />,
    title: "إزالة التشكيل",
    action: async () => {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to);
      if (!text) return toast.error("برجاء بإختيار النص أولا");
      const removeedText = await removeTashkeel(text);
      editor
        .chain()
        .focus()
        .insertContentAt(
          {
            from: from,
            to,
          },
          removeedText
        )
        .run();
    },
  },
  {
    icon: <MagicStickIcon width={20} height={20} title="إعادة الصياغة" />,
    title: "إعادة الصياغة",
    action: () => {
      dispatch(rephraseText());
    },
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        style={{ padding: "2px 8px" }}
        className="align-content-center  text-primary bg-reverse rounded"
      >
        <span>
          <ArrowIcon
            rotate={90}
            width={8}
            height={8}
            color={themeColors.colors.primary}
          />
        </span>
        <span style={{ fontSize: "14px", fontFamily: "sans-serif" }}>
          {`${
            editor?.getAttributes("heading").level
              ? `${isMobile ? "h" : "Heading "}${
                  editor?.getAttributes("heading").level
                }`
              : isMobile
              ? "p"
              : "paragraph"
          }`}
        </span>
      </Stack>
    ),
    options: [
      {
        value: isMobile ? "h1" : "heading 1",
        className: "fontsize1 custom-sansFont",
      },
      {
        value: isMobile ? "h2" : "heading 2",
        className: "fontsize2 custom-sansFont",
      },
      {
        value: isMobile ? "h3" : "heading 3",
        className: "fontsize3 custom-sansFont",
      },
      {
        value: isMobile ? "h4" : "heading 4",
        className: "fontsize4 custom-sansFont",
      },
      {
        value: isMobile ? "h5" : "heading 5",
        className: "fontsize5 custom-sansFont",
      },
      {
        value: isMobile ? "h6" : "heading 6",
        className: "fontsize6 custom-sansFont",
      },
    ],
    isMultiOptionDropDown: true,
    dropDownAction: (value) => {
      editor?.chain().focus().unsetFontSize().run();

      if (value === "paragraph") editor?.chain().focus().setParagraph().run();
      if (value === "heading 1" || value === "h1") {
        editor?.chain().focus().setHeading({ level: 1 }).run();
      }
      if (value === "heading 2" || value === "h2") {
        editor?.chain().focus().setHeading({ level: 2 }).run();
      }
      if (value === "heading 3" || value === "h3") {
        editor?.chain().focus().setHeading({ level: 3 }).run();
      }
      if (value === "heading 4" || value === "h4") {
        editor?.chain().focus().setHeading({ level: 4 }).run();
      }
      if (value === "heading 5" || value === "h5") {
        editor?.chain().focus().setHeading({ level: 5 }).run();
      }
      if (value === "heading 6" || value === "h6") {
        editor?.chain().focus().setHeading({ level: 6 }).run();
      }
    },
    isActiveOption: editor?.getAttributes("heading").level,
  },
  {
    icon: <LinkIcon width={20} height={20} title="إسترداد مقال من الويب" />,
    Modal: LinkModal,
  },
  // {
  //   icon: <img src={AIImage} style={{ width: "20px", height: "20px" }} />,
  //   Modal: AIModal,
  // },
  {
    icon: <DownloadIcon width={20} title={"تصدير الملف"} />,
    isMultiOptionDropDown: true,
    isActiveOption: 5,
    options: [
      {
        value: (
          <button
            onClick={() => {
              if (editor) {
                if (!editor?.getText())
                  return toast.error("لا يوجد محتوى يمكن تحميله");

                handleDownload(editor);
              }
            }}
            className="DroplistButton"
          >
            <div className="flex-grow-1 text-center">TXT</div>
            <img src={txt} className=" droplistImage" />
          </button>
        ),
      },
      {
        value: (
          <button
            onClick={() => {
              if (editor) {
                if (!editor?.getText())
                  return toast.error("لا يوجد محتوى يمكن تحميله");
                // exportFileAs("pdf", editor?.getHTML());
                handleConvertAndDownload(editor.getText());
              }
            }}
            className="DroplistButton"
          >
            <div className=" flex-grow-1 text-center">PDF</div>
            <img src={pdf} className=" droplistImage" />
          </button>
        ),
      },
      {
        value: (
          <button
            onClick={() => {
              if (editor) {
                if (!editor?.getText())
                  return toast.error("لا يوجد محتوى يمكن تحميله");
                // exportFileAs("word", editor?.getHTML());
                downloadPdf(editor, "", "word");
              }
            }}
            className="DroplistButton"
          >
            <div className=" flex-grow-1 text-center">DOXC</div>
            <img src={doc} className=" droplistImage" />
          </button>
        ),
      },
    ],
  },
  {
    icon: <BoldIcon width={20} height={20} title="خط سميك" />,
    action: () => editor?.chain().focus().toggleBold().run(),
  },
  {
    icon: <ItalicIcon width={20} height={20} title="خط مائل" />,
    action: () => editor?.chain().focus().toggleItalic().run(),
  },
  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <PenIcon width={20} height={20} />
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
      editor?.chain().focus().setHighlight({ color }).run(),
  },
  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <UnderlineIcon width={20} height={20} />
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
    dropDownAction: (color) => editor?.chain().focus().setColor(color).run(),
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="items-center justify-center"
      >
        <input
          type="text"
          pattern="[0-9]{5}"
          placeholder={
            editor?.getAttributes("textStyle")?.fontSize?.split("px")[0] || 20
          }
          style={{
            width: "22px",
            height: "22px",
            fontSize: "12px",
          }}
          className="text-center inputToolbar-Custom custom-sansFont border border-primary rounded text-primary fw-medium"
          onBlur={(e) => {
            editor?.chain().focus().setFontSize(`${e.target.value}px`).run();
          }}
        />
        <span className=" arrowInput-custom position-absolute">
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
    ],
    dropDownAction: (value) =>
      editor?.chain().focus().setFontSize(`${value}px`).run(),
    isActiveOption: editor
      ?.getAttributes("textStyle")
      ?.fontSize?.split("px")[0],
  },

  {
    icon: <RightAlignIcon width={20} height={20} title="محاذاة إلى اليمين" />,
    action: () => editor?.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: <CenterAlignIcon width={20} height={20} title="محاذاة إلى المنتصف" />,
    action: () => editor?.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: <LeftAlignIcon width={20} height={20} title="محاذاة إلى اليسار" />,
    action: () => {
      editor?.chain().focus().setTextAlign("left").run();
    },
  },
  {
    icon: (
      <>
        <span>
          <img
            src={listNPragrphe}
            width={15}
            height={15}
            title="قائمة غير مرتبة"
            alt="قائمة غير مرتبة"
          />
        </span>
      </>
    ),

    action: () => editor?.chain().focus().toggleBulletList().run(),
  },
  {
    icon: (
      <>
        <span>
          <img
            src={listPragrphe}
            width={15}
            height={15}
            title="قائمة مرتبة"
            alt="قائمة مرتبة"
          />
        </span>
      </>
    ),
    action: () => editor?.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: <LeftTabIcon width={20} height={20} title="إدخال مسافة بادئة" />,
    action: () => editor?.chain().focus().indent().run(),
  },
  {
    icon: <RightTabIcon width={20} height={20} title="حذف المسافة بادئة" />,
    action: () => editor?.chain().focus().outdent().run(),
  },
  {
    icon: <UndoIcon width={20} height={20} title="خطوة للخلف" />,
    action: () => editor?.chain().focus().undo().run(),
  },
  {
    icon: <RedoIcon width={20} height={20} title="خطوة للأمام" />,
    action: () => editor?.chain().focus().redo().run(),
  },
];

export default Toolbar;
