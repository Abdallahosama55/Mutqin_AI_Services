import React ,{useState,useEffect } from "react";
import Navbar from "@/Util/dashboardLayout/Navbar";
import "./Myplan.css";
import axios from "axios";
import { TbPointFilled } from "react-icons/tb";
import TextWithSansSerifNumbers from '../../helpers/TextwithSensSierfNumber';
import img1 from '../../assets/Images/myplan/kite_5030274 1.svg'
import img4 from '../../assets/Images/myplan/badge.svg'
import img2 from '../../assets/Images/myplan/rocket_11734989 1.svg'
import img3 from '../../assets/Images/myplan/star 1.svg'
import Sidebarouter from "../../components/molecules/Sidebarouter";
import {useSelector } from "react-redux";
import Protection from "../../components/organisms/Auth/Protection/Protection";

function MyPlan() {
  const [currency, setCurrency] = useState()
  const datacard1 = [
    { text: "متقن شات  AI" },
    { text: "أكثر من 80 نموذج محتوى" },
    { text: "كتابة المقالات الاحترافية" },
    { text: "التدقيق اللغوي الذكي" },
    {text:"تحويل الصوت لنص"},
    {text:"أوقات الاستجابة العادية "},
    {text:"تصدير المحتوى لملفات"},
    {text:"استخدام محرر متقن الذكي "},
    {text:"دعم أكثر من 100 لغة مختلفة"},
    {text:"التحديثات الشهرية"}
  ];
  const datacard2 = [
    { text: "متقن شات  AI" },
    { text: "أكثر من 80 نموذج محتوى" },
    { text: "كتابة المقالات الاحترافية" },
    { text: "التدقيق اللغوي الذكي" },
    {text:"تحويل الصوت لنص"},
    {text:"أوقات الاستجابة أسرع"},
    {text:"تصدير المحتوى لملفات"},
    {text:"استخدام محرر متقن الذكي "},
    {text:"دعم أكثر من 100 لغة مختلفة"},
    {text:"التحديثات الشهرية"}
  ];
  const getData = async () => {
    const res = await axios.get("https://ipapi.co/json/");
    setCurrency(res.data.currency);

  };


  const handlePlanPayment = async (type) => {
    try {
      const response = await axios.get(`https://backend.mutqinai.com/api/v1/subscriptions_plan/subscribe/${type}/`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });

      window.location.href=response.data.url
  } catch (error) {
      console.error('Error fetching second plan:', error);
  }

  
  };
 



const userSubscriptionPlan = useSelector((state) => state.api.userSubscriptionPlan);
const experiedDatePlan= useSelector((state) => state.api.experiedDatePlan);
const createdDatePlan= useSelector((state) => state.api.createdDatePlan);
const userSubscriptionPriceUsd=useSelector((state) => state.api.userSubscriptionPriceUsd);
const userSubscriptionPriceEG=useSelector((state) => state.api.userSubscriptionPriceEG);

useEffect(() => {
  //passing getData method to the lifecycle method
  getData();
}, []);
  
  return (
    <div>
    <div className=" opacity-0 ">

    <Protection/>
    </div>

      <div className=" row " dir="rtl">
  
      <div className="col-md-9  order-1 order-xl-1 order-xxl-1  col-xl-2 col-lg-2 col-xxl-2 mb-5 border-custom-container   shadow-sm rounded  ">
    <Sidebarouter active_link={true}/>
      </div>


      <div className="col-md-10  order-3 order-xl-1 order-xxl-1  col-xl-10 col-lg-10 col-xxl-10   pb-0 py-3 ">
    
      <div className="   mt-3" dir="rtl">
      <div className=" row p-3 justify-content-center align-items-center">
      <div className=" col-md-7 col-xl-7 col-lg-7 col-xxl-7 col-10 text-move rounded-4 border-blue py-4 p-4 pb-4 ">
      <h5 className=" pb-2">الإشتراك الحالي : {  userSubscriptionPlan}</h5>
      <h5>
      تاريخ الإشتراك   :
 <span className=" "> {experiedDatePlan} -  {createdDatePlan} </span>
 
       </h5>
      <h5>
      السعر :
    
<span className=" "> {currency==="EGP"? userSubscriptionPriceEG :userSubscriptionPriceUsd}  </span>
/ الشهر
      </h5>

    
    
      </div>
      
      </div>
      
        <div className="  ps-5    pe-5">
          <div className="  d-md-flex row    justify-content-center align-items-start ">

            <div className=" p-2 pb-5 mt-md-5 col-xl-3 col-lg-3 col-xxl-3 col-sm-12 col-md-6">

              <div className="border-card1 height-card  rounded-4 ">
              <div className=" d-flex align-items-center  button-card1  p-3 rounded-4 rounded-bottom-0 ">
              <img src={img1} className="col-2 p-2"/>
                <h5 className="  d-block me-2 mt-2  ">اشتراك مجاني</h5>
 
                
                </div>
                <div className="p-2 pb-0 header-card py-0 ">
                
                <h5 className=" fw-bolder p-3 font-darkblue pb-0  text-center  ">
                <span className=" font-number">{currency==="EGP"? " 0 EGP" :" $0  "} </span>
               \ شهريًا
       
               </h5>
                  <small className="  font-darkblue container   d-block  py-1   fw-light">
                  وصول إلى محتوى متنوع وجودة عالية في كافة الأقسام دون دفع أي رسوم.
                  </small>

                   <h5 className=" fw-bolder py-3   text-center  font-basic ">
                <span className=" font-number"> 2000</span>
                كلمة
               </h5>
                </div>

                <div className=" w-100 d-flex  justify-content-center">
                  <button className="  rounded-4  btn-rounded w-100 m-4 mt-0 button-card1   ps-5 pe-5 p-2">
                  {userSubscriptionPlan==="مجاني"?"خطتك الحالية":"بدأ الآن مجاناً"}  
                  </button>
                </div>

                <div className="row p-2 pe-4">
                {datacard1.map((item, index) => (
                  <div key={index} className="list  font-list">
                    <TbPointFilled className="text-basic" />
                    <span className="">
                      {item.text} 
                    </span>
                  </div>
                ))}
              </div>
          
              </div>
            </div>

            <div className=" p-2 pb-5 mt-md-5  col-xl-3 col-lg-3 col-xxl-3 col-sm-12 col-md-6">

              <div className="border-card2 height-card  rounded-4 ">
              <div className=" d-flex align-items-center  button-card2  p-3 rounded-4 rounded-bottom-0 ">
              <img src={img1} className="col-2 p-2"/>
                <h5 className="  d-block me-2 mt-2  "> باقة البداية</h5>
 
                
                </div>
                <div className="p-2 pb-0 header-card py-0 ">
                
                <h5 className=" fw-bolder p-3 font-darkblue pb-0  text-center  ">
                <span className=" font-number">{currency==="EGP"? " 299 EGP" :" $6.34  "} </span>
               \ شهريًا
       
               </h5>
                  <small className="  font-darkblue container   d-block  py-1   fw-light">
                    استمتع بمزايا مُتقِن بشكل متقدم،    لمختلف التخصصات.
                  </small>

                   <h5 className=" fw-bolder py-3   text-center  text-Orange ">
                <span > 50 ألف كلمة</span>
               
               </h5>
                </div>

                <div className=" w-100 d-flex  justify-content-center">
                  <button className="  rounded-4  btn-rounded w-100 m-4 mt-0 button-card2   ps-5 pe-5 p-2"  onClick={()=>handlePlanPayment("Startup")}>
                  {userSubscriptionPlan==="البداية" ? "خطتك الحالية":"  اشترك الان"}  
                  </button>
                </div>

                <div className="row p-2 pe-4">
                {datacard2.map((item, index) => (
                  <div key={index} className="list  font-list">
                    <TbPointFilled className="text-basic" />
                    <span className="">
                      {item.text} 
                    </span>
                  </div>
                ))}
              </div>
          
              </div>
            </div>
      
    
            <div className=" p-2 pb-5 mt-md-5  col-xl-3 col-lg-3 col-xxl-3 col-sm-12 col-md-6">

            <div className="border-card3 height-card  rounded-4 ">
            <div className=" button-card3  p-3 rounded-4 rounded-bottom-0  d-flex align-items-center">
            <img src={img3} className=" col-2  p-2"/>
              <h5 className="  d-block  me-2 mt-2 "> الباقه الاساسيه </h5>

              
              </div>
              <div className="p-2 pb-0 header-card py-0 ">
              
              <h5 className=" fw-bolder p-3 font-darkblue pb-0  text-center  ">
              <span className=" font-number">   {currency==="EGP"? " 499 EGP" :" $10.58  "} </span>
             \ شهريًا
     
             </h5>
                <small className="  font-darkblue container   d-block  py-1   fw-light">
                تجربة متكاملة ومتقدمة بشكل أكبر ومثالية للمبدعين والشركات الناشئة. 
                </small>

                 <h5 className=" fw-bolder py-3   text-center badget-card3   ">
              
          <span className=" font-number"> 200 </span>
            الف كلمة
             </h5>
              </div>

              <div className=" w-100 d-flex   justify-content-center">
              <button className="  rounded-4  btn-rounded w-100 m-4 mt-0 button-card3  ps-5 pe-5 p-2" onClick={()=>handlePlanPayment("Main")}>
  {userSubscriptionPlan==="بدايه" ?"خطتك الحالية" :"إشترك الان"}
               </button>
              </div>

              <div className="row p-2 pe-4">
              {datacard2.map((item, index) => (
                <div key={index} className="list  font-list">
                  <TbPointFilled className="text-basic" />
                  <span className="">
                    {item.text} 
                  </span>
                </div>
              ))}
            </div>
        
            </div>
          </div>
          <div className=" mt-4 p-2 pb-5 col-xl-3 col-lg-3 col-xxl-3 col-sm-12 col-md-6">

          <div className="border-card4 pb-3 height-card-premuim  rounded-4  ">
          <div className=" button-card4  p-3 rounded-2 rounded-bottom-0 d-flex  align-items-center">
          <img src={img4} className=" col-2  p-2"/>
            <h5 className="  d-block mt-2 me-2 ">  الباقه الاحترافية </h5>

            
            </div>
            <div className="p-2 pb-0 header-card py-0 ">
            
            <h5 className=" fw-bolder  mt-1 p-3 font-darkblue pb-0  text-center price-premuim-color ">
            <span className=" font-number">    {currency==="EGP"? "799 EGP" :" $16.59  "}  </span>
           \ ثلاثة أشهر
   
           </h5>
           <p   className=" font-darkblue container   d-block   text-blue-bold  ">اكتب محتوي بلا حدود لمدة ثلاثة أشهر!!</p>
              <small className="  font-darkblue container   d-block   fw-light">
               اشترك لمدة شهر، واحصل على شهرين مجانًا   
              </small>

               <h5 className=" fw-bolder py-3   text-center badget-card4    ">
            
               عدد كلمات غير محدود
           </h5>
            </div>

            <div className=" w-100 d-flex  justify-content-center">
            <button className="  rounded-4  btn-rounded w-100 m-4 mt-0 button-card4   ps-5 pe-5 p-2" onClick={()=>handlePlanPayment("Premium")}>
           {userSubscriptionPlan==="الاحترافية" ?"خطتك الحالية" :"إشترك الان"}
             </button>
            </div>

            <div className="row p-2 pe-4">
            {datacard2.map((item, index) => (
              <div key={index} className="list  font-list">
                <TbPointFilled className="text-basic" />
                <span className="">
              {item.text} 
                </span>
              </div>
            ))}
          </div>
      
          </div>
        </div>
          </div>
        </div>
      </div>
      </div>
      </div>
   
    </div>
  );
}

export default MyPlan;
