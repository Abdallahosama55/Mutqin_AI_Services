import LinkIcon from "@/assets/icons/Link";
import BoldIcon from "@/assets/icons/Bold";
import ItalicIcon from "@/assets/icons/Italic";
import PenIcon from "@/assets/icons/Pen";
import ArrowIcon from "@/assets/icons/Arrow";
import { BulletList } from "@/assets/icons/BulletList";
import { BulleOutlinetList } from "@/assets/icons/BulletOutlineList";
import { SquareList } from "@/assets/icons/SquareList";
import { Numberlist } from "@/assets/icons/Numberlist";
import LetterList from "@/assets/icons/LetterList";
import GreekIList from "@/assets/icons/GreekIList";
import GreekList from "@/assets/icons/GreekList";
import UpperCaseGreekList from "@/assets/icons/UpperCaseGreekList";
import UppercaseLetterList from "@/assets/icons/UppercaseLetterList";
import { themeColors } from "@/Util/theme";
import UnderlineIcon from "@/assets/icons/Underline";
import RightAlignIcon from "@/assets/icons/RightAlign";
import CenterAlignIcon from "@/assets/icons/CenterAlign";
import LeftAlignIcon from "@/assets/icons/LeftAlign";
import ListIcon from "@/assets/icons/List";
import OrderedListIcon from "@/assets/icons/OrderedList";
import LeftTabIcon from "@/assets/icons/LeftTab";
import RightTabIcon from "@/assets/icons/RightTab";
import UndoIcon from "@/assets/icons/Undo";
import RedoIcon from "@/assets/icons/Redo";
import { Stack } from "react-bootstrap";
import DropdownColor from "@/components/atoms/DropdownColor";
import React, { useReducer, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import LinkModal from "@/components/molecules/LinkModal";
import ImageIcon from "@/assets/icons/Image";
import ListDropDown from "@/components/molecules/ListDropDown";
import MultiOptionDropDown from "@/components/molecules/MultiOptionDropDown";
import DownloadIcon from "@/assets/icons/Download";
import toast from "react-hot-toast";
import exportFileAs from "./exportFileAs";
import listPragrphe from "@/assets/icons/Paragraph/Vector.png";
import listNPragrphe from "@/assets/icons/Paragraph/Vector1.png";
import "./EditorToolbar.css";
import ImportImage from "./ImportImage";
import { PiArrowsOutLineVerticalBold } from "react-icons/pi";
import { PiArrowsInLineVerticalBold } from "react-icons/pi";
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

function downloadTextFile(text, filename) {
  const element = document.createElement('a');
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element); // Clean up
}

function downloadTextWord(text, filename) {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'application/msword' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element); // Clean up
} 
const EditorToolbar = ({
  editor,
  rmMargin = false,
  style = {},
  iconSize = 24,
  gap = 4,
}) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");

  const [showSlider, setShowSlider] = useState(false);

  const items =
    breakpoint === "mobile"
      ? getToolbarData(editor, breakpoint === "mobile" ? 20 : iconSize).slice(
          0,
          5
        )
      : getToolbarData(editor, breakpoint === "mobile" ? 20 : iconSize);

  return (
    <Stack
      direction="horizontal"
      gap={breakpoint === "mobile" ? 2 : gap}
      className={` border rounded-4 py-2 px-3 bg-light ${
        /* height: 100%; */
        !rmMargin ? "mt-4" : ""
      } ${breakpoint !== "desktop" ? "w-100 py-1 px-2" : ""}`}
      style={{
        ...(breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between" }
          : {
              height: "auto",
              fontFamily: "sans-serif",
            }),
        ...style,
      }}
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
              {getToolbarData(editor, breakpoint === "mobile" ? 20 : iconSize)
                .slice(5)
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
      {Modal && <Modal onClose={() => setOpenModal(false)} show={openModal} />}
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center"
        role="button"
        onClick={() => {
          if (action) action();

          if (isColorDropDown || isMultiOptionDropDown || isListDropDown)
            setOpenDropDown((prev) => !prev);

          if (Modal) setOpenModal(true);
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
        {!!title && (
          <span className="fw-medium text-primary fs-6">{title}</span>
        )}
      </Stack>
    </>
  );
};

const getToolbarData = (editor, iconSize) => [
  {
    icon: <LinkIcon width={iconSize} title="إسترداد مقال من الويب" />,
    Modal: LinkModal,
  },
  {
    icon: <DownloadIcon width={iconSize} title={"تصدير الملف"} />,
    isMultiOptionDropDown: true,
    isActiveOption: 5,
    options: [
      {
        value: (
          <button
            onClick={() => {
              if (editor) {
                if (!editor.getText())
                  return toast.error("لا يوجد محتوى يمكن تحميله");
                downloadTextFile(editor.getText(),"editor.txt")
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
                if (!editor.getText())
                  return toast.error("لا يوجد محتوى يمكن تحميله");
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
                if (!editor.getText())
                  return toast.error("لا يوجد محتوى يمكن تحميله");

                downloadTextWord(editor.getText(),"text.doc")
         
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
    icon: <BoldIcon width={iconSize} title="خط سميك" />,
    action: () => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: <ItalicIcon width={iconSize} title="خط مائل" />,
    action: () => editor.chain().focus().toggleItalic().run(),
  },

  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center p-1 px-2 text-primary bg-reverse rounded"
      >
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span>
        <span>
          {`${
            editor.getAttributes("heading").level
              ? `Heading ${editor.getAttributes("heading").level}`
              : "paragraph"
          }`}
        </span>
      </Stack>
    ),
    options: [
      {
        value: "paragraph",
        className: "heading-drop-down",
      },
      { value: "heading 1", className: "heading-drop-down" },
      {
        value: "heading 2",
        className: "heading-drop-down",
      },
      {
        value: "heading 3",
        className: "heading-drop-down",
      },
      {
        value: "heading 4",
        className: "heading-drop-down",
      },
      {
        value: "heading 5",
        className: "heading-drop-down",
      },
      {
        value: "heading 6",
        className: "heading-drop-down",
      },
    ],
    isMultiOptionDropDown: true,
    dropDownAction: (value) => {
      editor.chain().focus().unsetFontSize().run();

      if (value === "paragraph") editor.chain().focus().setParagraph().run();
      if (value === "heading 1") {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      }
      if (value === "heading 2") {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      }
      if (value === "heading 3") {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      }
      if (value === "heading 4") {
        editor.chain().focus().toggleHeading({ level: 4 }).run();
      }
      if (value === "heading 5") {
        editor.chain().focus().toggleHeading({ level: 5 }).run();
      }
      if (value === "heading 6") {
        editor.chain().focus().toggleHeading({ level: 6 }).run();
      }
    },
    isActiveOption: editor.getAttributes("heading").level,
  },

  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <PenIcon width={iconSize} />
        </span>
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span>
      </Stack>
    ),
    isColorDropDown: true,
    dropDownAction: (color) =>
      editor.chain().focus().setHighlight({ color }).run(),
  },
  {
    icon: (
      <Stack direction="horizontal" gap={1} className="align-content-center">
        <span>
          <UnderlineIcon width={iconSize} />
        </span>
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span>
      </Stack>
    ),

    isColorDropDown: true,
    dropDownAction: (color) => editor.chain().focus().setColor(color).run(),
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
          defaultValue={
            editor.getAttributes("textStyle")?.fontSize?.split("px")[0] || 20
          }
          style={{
            width: "27px",
            height: "27px",
            fontSize: "15px",
          }}
          className="text-center border border-primary rounded text-primary fw-medium"
          onBlur={(e) => {
            editor.chain().focus().setFontSize(`${e.target.value}px`).run();
          }}
        />
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span>
      </Stack>
    ),
    isMultiOptionDropDown: true,
    options: [
      {
        value: "8",
        className: "px-2 py-0 custom-num-item",
      },
      {
        value: "10",
        className: "px-2 py-0 custom-num-item",
      },
      {
        value: "12",
        className: "px-2 py-0 custom-num-item",
      },
      {
        value: "14",
        className: "px-2 py-0 custom-num-item",
      },
      {
        value: "16",
        className: "px-2 py-0 custom-num-item",
      },
      {
        value: "18",
        className: "px-2 py-0 custom-num-item",
      },
      {
        value: "20",
        className: "px-2 py-0 custom-num-item",
      },
    ],
    dropDownAction: (value) =>
      editor.chain().focus().setFontSize(`${value}px`).run(),
    isActiveOption: editor.getAttributes("textStyle")?.fontSize?.split("px")[0],
  },

  {
    icon: <RightAlignIcon width={iconSize} title="محاذاة إلى اليمين" />,
    action: () => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: (
      <CenterAlignIcon
        width={iconSize}
        height={iconSize}
        title="محاذاة إلى المنتصف"
      />
    ),
    action: () => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: <LeftAlignIcon width={iconSize} title="محاذاة إلى اليسار" />,
    action: () => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: (
      <>
        {/* <span> */}
        {/* <ListIcon width={iconSize} /> */}
        <span>
          <img
            src={listNPragrphe}
            width={18}
            height={15}
            title="قائمة غير مرتبة"
            alt="قائمة غير مرتبة"
          />
        </span>
        {/* </span> */}
        {/* <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span> */}
      </>
    ),
    // isListDropDown: true,
    action: () => editor.chain().focus().toggleBulletList().run(),

    // options: [
    //   {
    //     value: <BulletList />,
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
  },
  {
    icon: (
      <>
        {/* <span> */}
        {/* <OrderedListIcon width={iconSize} /> */}
        <span>
          <img
            src={listPragrphe}
            width={18}
            height={15}
            title="قائمة مرتبة"
            alt="قائمة مرتبة"
          />
        </span>
        {/* </span> */}
        {/* <span>
          <ArrowIcon
            rotate={90}
            width={10}
            height={10}
            color={themeColors.colors.primary}
          />
        </span> */}
      </>
    ),
    // isListDropDown: true,
    // options: [
    //   {
    //     value: <Numberlist />,
    //   },
    //   {
    //     value: <LetterList />,
    //   },
    //   {
    //     value: <GreekList />,
    //   },
    //   {
    //     value: <GreekIList />,
    //   },
    //   {
    //     value: <UppercaseLetterList />,
    //   },
    //   {
    //     value: <UpperCaseGreekList />,
    //   },
    // ],
    action: () => editor.chain().focus().toggleOrderedList().run(),
    // dropDownAction: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: <LeftTabIcon width={iconSize} title="إدخال مسافة بادئة" />,
    action: () =>
      // editor
      //   .chain()
      //   .focus()
      //   // .createParagraphNear()
      //   .insertContent("\t")
      //   .run(),
      // editor.commands.outdent(),
      editor.chain().focus().indent().run(),
  },
  {
    icon: <RightTabIcon width={iconSize} title="حذف المسافة بادئة" />,
    action: () =>
      // editor
      //   .chain()
      //   .focus()
      //   // .createParagraphNear()
      //   .insertContent("\t")
      //   .run(),
      editor.chain().focus().outdent().run(),
  },
  {
    icon: <UndoIcon width={iconSize} title="خطوة للخلف" />,
    action: () => editor.chain().focus().undo().run(),
  },
  {
    icon: <RedoIcon width={iconSize} title="خطوة للأمام" />,
    action: () => editor.chain().focus().redo().run(),
  },
  {
    icon: <ImageIcon width={iconSize} height={iconSize} title="إدراج صورة" />,
    // action: () => insertImage(editor),
    isImportImage: true,
    isListDropDown: true,
    // isMultiOptionDropDown: true,
    options: [
      {
        value: <ImportImage editor={editor} />,
      },
    ],
  },
];

export default EditorToolbar;
