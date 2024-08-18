import React, { useEffect, useState } from "react";
import "./Control.css";
import TableC from "./Table";
import CallMadeIcon from "@mui/icons-material/CallMade";
import haverimg1 from "@/assets/Images/control/chat 1.svg";
import icon from "../../assets/Images/control/Icon.svg"
import haverimg2 from "@/assets/Images/control/articles_7195421 1.svg";
import haverimg3 from "@/assets/Images/control/content_9743163 1.svg";
import haverimg4 from "@/assets/Images/control/vision_10650701 1.svg";
import article from "@/assets/Images/control/content-writing 1.svg";
import shopping from "@/assets/Images/control/products 1.svg";
import annoucement from "@/assets/Images/control/Idea.svg";
import imgiconweb from "@/assets/Images/dashboredCards/Website Management.png"
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { fetchData, setUserWordsRemain, setUserWordsSubscription } from "../../redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { v4 as uuid } from 'uuid';
import { FaArrowLeftLong, FaInfinity } from "react-icons/fa6";
import book from "../../assets/Images/dashboredCards/saly.png";
import note from "../../assets/Images/dashboredCards/saly1.png";
import { IoSearchSharp } from "react-icons/io5";
import img_bg1 from '../../assets/Images/dashboredCards/box-grad.png'
import img_bg2 from '../../assets/Images/dashboredCards/article (1).png'
import img_bg3 from '../../assets/Images/dashboredCards/eligant.png'
import ChartC from './ChartC'
import BarChart  from "./BarChart";

import SearchInputUserDashboared from "../../components/ContentSections/Sections/SearchInputUserDashboard";
const Control = () => {
    // Generate random UUID for the specified part
    const randomUuid = uuid();
    const userWordsRemain = useSelector((state) => state.api.userWordsRemain);
    const userWordsSubscription = useSelector(
      (state) => state.api.userWordsSubscription
    );
    const userSubscriptionPlanEn = useSelector(
      (state) => state.api.userSubscriptionPlanEn
    );
  
    const userSubscriptionPlan = useSelector(
      (state) => state.api.userSubscriptionPlan
    );
  
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [deleted, setDeleted] = useState(false); // State to track deletion
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(10);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    setValue(selectedValue);
  };
  useEffect(() => {
    dispatch(
      fetchData({
        endpoint: "user/dashboard/",
        params: { limit: value, search: searchValue },
      })
    );


  }, [dispatch, value, searchValue, deleted]);

  const { data, loading, error } = useSelector((state) => state.api);
  // Get the image URL
  const handleDeleteUpdate = () => {
    setDeleted(!deleted); // Toggle the deleted state
  };

  useEffect(() => {
    dispatch(setUserWordsRemain(data?.userInfo?.subscription_details?.remaining_word_count)); 
    dispatch(setUserWordsSubscription(data?.userInfo?.subscription_details?.word_count));
 
    // Function to check if the screen width is less than a certain threshold
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust threshold as per your requirement
    };

    // Call checkIfMobile when the component mounts and on resize
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [dispatch]);

const currentWeekUsage=data?.userUsage?.currentWeek
const lastWeekUsage=data?.userUsage?.lastWeek
console.log("userword",userWordsSubscription)
  const progress = (((data?.userInfo?.subscription_details.word_count) -( data?.userInfo?.subscription_details.remaining_word_count)) /  ( data?.userInfo?.subscription_details.word_count)) * 100;

  
  

  const items = [
    {
      title: "أفكار المقالات",
      description:
        " أفكارًا جديدة ومبتكرة باستخدام أداتنا لتوليد أفكار مقالات متنوعة",
      icon: article, // Add the icon name here
      path: `/content-section/396ee8d2-05f5-4aca-8ac0-6a670622610a/${randomUuid}`,

    },
    {
      title: "وصف المنتج ",
      description:
        " اكتب وصفا  جذابا للمنتج باستخدام أداتنا لكتابة معلومات شاملة ",
      icon: shopping, // Add the icon name here
      path: `/content-section/5aa5f56d-bd53-47b9-86c5-9b4b723d09e5/${randomUuid}`,
    },
    {
      title: " أفكار إعلانية",
      description:
        " أفكاراً إعلانية مبتكرة بواسطة أداتنا، لضمان جاذبية أعلى لإعلاناتك",
      icon: annoucement, // Add the icon name here
      path: `/content-section/f0843674-706c-48f2-b299-297dcfd88521/${randomUuid}`,
    },
 
 

  ];

  const cardData = [
    {
      id: 1,
      number: "55",
      text: " أحصل على إجابات فورية ودقيقة على أسئلتك، واستمتع بتفاعل متقدم مع متقن شات.  ",
      title: "ابدا محادثة جديدة",
      text_mobile: " إجابات  فورية  ودقيقة على أسئلتك  بشكل كامل.",

      src: haverimg1,
      path: "/chat",
    },
    {
      id: 2,
      number: "12",
      text: "       اكتب  محتوى بشكل  احترافي، ولتحسين SEO  حيث  يكتب  مُتقِن  محتوى ذكي  يلبي  احتياجاتك.",
      title: "كتابة مقال احترافي",
      src: haverimg2,
      path: "/create-article",
      text_mobile: "اكتب محتوى بشكل احترافي، ولتحسين SEO.",
    },
    {
      id: 3,
      number: "24",
      text: "أنشئ أكثر من 80 نوعًا من نماذج المحتوى المختلفة الذي يلبي احتياجات الجمهور المستهدف. ",
      title: "  نماذج محتوى متنوعة",
      src: haverimg3,
      text_mobile: "أنشئ أكثر من 80 نوعًا من نماذج المحتوى.",
      path: "/content-section",
    },
    {
      id: 4,
      number: "08",
      text: "يقوم متقن بفحص نصوصك بدقة، يصحح الأخطاء الإملائية والنحوية، ويضمن لك دقة لغوية عالية.",
      title: "تدقيق لغوي ذكي ",
      src: haverimg4,
      text_mobile: "فحص نصوصك بدقة، وتصحيح الأخطاء الإملائية والنحوية.",
      path: "/detector",
    },
  ];

  if (loading) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
 
  return (
    <section className="Control  ">
    
      <div className="container-fluid   p-0 m-0">
        <div className=" p-0  mx-auto">
          <div
            dir="rtl"
            className=" controlHeight  p-0  overflow-y-scroll   pt-2 pb-2 "
          >
            <div dir="ltr" className="containerC">
        

              <div className=" p-1 p-md-2 font-basic rounded-4 ms-2 ms-md-0 me-3 position-relative " dir="rtl" style={{backgroundColor:"#692BEF"}}>
              
              <div className="  bg-vector p-2">
              <img src={note} className=" position-absolute me-md-4  d-md-block d-none  z-0" style={{width:"65px"}}/>
              <div className=" row">
            
              <div className=" col-12 pb-0 ">
                <h3 className="py-1  text-center text-white fw-bold">  ماذا تريد ان تكتب الان؟</h3>
              </div>
              <img src={book} className=" position-absolute  postion-icon-book  start-0 me-md-4 d-md-block d-none  z-0" style={{width:"160px"}}/>
            
            </div>

            <div className="p-3 d-flex    justify-content-center align-items-center rounded-3  " >
          
            <div className="row justify-content-center align-items-center  ">
            <div className=" px-2 py-3 col-xl-10 ">
            <div className="  bg-white   py-1    rounded-2 ">
            <div className=" w-100 ">
            <div className=" d-flex align-items-center">
            <div className="   text-muted  px-2 "> <IoSearchSharp size={25} /></div>
            <div className=" col-12 ">
            <div className=" w-100">
            <SearchInputUserDashboared/>
                        </div>
            
            </div>
           
            </div> 
            
            </div>
  
            
            </div>
            
            </div>
       



              {items.map((item, index) => (
           
                <div
                  key={index}
                  className="col-xl-5       p-2 col-lg-5 col-xxl-5 col-md-5 cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                
                  <div className="rounded-3 border-blue bg-white  pb-0 ps-2 pe-2">
                  <Link className=" text-decoration-none">
                    <div className="d-flex justify-content-start align-items-start cursor-pointer">
                      <div className=" d-flex align-items-start mt-2 cursor-pointer ">
                        {/* Render the icon component */}
                        <img src={item.icon}></img>
                      </div>
                      <div className="p-2 pt-2 pb-0 cursor-pointer">
                        <small
                          className="d-block  "
                          style={{ color: "rgba(0, 27, 121, 1)" }}
                        >
                          {item.title}
                        </small>
                        <p className="text-muted font-small-p fw-light cursor-pointer">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
              
              ))}
              <div className="col-xl-5   p-2 col-lg-5 col-xxl-5 col-md-5 cursor-pointer">
              <Link to="/content-section" className=" text-decoration-none">
              
              <div className="rounded-3 border-blue   position-relative  pb-0 p-2 text-white  fw-bold  pt-4 pb-4 pe-3 " style={{backgroundColor:"#4A2F94"}}>إستكشف المزيد
 
              <span className=" position-absolute  start-0 ms-3  text-white " size={"55"}> <FaArrowLeftLong /></span>
              
              
            
           
              </div>
                </Link>
              
              </div>
            
            </div>
       
             
            </div>

            
              
              </div>
          
              </div>
              <div className=" pt-4   d-md-flex    pe-2 ps-0  " dir='rtl'>
              <div className="col-md-4  bg-transparent p-2" >
              <div className="text-center py-3 bg-white rounded-2 position-relative d-flex justify-content-center align-items-center" style={{minHeight:"28vh"}}>
              {/* Background Image */}
              <img
                src={img_bg1}
                alt="Background"
                className="position-absolute top-0 start-0 w-100 h-100 object-cover z-5"
              />
              
              {/* Content */}
              <div className="d-block  px-5" style={{ zIndex: 1 }}>
                <h4 className="fw-bold">ابدأ محادثة جديدة</h4>
                <p>احصل علي اجابات فورية ودقيقة علي اسئلتك واستمتع بتفاعل متقدم مع متقن شات </p>
                <div className="d-flex justify-content-center">
                  <button className="btn-move1_control rounded-3  text-white py-2 px-5" onClick={()=>(navigate('/chat'))}>بدء</button>  
                </div>
              </div>
            </div>
            
              
              </div>
              <div className="col-md-4   p-2 ">
              <div className="text-center  py-3 bg-white rounded-2 position-relative d-flex justify-content-center align-items-center" style={{minHeight:"28vh"}}>
              {/* Background Image */}
              <img
                src={img_bg2}
                alt="Background"
                className="position-absolute top-0 start-0 w-100 h-100 object-cover z-5"
              />
              
              {/* Content */}
              <div className="d-block    px-5" style={{ zIndex: 1 }}>
                <h4 className="fw-bold">  كتابة مقال احترافي</h4>
                <p>اكتب محتوي بشكل احترافي ولتحسين seo حيث يكتب متقن محتوي ذكي يلبي احتياجاتك</p>
                <div className="d-flex  justify-content-center">
                  <button className="  btn-move1_control rounded-3  text-white py-2 px-5" onClick={()=>(navigate('/create-article'))}>بدء</button>  
                </div>
              </div>
            </div>
            
              
              </div>


              <div className="col-md-4   p-2 ps-md-0">
              <div className="text-center py-3 bg-white rounded-2 position-relative d-flex justify-content-center align-items-center" style={{minHeight:"28vh"}}>
              {/* Background Image */}
              <img
                src={img_bg3}
                alt="Background"
                className="position-absolute top-0 start-0 w-100 h-100 object-cover z-5"
              />
              
              {/* Content */}
              <div className="d-block  px-5" style={{ zIndex: 1 }}>
                <h4 className="fw-bold">تدقيق لغوي ذكي  </h4>
                <p>يقوم متقن بفحص نصوصك بدقة،يصحح الاخطاء الاملائية والنحوية ويضمن لك دقة لغوية عالية</p>
                <div className="d-flex justify-content-center">
                  <button className="btn-move1_control rounded-3  text-white py-2 px-5" onClick={()=>(navigate('/detector'))}>بدء</button>  
                </div>
              </div>
            </div>
            
              
              </div>
              
              </div>

<div className="d-none   align-items-center   rounded-3 container bg-white mt-5 py-md-4 py-4" dir='rtl' style={{width:"97%"}}>
<div className="col-1  p-2 d-flex justify-content-center align-content-center"  dir='rtl'>
<img src={imgiconweb} alt="website" className=" w-100 "/>
</div>
<div className="col-11 col-md-9"  dir='rtl'>
<h6 className=" fw-bold ">إدارة المشاريع: الحل الذكي لتنفيذ مشاريع كتابة المحتوى بكفاءة وفاعلية</h6>
<p className="ps-5">تُسهّل الأداة إدارة مشاريع كتابة المحتوى بطريقة ذكية وفعّالة. تتميز بقدرات فريدة تتيح لك إدارة وتنفيذ مشاريع كتابة المحتوى بكفاءة ودقة عالية، مما يوفر لك الوقت والجهد ويضمن نتائج استثنائية لعملك.</p>

</div>
<div className="col-12 col-md-1 d-flex justify-content-center align-items-center ">
 <button className=" btn-move d-flex px-4 align-items-center " >
 +
مشروع جديد 

</button>

</div>

</div>


<div className=" row  row-chart  me-md-1">
<div className="mt-4 col-md-8">
<ChartC currentWeekUsage={currentWeekUsage} lastWeekUsage={lastWeekUsage}/>

</div>

<div className="mt-4 col-md-4">
<div className="  shadow-sm  pb-3 h-100  rounded-3 py-2 " style={{backgroundColor:"#692BEF"}}>

<div className=" h-100">
<div className=' row pb-4 p-2 px-3 w-100' dir="rtl">
    <div className=' col-md-10 col-6 fw-bold text-white fs-5 '> باقه البداية</div>
    <div className=' col-md-2 d-flex justify-content-end col-6'>
    <img src={icon} className=' icon-width  p-0'/>
    </div>
    
    
    
    </div>
    <div className="d-flex justify-content-center align-items-center mt-3">
    <BarChart progress={progress}/>

    </div>

    <h4 className=" text-white text-center py-3" dir="rtl" style={{fontSize:"21px"}}><span>{((data?.userInfo?.subscription_details.word_count) -( data?.userInfo?.subscription_details.remaining_word_count))}</span> / {
      (data?.userInfo?.subscription_details.plan.en === "Premium" || userSubscriptionPlan === "الاحترافية" || userSubscriptionPlanEn === "Premium") ? 
      <span className="pe-1"><FaInfinity /></span> :
      <span className="pe-1">{data?.userInfo?.subscription_details.word_count}</span>
     } <span className="px-2">كلمة</span> </h4>
    <div className=" d-flex justify-content-center">
    
    <button  className=" py-2 rounded-3    px-5 text-white bg-transparent fw-medium" onClick={()=> navigate("/myplan")} style={{border:"2px solid#FFFF"}}>ترقية</button>
    </div>

</div>
</div>

</div>
</div>



              <div
                className="control-table  p-3  ps-md-0 font-basic   rounded-4 "
                dir="rtl"
              >
                <h5 className="pb-3 ps-2 mt-4"> آخر الأنشطة</h5>

                <div className="table-con p-4">
                  <div className="table-head">
                    <p>عرض</p>
                    <div className=" d-flex align-items-center ">
                      <Select
                        value={value}
                        onChange={handleChange}
                        className="font-number  font-basic rounded-2 d-inline-block"
                        sx={{ height: "50px" }} // Adjust the padding value as needed
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>

                      <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="form-control d-inline-block outline-0 me-3 rounded-2 search-input"
                        placeholder="بحث"
                      />
                    </div>
                  </div>
                  <div>
                    <TableC
                      datatable={data?.userActivities}
                      loading={loading}
                      handleDeleteUpdate={handleDeleteUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default React.memo(Control);
