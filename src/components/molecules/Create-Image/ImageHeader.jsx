import React from "react";
import magic_hat from "@/assets/Images/create-image/magic-hat.png";
import "./ImageHeader.css";

const ImageHeader = () => {
  return (
    <div className=" px-5 text-center">
      <div className="gap-3 d-flex     justify-content-center  align-items-center">
        <div className="image-header">انشاء الصور بالذكاء الاصطناعي </div>
        <img src={magic_hat} className=" magic-hat " />
      </div>
      <div className="image-sub-header fw-light">
        أطلق العنان لإبداعك من خلال مولد الصور بالذكاء الاصطناعي الذي ينتج صورا
        مذهلة في ثوان
      </div>
    </div>
  );
};

export default ImageHeader;
