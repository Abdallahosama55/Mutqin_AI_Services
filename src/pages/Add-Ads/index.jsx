import React, { useEffect, useState } from "react";
import "./style.css";
import ArrowDownIcon from "@/assets/Images/common/Arrow";
import SearchIcon from "@/assets/Images/common/Search";
import { useParams } from "react-router-dom";
import { allCategories, languages } from "./data";
import EditorPanel from "@/elements/EditorPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTemplate,
  createMutqinAssistant,
  getAllUserTemplate,
} from "@/redux/slices/mutqinAssistantSlice";
import { v4 as uuid } from "uuid";
import { Spinner } from "react-bootstrap";
import { setContent } from "@/redux/api/apiSlice";
function Add_Ads() {
  const { singleTemplate } = useSelector((state) => state.mutqinAssistant);

  const [loading, setLoading] = useState(false);
  let { slug } = useParams();
  const dispatch = useDispatch();
  const selectedCategory = allCategories[slug];
  const [selectedDropdown, setSelectedDropdown] = useState(selectedCategory[0]);
  const [openDropDown, setOpenDropDown] = useState(false);

  // State for language dropdown
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    setSelectedLanguage(
      singleTemplate
        ? languages.find((lng) => {
            return singleTemplate?.language === lng.value;
          })
        : languages[0]
    );

    setSelectedDropdown((prev) => {
      if (singleTemplate) {
        for (const category in allCategories) {
          return allCategories[category].find(
            (item) => item.title === singleTemplate.template
          );
        }
      } else {
        return selectedCategory[0];
      }
    });
  }, [singleTemplate]);

  const [openLanguageDropdown, setOpenLanguageDropdown] = useState(false);

  const [textareaValue, setTextareaValue] = useState(
    selectedLanguage.value === "en"
      ? selectedDropdown?.en_description
      : selectedDropdown?.description
  );

  const handleChange = (event) => {
    setTextareaValue(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllUserTemplate());
  }, []);

  return (
    <div className="container-fluid">
      <div className="section row d-flex flex-column flex-lg-row  min-vh-75 container-fluid mx-auto">
        <div
          className="col-lg-8 pt-0 rounded-3 pt-3 order-2 order-lg-1"
          style={{ border: "1px solid var(--main-border)" }}
        >
          <EditorPanel />
        </div>
        <div className="col-lg-4 p-0 right_side order-1 order-lg-2">
          <div className="search_bar">
            <SearchIcon />
            <input type="text" placeholder="بحث" />
          </div>
          <div className="ads_details sm-w-100">
            <div
              className="ads_product"
              onClick={() => setOpenDropDown(!openDropDown)}
            >
              <p>{selectedDropdown?.title}</p>
              <ArrowDownIcon />
            </div>
            {openDropDown && (
              <>
                <div className="product_option">
                  {selectedCategory.map((item) => (
                    <div
                      key={item.title} // added key for React list rendering
                      className={`ads_product options ${
                        selectedDropdown.title === item.title ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedDropdown(item);
                        setTextareaValue(item.description);
                        setOpenDropDown(false);
                      }}
                    >
                      <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Language Dropdown */}
            <div
              className="ads_product"
              onClick={() => setOpenLanguageDropdown(!openLanguageDropdown)}
            >
              <p>{selectedLanguage.name}</p>
              <ArrowDownIcon />
            </div>
            {openLanguageDropdown && (
              <div className="product_option">
                {languages.map((lng) => (
                  <div
                    key={lng.id + lng.name}
                    className="ads_product options"
                    onClick={() => {
                      setSelectedLanguage(lng);
                      setOpenLanguageDropdown(false);
                      setTextareaValue(
                        lng.value === "en"
                          ? selectedDropdown.en_description
                          : selectedDropdown.description
                      );
                    }}
                  >
                    <p>{lng.name}</p>
                  </div>
                ))}
              </div>
            )}
            <textarea
              className="ads-description"
              value={textareaValue}
              onChange={handleChange}
              style={{
                direction: selectedLanguage.value === "ar" ? "rtl" : "ltr",
              }}
            />
            <button
              className={`btn-create-ads ${loading && "btn-loading"}`}
              onClick={async () => {
                try {
                  setLoading(true);
                  const document_id = uuid();
                  const template_id = uuid();
                  const { payload } = await dispatch(
                    createMutqinAssistant({
                      document_id,
                      template_id,
                      template_name: selectedDropdown.title,
                      question: textareaValue,
                      language: selectedLanguage.value,
                    })
                  );

                  dispatch(setContent(payload.content));
                } catch (error) {
                  console.log(error);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  جاري الانشاء...
                </>
              ) : (
                "انشاء"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_Ads;
