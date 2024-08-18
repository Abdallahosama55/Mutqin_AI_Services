import React, { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import styles from './main.module.css';
import './mui.css';

export default function Language({ setSelectedValue }) {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const allChoose = [
        { name: "أختيار الأول", code: "1" },
        { name: "اختيار الثاني", code: "2" },
        { name: "احتيار الثالث", code: "3" },
        { name: "اختيار الرابع", code: "4" },
    ];

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedLanguage(value);
        setSelectedValue(value);
    };

    return (
        <div className={`${styles["input-container"]} mt-4`}>
            <Select
                value={selectedLanguage}
                onChange={handleChange}
                displayEmpty
                className={`${styles["form-select"]} ${styles["input"]}`}
                name="language"
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                    if (selected === "") {
                        return <span>اختر طريقة التحسين</span>;
                    }
                    return allChoose.find(lang => lang.code === selected)?.name;
                }}
            >
                {allChoose.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        value={lang.code}
                        className={`${styles["select-item"]}`}
                    >
                        {lang.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}
