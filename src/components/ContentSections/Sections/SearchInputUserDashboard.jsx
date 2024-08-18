import React, { useState, useEffect } from 'react';
import styles from "../main.module.css";
import { IoSearchSharp } from "react-icons/io5";
import { setSearch } from "@/redux/slices/contentSections/contentSectionsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const placeholders = [
  "أفكار المقالات",
  "وصف  مقالات",
  " منشورات فيسبوك",
  "  وصف فيديو يوتيوب ",
  " افكار إعلانية",
];

export default function SearchInputUserDashboard(props) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const search = useSelector((state) => state.contentSections.search);
  const searchResult =useSelector((state) => state.contentSections.searchResult)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <form
      className="h-100 py-md-2 p-1 d-flex mx-3 m-0 align-items-center"
      style={{ position: "relative" }}
      {...props}
    >
      <input
        id="searchInp"
        type="text"
        placeholder={placeholders[placeholderIndex]}
        className="col-md-9 col-6 py-1 border-0"
        value={searchResult||search}
        style={{
          textAlign: "start",
          color: "#001A78",
          height: "100%",
          outline: "none",
        }}
        onChange={(event) =>
          dispatch(setSearch({ text: event.target.value }))
          
        }
      />
      <button
        type="submit"
        className="position-absolute start-0 z-0 btn-move-search py-1 rounded-3 text-white me-md-4 px-4 px-md-5"
        onClick={() => navigate('/content-section')}
        style={{ marginLeft: "35px" }}
      >
        بحث
      </button>
    </form>
  );
}
