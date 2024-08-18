import React, { useEffect, useState } from "react";
import { Row, Col, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ChatSideBar from "./_components/ChatSideBar";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import Navbar from "../../Util/dashboardLayout/Navbar";
import { selectShow, setShow } from "../../redux/slices/chatSlice";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Protection from "../../components/organisms/Auth/Protection/Protection";
import { useDispatch } from "react-redux";
const RightCol = styled(Col)`
  border-left: 1px solid rgba(105, 43, 239, 0.2);
  padding: 16px;
  width: 16%;
  display: none;
  @media (max-width: 768px) {
    width: 100%;
    width: ${(props) => (props.show ? "100%" : "0%")};

    position: absolute;
    background-color: white;
    z-index: 50;
    direction: right; /* Corrected typo: 'diraction' to 'direction' */
  }
`;

function ChatLayout() {
  const show = useSelector(selectShow);
  const isMobile = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const [showCnv, setShowCnv] = useState();

  useEffect(() => {
    setShowCnv(show);
  }, [show]);

  const toggelShow = () => {
    setShowCnv(!showCnv);
  };

  return (
    <div
      className="   pt-0 pb-0 pe-0      overflow-x-hidden "
      style={{ position: isMobile ? "  " : "" }}
    >
      <div style={{ borderBottom: "1px solid rgba(105, 43, 239, 0.2)" }}>
        <Protection />
        <div className="   ms-xl-3 ms-lg-3 ms-xxl-3 ms-md-3 ">
          <Navbar width="98.2%" />
          {/* Other content here within the here */}
        </div>
      </div>

      <Toaster />

      <Row>
        <Col>
          <Outlet />
        </Col>
        {showCnv && (
          <RightCol
            md={"2"}
            className={" d-block mb-2  d-lg-block"}
            show={show}
          >
            <ChatSideBar offCanvasSelect={toggelShow} />
          </RightCol>
        )}
      </Row>
    </div>
  );
}

export default ChatLayout;
