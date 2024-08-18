import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: 'Tajawal, sans-serif',
    color:"#A2A3A5"
  },
});


export default function Formatting({currentWeekUsage,lastWeekUsage}) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Days of the week

const Currentweek = currentWeekUsage ||[0,0,0,0,0,0,0]; // Your France GDP data

const Lastweek =lastWeekUsage ||[0,0,0,0,0,0,0]; // Your Germany GDP data

const lineChartsParams = {
  series: [
    {
      label: ' الاسبوع الماضي  ',
      data: Lastweek,
      showMark: false,
      color: '#ECE9F1', // Set the color for France GDP line
  

    },
    {
      label: '  الاسبوع الحالي ',
      data: Currentweek,
      showMark: false,
      color: '#692BEF', // Set the color for France GDP line
     
    },
  
  ],

  height: 300, // Initial height

};
const dayFormatter = (index) => days[index % 7]; // Format index as day of the week
const currencyFormatter = new Intl.NumberFormat('en-US', {}).format;

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const chartWidth = isSmallScreen ? 370 : 800; // Set the width based on the media query

  const lineChartsParamsWithWidth = {
    ...lineChartsParams,
   
  };
  const options = {
    scales: {
      y: {
        ticks: {
          font: {
            family: 'sans-serif', // Use Tajawal for numbers
          },
          
        },
      },
      x: {
        ticks: {
          font: {
            family: 'sans-serif', // Use Tajawal for numbers
          },
          color: '#ccc', // Set the color of the labels to gray
        },
  
      },
    },
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <div className="shadow-sm  bg-white rounded-3  px-3 ">
<div className=' row  py-3 justify-content-center align-items-center' dir="rtl">
<div className=' col-md-7 px-4 fw-bold'>
إحصائيات المستخدم

</div>

<div className=' mt-md-auto mt-3 me-3 mx-md-auto col-md-5'>
<div className=' row align-items-center justify-content-center'>
<div className=' col-4 border border-1 rounded-2 py-1 chart-label text-center ' >
الأسبوع الحالي

</div>
<div className=' col-4  bg  chart-label  text-center' style={{color:"#D0D1D2"}}>
الأسبوع السابق

</div>

<div className=' col-4'>
<div className=' py-1  line-label ms-3 rounded-4'></div>

</div>

</div>

</div>

</div>
        <LineChart
          {...lineChartsParamsWithWidth}
          options={options}
          sx={{padding:0}}
          xAxis={[
            {
              data: Array.from({ length: Currentweek.length }, (_, i) => i),
              scaleType: 'point',
              valueFormatter: dayFormatter,
            },
          ]}
          series={lineChartsParamsWithWidth.series.map((s) => ({
            ...s,
            valueFormatter: currencyFormatter,
          }))}
          grid={{ vertical: true, horizontal: true }}
        />
      </div>
    </ThemeProvider>
  );
}
