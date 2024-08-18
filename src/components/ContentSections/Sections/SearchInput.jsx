import React, { useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { setSearch } from '@/redux/slices/contentSections/contentSectionsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../main.module.css';
import { setSearchResult } from '../../../redux/slices/contentSections/contentSectionsSlice';
import { Button } from 'react-bootstrap';

export default function SearchInput(props) {
  const searchResult =useSelector((state) => state.contentSections.searchResult)
  const search = useSelector((state) => state.contentSections.search);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setSearch({ text: event.target.value }));
  };

 
  return (
    <div className="row   shadow-lg bg-white  p-0 w-100  justify-content-between m-0 align-items-center" style={{ position: 'relative'}} {...props}>
      <div style={{ position: 'absolute' }}>
        <input
          id="searchInp"
          type="text"
          placeholder="إبحث في أكثر من 80 نوعًا من نماذج المحتوى في ثوانٍ باستخدام مُتقِن "
          className={`  py-2  rounded-3 col-11 shadow  `}
          value={searchResult||search}
          style={{ paddingRight: '15px', fontSize:"16px",color: 'rgba(0, 26, 120, 0.1)', height: '47px',  border:"1px solid rgba(105, 43, 239, 1) " }}
          onChange={handleChange}
        />

      </div>
      <Button
      htmlFor="searchInp"
      className="custom-button-search text-white start-0 z-3 position-absolute ms-md-5"
      style={{ cursor: 'text', backgroundColor: '#692BEF', height: '47px' }}
    >
      إبحث الأن
    </Button>
    </div>
  );
}
