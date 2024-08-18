import React, { useState,useEffect } from "react";
import firework from "../../../assets/Images/modal/firework.svg";
import righticon from "../../../assets/Images/modal/Check Circle Icon.png";
import queen from "../../../assets/Images/modal/queen.png"
import './OfferModal.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import CenteredModal from "../Modal";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const OfferModal = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [hours, setHours] = useState(4)
  const [currency, setCurrency] = useState()
  const [minutes, setMinutes] = useState(18);
  const [seconds, setSeconds] = useState(40);
  const [show, setShow] = useState(true);
  const userWordsRemain = useSelector((state) => state.api.userWordsRemain);

  const userSubscriptionPlanEn = useSelector(
    (state) => state.api.userSubscriptionPlanEn
  );

  const getData = async () => {
    const res = await axios.get("https://ipapi.co/json/");
    setCurrency(res.data.currency);

  };
  useEffect(() => {
    getData()

  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
            // Timer reached 0, do something here
          } else {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);

  const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  const closeModal = () => {
    setModalOpen(false);
    localStorage.setItem('IsLogin',false)

  };
  const features = [
    { text: " لكتابة مقالات احترافية." },
    { text: "التدقيق اللغوي والنحوي." },
    { text: "التحدث مع متقن شات GPT-4."} ,
    { text: "التسويق عبر البريد الإلكتروني." },
    { text: "تخطيط استراتيجيات المحتوى." },
    { text: "التسويق لوسائل التواصل الاجتماعي." },
    { text: "كتابة وصف المنتجات بشكل جذاب." },
    { text: "وأكثر من 80 نموذج مختلف من المحتوى." },

    
  ];
  return (
    <>
   { (modalOpen && userWordsRemain!=0 && userSubscriptionPlanEn ==='Free' && localStorage.getItem('IsLogin')==="true") ? <>
    
    <div className=" h-100  p-0 position-fixed w-100 z-1 bg-black opacity-25 "  onClick={closeModal} ></div>
    <div className=" z-3 bg-white position-absolute  top-50 start-50 translate-middle  modal-offer  " >
      <Stack
        gap={0}
        style={{
   
        }}
      >
      <img src={firework} className=" position-absolute  fire-img " />
      <div onClick={closeModal}>
      <div
        className="   position-absolute exit-btn "
        onClick={closeModal}
      >
        {" "}
        <IoIosCloseCircleOutline className=" w-full cursor-pointer" />
      </div>
    </div>
   
   <div className="  row justify-content-center py-5   " dir="rtl">
   
 
   <div  className=" col-md-5  pb-3  px-5  col-modal-1 " dir="rtl">
<h3 className=" ">مُتقِن خيارك الأول لكتابة المحتوي!</h3>
<h5 className="py-3  ">سواء كان ذلك..</h5>


{features.map((item,index)=>(
  <div className="  py-1 row " >
<div className=" d-flex col-1 justify-content-center align-items-center ">
<img src={righticon} width={15}/>
</div>
<div className="  d-flex  align-items-center  col-11">
<span className=" ">{item.text}</span>
</div>
</div>

  
))}



   </div>
   <div  className=" col-md-7  px-4 col-modal-2" dir="rtl">

   <h3 className=" mt-4 mt-md-0 ">اكتب محتوي بلا حدود لمدة ثلاثة أشهر!!</h3>
   <h5 className="pb-3   ps-1 ">اشترك لمدة شهر، واحصل على شهرين إضافيين مجانًا لفترة محدودة الآن.</h5>

   <div className=" position-relative table-offer  rounded-4">
   <img src={queen} className="  position-absolute  queen-icon"/>
   <h1 className="py-2  rounded-4">  الأكثر طلباً</h1>

   <div className="block px-3  mb-5">
     <h3 className=" p-2  py-2 text-white ">ثلاثة أشهر </h3>
     <span className="strikediag  inter-text m-2 p-0 price-table font-sans">
     {currency==="EGP"? "2400 EGP" :" $50.97  "}
     </span>
  
     <h3 className=" p-2 py-3 pb-5 text-white price-Offer  text-[16px]  ">
       <span className=" inter-text text-green ">
       {currency==="EGP"? "799 EGP" :" $16.59  "}
       </span>{" "}
       \ عدد كلمات غير محدود
     </h3>
   </div>



   </div>
   <div className=" row justify-content-center align-items-center    ">
<div className="col-md-4 d-flex justify-content-center ">

<div className=" offer-text-btn text-white    font-thin p-2 mb-3 mb-md-0   rounded-3  px-md-2 px-4 text-center   "> عرض حصري ينتهي خلال</div>
</div>
<div className="col-md-4 justify-content-center d-flex container   px-md-2 px-5  me-md-0 ">
<div className=" row justify-content-center align-items-center  w-100  ">

<div className=" col-3 font-time inter-text   "> {formatTime(hours)}</div>
<div className=" col-6  font-time inter-text   d-flex justify-content-center position-relative align-items-center"> <span className="  start-0 position-absolute  ">:</span> {formatTime(minutes)}<span className=" position-absolute end-0   ">:</span></div>
<div className=" col-3 font-time inter-text text-center ">  {formatTime(seconds)} </div>

<div className=" col-3 text-box-modal-thin  p-0  text-center  "> ساعات</div>
<div className=" col-6 text-box-modal-thin d-flex justify-content-center position-relative align-items-center"><span className="   "></span>    دقايق  <span className="  "></span></div>
<div className=" col-3  text-box-modal-thin text-center ">  ثواني </div>

</div>

</div>
<div className="col-md-4   mt-md-0 mt-4 d-flex  justify-content-center align-items-center ">

<button className="  btn-move-offer text-white px-4 " >
<Link to='/myplan' className=" text-decoration-none text-white">إشترك الأن</Link>
</button>



</div>

</div>
   </div>
  
   </div>
 
      </Stack>
    </div>
    </>:""}
    

    </>
  );
};

export default OfferModal;
