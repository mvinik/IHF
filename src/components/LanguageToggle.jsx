
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { FormControl,MenuItem,InputLabel,Select, } from '@mui/material';
// const LanguageToggle = () => {
//   const { i18n } = useTranslation();


//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem('language', lng);
//     window.location.reload(); // Optional if you want to hard reload to reflect content changes
//   };

//   return (
//     <div className="flex gap-2 text-white text-sm">
//       <button onClick={() => changeLanguage('en')}>EN</button> |
//       <button onClick={() => changeLanguage('hi')}>HI</button>
//     </div>
//   );
// };

// export default LanguageToggle;

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

// export default function LanguageToggle(){
//   const {locale,changeLanguage}=useContext(LanguageContext)
//   return(
//     <select value={locale}
//     onChange={(e) => changeLanguage(e.target.value)}>
//       <option value="en">English</option>
//       <option value="hi">Hindi</option>

//     </select>
//   )

// }






// export default function LanguageToggle(){
//   const {locale,changeLanguage}=useContext(LanguageContext)

//   return (
//     <div>
     
//       <FormControl sx={{ m: 1, minWidth: 60 ,color:"white"}}>
//         <Select
//          value={locale}
//     onChange={(e) => changeLanguage(e.target.value)}
//           displayEmpty
//           inputProps={{ 'aria-label': 'Without label' }}
//         >
         
//           <MenuItem value="en">English</MenuItem>
//           <MenuItem value="hi">Hindi</MenuItem>
       
//         </Select>
        
//       </FormControl>
    // </div>
  // );
// }


export default function LanguageToggle() {
  const { locale, changeLanguage } = useContext(LanguageContext);

  return (
    <FormControl sx={{ m: 1, minWidth: 60 }}>
      <Select
        value={locale}
        onChange={(e) => changeLanguage(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          color: 'white',
          '& .MuiSvgIcon-root': { color: 'white' }, // dropdown arrow
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        }}
      >
        <MenuItem value="en" sx={{ color: 'black' }}>English</MenuItem>
        <MenuItem value="hi" sx={{ color: 'black' }}>Hindi</MenuItem>
      </Select>
    </FormControl>
  );
}
