import React, { useState } from "react";
import CenteredModal from "./Modal";
import { Stack } from "react-bootstrap";
import CustomButton from "../atoms/Button";
import FireWorks from "@/assets/fire-works.svg";
import robot from "../../assets/Images/robot .png";
import { useNavigate } from "react-router-dom";

const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const closeModalAndNavigate = () => {
    setShowModal(false);
    navigate("/edtior");
  };

  return (
    <CenteredModal show={showModal} size="xl">
      <Stack
        gap={3}
        style={{
          padding: "5rem",
        }}
      >
        <img
          src={robot}
          className=" d-md-block  d-xl-block d-xxl-block d-none  "
          width={165}
          style={{
            position: "absolute",
            top: "55%",
            left: "3%",
          }}
        />
        <Stack
          className="fw-bold text-primary text-center"
          style={{
            fontSize: "6rem",
          }}
        >
          نعتذر
        </Stack>
        <Stack className="text-primary fs-1" gap={2}>
          <p className="text-center" dir="rtl">
            تم استهلاك رصيدك المجاني "5000 كلمة"
          </p>
        </Stack>
        <Stack className="text-primary px-md-5 fs-5">
          <p className="text-center mx-md-4 w-100 px-md-5">
            يمكنك متابعة تعديل ملفاتك، ولتتمكن من استخدام كافة خصائص مُتقِن بشكل
            كامل، يرجى الاشتراك بأحد الباقات
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2} className="justify-center ">
          <div className=" row ">
            <div className=" col-md-6 btn ">
              <button
                className=" btn  w-100 py-2 edit  rounded btn-white-modal  "
                onClick={closeModalAndNavigate}
              >
                متابعة التعديل
              </button>
            </div>
            <div className=" col-md-6  btn ">
              <button
                className="w-100 px-5  text-center py-2 text-white rounded bg-primary"
                onClick={() => navigate("/myplan")}
              >
                ترقية
              </button>
            </div>
          </div>
        </Stack>
      </Stack>
    </CenteredModal>
  );
};

export default WelcomeModal;
