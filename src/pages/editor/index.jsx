import { useEffect, useState } from "react";
import EditorPanel from "./EditorPanel";
import { Col, Row } from "react-bootstrap";
import { BREAKPOINTS } from "@/helpers/constants";
import { useBreakpoint } from "use-breakpoint";
// import "../index.scss";
import WelcomeModal from "@/components/molecules/WelcomeModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowHistory } from "@/redux/slices/createArticle/articleSlice";
import {
  setContent,
  setDocId,
  setTitle,
  toggleDocIsCreated,
} from "@/redux/slices/editor/editorSlice";

const EditorPage = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const dispatch = useDispatch();

  const subscription_plan = useSelector(
    (state) => state.user.subscription_plan
  );

  const [showModal, setShowModal] = useState(
    subscription_plan === "Free" && localStorage.getItem("trail")
  );

  //Cleanup
  useEffect(
    () => () => {
      dispatch(toggleShowHistory(false));
      dispatch(setContent(""));
      dispatch(setTitle(""));
      dispatch(setDocId(""));
      dispatch(toggleDocIsCreated(false));
    },
    []
  );

  return (
    <>


      <Row
        dir="rtl"
        className={isBelowDesktop ? " px-3 flex-fill" : "flex-fill"}
        style={{
          minHeight: "90vh",
        }}
      >
        <Col>
          <EditorPanel />
        </Col>
      </Row>
    </>
  );
};

export default EditorPage;
