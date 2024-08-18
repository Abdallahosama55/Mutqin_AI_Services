//Modules
import { Col, Row, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "use-breakpoint";

//Files
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createDocument } from "@/redux/features/api/apiSlice";
import "../index.scss";
import RightPanel from "@/elements/RightPanel";
import LeftPanel from "@/elements/LeftPanel";
import { BREAKPOINTS } from "@/helpers/constants";
import { TextLengthProvider } from "../hooks/context/EditorTextLength";
import { useEditor } from "@tiptap/react";
import { useSelector } from "react-redux";
import { setContent } from "../redux/features/api/apiSlice";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";

const Home = () => {
  const navigate = useNavigate();
  const checker = useAppSelector((state) => state.checker);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const { content, mistakes } = useSelector((state) => state.checker);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Placeholder.configure({
        placeholder: "ابدأ الكتابة هنا",
      }),
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
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      dispatch(setContent(editor.getHTML()));
    },
  });

  //Create ID
  useEffect(() => {
    async function testing() {
      const newid = await dispatch(createDocument(false));
      if (checker.status === "succeeded") {
        navigate(`${checker.currentDoc}?new=true`);
      }
    }
    testing();
  }, []);

  //Check plan
  const [showModal, setShowModal] = useState(
    user.subscription_plan === "Free" && localStorage.getItem("trail")
  );

  if (checker.status === "loading")
    return (
      <Stack
        direction="horizontal"
        className="justify-content-center align-items-center flex-fill "
        style={{ backgroundColor: "#EBECF4" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Stack>
    );
  return (
    <TextLengthProvider>
      <Row
        dir="rtl"
        className=" py-3 px-3   mx-md-0  justify-content-center  gap-4  flex-fill"
        style={{ backgroundColor: "#EBECF4" }}
      >
        <Col
          md={breakpoint === "desktop" ? 9 : 12}
          style={{ backgroundColor: "#fff" }}
          className=" py-4 rounded-3 mx-2"
        >
          <RightPanel editor={editor} />
        </Col>
        <Col
          md={breakpoint === "desktop" ? "" : 12}
          style={{ backgroundColor: "#fff" }}
          className=" py-4 rounded-3 mx-2"
        >
          <LeftPanel editor={editor} />
        </Col>
      </Row>
    </TextLengthProvider>
  );
};

export default Home;
