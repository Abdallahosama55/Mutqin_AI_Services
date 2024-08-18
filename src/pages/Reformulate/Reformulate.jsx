//Modules
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
//Files
import ReformulatePanel from "@/components/organisms/Reformulate/ReformulatePanel";
import {
  fetchData,
  getuniqeId,
  postRephrase,
  removeRephraseData,
} from "../../redux/slices/apiSlice";
import { setContent, setText } from "@/redux/features/api/apiSlice";
//Css
import "./Reformulate.css";
//Images
import pin from "@/assets/Images/reformulate/shape.png";
import file from "@/assets/Images/reformulate/fluent_textbox-16-regular.png";
import uploadImage from "@/assets/Images/reformulate/Frame 1171276471.png";
import { useParams, useSearchParams } from "react-router-dom";
import { allLanguages } from "../../Util/Create-article/constants";

const Reformulate = () => {
  //Editor Content
  const [editorData, setEditorData] = useState(null);
  const rephraseDispatch = useDispatch();
  const { loading } = useSelector((state) => state.api.rephrasePost);

  //ProgressBar
  const [bar, setbar] = useState(0);

  //Lang. DropList
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState({ name: "العربية", code: "ar" });
  const dispatch = useDispatch();
  // const { id } = useSelector((state) => state.api.rephrasePost);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef(null);
  const toggleList = () => setIsOpen(!isOpen);
  const [getParaphraseLoading, setGetParaphraseLoading] = useState(false);
  const [getParaphraseData, setGetParaphraseData] = useState(null);
  // useEffect(() => {
  //   const id = crypto.randomUUID();
  //   dispatch(getuniqeId(id));
  // }, []);

  //Close Lang. DropList
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const onEditorUpdate = (editor) => setEditorData(editor);

  // It only runs if the editor switches from blank

  //Generate Rephrase
  const handleRephrase = async () => {
    //Check Content
    if (editorData && editorData?.getText?.()) {
      // if (!editorData.getText()) return toast.error("لا يوجد محتوي لصياغته");
      if (searchParams.get("new")) {
        searchParams.delete("new");
        setSearchParams(searchParams, {
          replace: true,
        });
      }
      setbar(Math.floor(Math.random() * (5 - 1 + 1)) + 1);

      //Generate Id
      try {
        setbar(Math.floor(Math.random() * (25 - 15 + 1)) + 15);

        //When transform to ID change it !

        await rephraseDispatch(
          postRephrase({
            endpoint: `v1/text-rephrase/create/${params.id}/`,
            data: editorData.getHTML(),
            language: lang.code,
            setbar,
          })
        );
        setbar(100);
      } catch (error) {
        setbar(0);
      }
    } else return toast.error("لا يوجد محتوي لصياغته");
  };

  useEffect(() => {
    if (params.id && !searchParams.get("new")) {
      setGetParaphraseLoading(true);
      dispatch(fetchData({ endpoint: `v1/text-rephrase/texts/${params.id}/` }))
        .unwrap()
        .then((data) => {
          setGetParaphraseData(data);
        })
        .catch((err) => toast.error("حدث خطأ أثناء محاولة جلب البيانات"))
        .finally(() => {
          setGetParaphraseLoading(false);
        });
    }
  }, [params.id]);

  useEffect(() => () => dispatch(removeRephraseData()), []);

  return (
    <div className=" flex-grow-1  bg-white rounded-3 mx-2 mx-md-0   " dir="rtl">
      <div
        // style={{ height: "88vh" }}
        className="row  container-page-refomulate  "
      >
        {/* First  Editor*/}

        <div className=" col-12  col-xl-6 px-2 pt-3 bg-white   p-0 ">
          {" "}
          {/* header */}
          <div className=" h-100   contianer-editor pt-3    p-0" >
            <div className="px-3 pb-3  d-flex justify-content-between align-items-center" style={{height:"35px"}}>
              <div
                ref={dropdownRef}
                className=" d-flex gap-3 align-items-center"
              >
                <button onClick={handleRephrase} className="generat-button">
                  {loading ? "جاري الصياغة..." : "إعادة الصياغة"}
                </button>
                <button
                  className="position-relative droplist-lang"
                  onClick={toggleList}
                >
                  {lang.name}
                  {isOpen && (
                    <div className="position-absolute droplist-lang-lang">
                      {allLanguages.map((language) => (
                        <div
                          key={language.code}
                          onClick={() => setLang(language)}
                          className={`lang ${
                            language.code === lang.code ? "lang-selected" : ""
                          }`}
                        >
                          {language.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <IoIosArrowDown />
                </button>
              </div>
              <div>
                <img src={file} style={{ width: "20px", height: "20px" }} />
              </div>
            </div>

            {/* Editor */}
            <div className="bg-white">
              <ReformulatePanel
                onEditorUpdate={onEditorUpdate}
                setEditorData={setEditorData}
                right={"yes"}
                show_option={true}
                data={getParaphraseData}
                loading={getParaphraseLoading}
              />
            </div>
          </div>
        </div>

        {/* Second Editor */}

        <div className=" col-12 col-xl-6  px-2 pt-3   bg-white mt-2 mt-md-0  p-0 ">
          {" "}
          {/* Header */}
          <div className="   h-100 contianer-editor pt-3    p-0">
            <div className="px-3 pb-3  d-flex justify-content-start align-items-center" style={{height:"35px"}}>
              <div>
                {bar === 0 || bar === 100 ? (
                  <img src={pin} style={{ width: "14px", height: "14px" }} />
                ) : (
                  <img src={uploadImage} style={{ maxWidth: "25px" }} />
                )}
              </div>
              {bar !== 0 && (
                <>
                  {" "}
                  <div className=" progresNumber px-3">
                    {bar < 10 ? `0${bar}` : bar}%
                  </div>
                  <div className=" progressas position-relative">
                    <div
                      className="  progressasbar  position-absolute z-3 h-100 "
                      style={{
                        width: `${bar}%`,
                        backgroundColor: bar === 100 ? "#5cb85c" : "#5225CE",
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Editor */}
            <div>
              <ReformulatePanel
                noGenerate="no"
                data={getParaphraseData}
                loading={getParaphraseLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reformulate;

//Lang. List as  PDF
// const langList = [
//   "العربية",
//   "العامية المصرية",
//   "الإنجليزية",
//   "الفرنسية",
//   "الإسبانية",
//   "الألمانية",
//   "الصينية",
//   "اليابانية",
//   "الكورية",
//   "الروسية",
//   "البرتغالية",
//   "الإيطالية",
//   "التركية",
//   "الهولندية",
//   "السويدية",
//   "الدنماركية",
//   "النرويجية",
//   "الفنلندية",
//   "البولندية",
//   "التشيكية",
//   "المجرية",
//   "الرومانية",
//   "اليونانية",
//   "البلغارية",
//   "الصربية",
//   "الكرواتية",
//   "السلوفينية",
//   "الأوكرانية",
//   "البيلاروسية",
//   "الكازاخية",
//   "الأوزبكية",
//   "التركمانية",
//   "الطاجيكية",
//   "المنغولية",
// ];