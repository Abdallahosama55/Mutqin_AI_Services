import LinkIcon from "@/assets/icons/Link";
import AIIcon from "@/assets/icons/AI";
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
import { CopyIcon } from "../atoms/allIcons";
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
import listNPragrphe from "@/assets/icons/Paragraph/Vector1.png";
import DownloadIcon from "@/assets/icons/Download";
import pdf from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 1.png";
import txt from "@/assets/Images/reformulate/txt-file-type-svgrepo-com 1.png";
import doc from "@/assets/Images/reformulate/pdf-file-type-svgrepo-com 2.png";
import { Stack } from "react-bootstrap";
import DropdownColor from "../atoms/DropdownColor";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import toast from "react-hot-toast";

import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import LinkModal from "./LinkModal";
import ImageIcon from "@/assets/icons/Image";
import { insertImage } from "@/helpers/set-image";
import ListDropDown from "./ListDropDown";
import MultiOptionDropDown from "./MultiOptionDropDown";
import AIModal from "./AIModal";
import { PiArrowsInLineVerticalBold } from "react-icons/pi";
import listPragrphe from "@/assets/icons/Paragraph/Vector.png";
import { Box } from "@mui/material";
import ImportImage from "../../pages/editor/ImportImage";
import exportFileAs from "../../pages/editor/exportFileAs";
import CustomButton from "@/components/atoms/Button";
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';
import geSSTwoRegular from '../../assets/fonts/GESSTwoMedium-Medium.ttf'; // Adjust the path to your font file

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


const EditorToolbar = ({
  editor,
  rmMargin = false,
  style = {},
  iconSize = 24,
  gap = 4,
  neverSplit = false,
}) => {
  const { pathname } = useLocation();
  const [showSlider, setShowSlider] = useState(false);
  const { breakpoint } = useBreakpoint({ ...BREAKPOINTS, lg: 1400 }, "mobile");
  const isMobile = breakpoint === "mobile";
  const isBelowDesktop = !["lg", "extraDesktop"].includes(breakpoint);

  const rawItems = getToolbarData(editor, iconSize);
  const items = useRef({ visible: rawItems, overflow: rawItems });

  if (pathname.includes("content-section")||pathname.includes("human-philanthropist")) {
    const contentSectionsItems = getToolbarDataConetentSection(
      editor,
      iconSize
    ).concat(rawItems.slice(2));

    const breakpointItems = {
      desktop: {
        visible: contentSectionsItems,
        overflow: [],
      },

      belowDesketop: {
        visible: contentSectionsItems.slice(0, 8),
        overflow: contentSectionsItems.slice(8),
      },

      mobile: {
        visible: contentSectionsItems
          .slice(0, 3)
          .concat(contentSectionsItems.slice(7, 8)),
        overflow: contentSectionsItems
          .slice(3, 7)
          .concat(contentSectionsItems.slice(8)),
      },
    };

    items.current = {
      visible: isMobile
        ? breakpointItems.mobile.visible
        : isBelowDesktop
        ? breakpointItems.belowDesketop.visible
        : breakpointItems.desktop.visible,
      overflow: isMobile
        ? breakpointItems.mobile.overflow
        : isBelowDesktop
        ? breakpointItems.belowDesketop.overflow
        : breakpointItems.desktop.overflow,
    };
  }

  return (
    <Stack
      direction="horizontal"
      gap={gap}
      className={` border rounded-3 py-2 px-3 bg-light position-relative ${
        /* height: 100%; */
        !rmMargin ? "mt-4" : ""
      } ${breakpoint !== "desktop" ? "w-100 py-1 px-2" : ""}`}
      style={{
        ...(breakpoint !== "desktop"
          ? { flexWrap: "wrap", justifyContent: "space-between" }
          : {
              height: "auto",
            }),
        ...style,
      }}
    >
      {items.current.visible.map((item, index) => (
        <ToolbarItem key={index} {...item} />
      ))}

      {items.current.overflow.length > 0 && (
        <span onClick={() => setShowSlider((p) => !p)}>
          <PiArrowsInLineVerticalBold
            style={{
              width: "22px",
              height: "22px",
              cursor: "pointer",
              color: "#5225ce",
            }}
          />
        </span>
      )}

      {showSlider && (
        <Box
          sx={{
            transform: "translate(-30%, 100%)",
          }}
          className="position-absolute drop-down-list_editor d-flex flex-column gap-2"
        >
          {items.current.overflow.map((item, index) => (
            <ToolbarItem key={index} {...item} />
          ))}
        </Box>
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
        {!!title && (
          <span className="fw-medium text-primary fs-6">{title}</span>
        )}
      </Stack>
    </>
  );
};

const getToolbarDataConetentSection = (editor, iconSize) => [
  {
    icon: (
      <CustomButton
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
        <CopyIcon width={iconSize + 2} height={iconSize + 2} noshow={"test"} />
      </CustomButton>
    ),
  },
  {
    icon: <DownloadIcon width={iconSize + 2} title={"تصدير الملف"} />,
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
                downloadTextFile(editor.getText(),"Mutqin.txt")

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
              
                downloadTextWord(editor.getText(), "Mutqin.doc")
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
];
const getToolbarData = (editor, iconSize) => [
  {
    icon: <LinkIcon width={iconSize} />,
    Modal: LinkModal,
  },
  {
    icon: <AIIcon width={iconSize} />,
    Modal: AIModal,
  },
  {
    icon: <BoldIcon width={iconSize} />,
    action: () => editor.chain().focus().toggleBold().run(),
  },
  {
    icon: <ItalicIcon width={iconSize} />,
    action: () => editor.chain().focus().toggleItalic().run(),
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
            editor.getAttributes("textStyle")?.fontSize?.split("px")[0] || 16
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
        className: "px-2 py-0",
      },
      {
        value: "10",
        className: "px-2 py-0",
      },
      {
        value: "12",
        className: "px-2 py-0",
      },
      {
        value: "14",
        className: "px-2 py-0",
      },
      {
        value: "16",
        className: "px-2 py-0",
      },
      {
        value: "18",
        className: "px-2 py-0",
      },
    ],
    dropDownAction: (value) =>
      editor.chain().focus().setFontSize(`${value}px`).run(),
    isActiveOption: editor.getAttributes("textStyle")?.fontSize?.split("px")[0],
  },
  {
    icon: (
      <Stack
        direction="horizontal"
        gap={1}
        className="align-content-center px-2 text-primary bg-reverse rounded-3"
        style={{ paddingTop: "1px", paddingBottom: "1px" }}
      >
        <span>
          <ArrowIcon rotate={90} color={themeColors.colors.primary} />
        </span>
        <Box
          component={"span"}
          sx={{
            fontFamily: '"Tajawal",sans-serif',
            fontSize: { xs: 14, md: 17 },
          }}
        >
          {`${
            editor.getAttributes("heading").level
              ? `Heading ${editor.getAttributes("heading").level}`
              : "paragraph"
          }`}
        </Box>
      </Stack>
    ),
    options: [
      {
        value: "paragraph",
        className: "fs-6",
      },
      { value: "heading 1", className: "fs-1" },
      {
        value: "heading 2",
        className: "fs-2",
      },
      {
        value: "heading 3",
        className: "fs-3",
      },
      {
        value: "heading 4",
        className: "fs-4",
      },
      {
        value: "heading 5",
        className: "fs-5",
      },
      {
        value: "heading 6",
        className: "fs-6",
      },
    ],
    isMultiOptionDropDown: true,
    dropDownAction: (value) => {
      editor.chain().focus().unsetFontSize().run();

      if (value === "paragraph") editor.chain().focus().setParagraph().run();
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
    icon: <RightAlignIcon width={iconSize} />,
    action: () => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    icon: <CenterAlignIcon width={iconSize} height={iconSize} />,
    action: () => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: <LeftAlignIcon width={iconSize} />,
    action: () => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: (
      <span>
        <img
          src={listNPragrphe}
          width={iconSize}
          title="قائمة غير مرتبة"
          alt="قائمة غير مرتبة"
        />
      </span>
    ),

    action: () => editor.chain().focus().toggleBulletList().run(),
  },
  {
    icon: (
      <span>
        <img
          src={listPragrphe}
          width={18}
          height={15}
          title="قائمة مرتبة"
          alt="قائمة مرتبة"
        />
      </span>
    ),
    action: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: <LeftTabIcon width={iconSize} />,
    action: () =>
      editor
        .chain()
        .focus("end")

        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: <RightTabIcon width={iconSize} />,
    action: () =>
      editor
        .chain()
        .focus("start")
        .createParagraphNear()
        .insertContent("\t")
        .run(),
  },
  {
    icon: <UndoIcon width={iconSize} />,
    action: () => editor.chain().focus().undo().run(),
  },
  {
    icon: <RedoIcon width={iconSize} />,
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
