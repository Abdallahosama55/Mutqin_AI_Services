import React from 'react'
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import accountimg from "../../assets/Images/AccountSetting/Ellipse 3242.png";
import { IoIosArrowBack } from "react-icons/io";
function Sidebarouter(props) {
    const navigate = useNavigate();
const handleNavigateBack = () => {
  navigate("/control");
};
const handleNavigatemyplan = () => {
  navigate("/myplan");
};
const handleNavigatemyaccount = () => {
    navigate("/myaccount");
  };
  

  return (
    <div>
    <div className=" d-flex justify-content-center ">
    <div className=" d-block w-100 m-3">
      <div className=" py-2  d-flex  justify-content-center  align-items-center">
        <img src={logo} />
      </div>
      <div>
        <button
          onClick={handleNavigateBack}
          className="w-100 rounded mt-2 mb-3  button-white   fw-light   text-move shadow-sm    mt-2">
          الرجوع
          <IoIosArrowBack />
        </button>
      </div>
      {!props.active_link ? (
        <button className="w-100 rounded fw-light p-1 text-white btn-move1"   onClick={handleNavigatemyaccount} >
          إعدادات الحساب
        </button>
      ) : (
        <div>
          <button className="w-100 rounded  button-white  fw-light  p-1 font-basic"   onClick={handleNavigatemyaccount}>
            إعدادات الحساب
          </button>
        </div>
      )}

      <div>

      {props.active_link ? (
        <button className="w-100 rounded mt-2 fw-light p-1 text-white btn-move1"    onClick={handleNavigatemyplan}>
        خطتي
        </button>
      ) : (
        <div>
          <button className="w-100 rounded mt-2 button-white  fw-light  p-1 font-basic "    onClick={handleNavigatemyplan}>
          خطتي
                    </button>
        </div>
      )}
      </div>
    </div>
  </div>
    
    
    </div>
  )
}

export default Sidebarouter