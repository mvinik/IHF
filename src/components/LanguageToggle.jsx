import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl,MenuItem,InputLabel,Select, } from '@mui/material';
const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    window.location.reload(); // Optional if you want to hard reload to reflect content changes
  };

  return (
    <div className="flex gap-2 text-white text-sm">
      <button onClick={() => changeLanguage('en')}>EN</button> |
      <button onClick={() => changeLanguage('hi')}>HI</button>
    </div>
  );
};

export default LanguageToggle;

{/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Language</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}></MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl> */}