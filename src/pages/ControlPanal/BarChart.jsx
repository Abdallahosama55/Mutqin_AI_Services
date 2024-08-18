import React, { useState } from 'react';

const DynamicRing = (props) => {
  const intial=Math.round(props.progress)
  const [percentage, setPercentage] = useState(intial); // Initial percentage



  const ringStyle = {
    borderRadius: '50%',
    backgroundImage: `conic-gradient(#692BEF ${percentage}%,#692bef55 ${percentage}%)`,
    width: "120px",
    height: "120px"
  };

  return (
    <div className='bg-white rounded-circle p-2'>
      <div className='ring rounded-circle p-2 bg-white d-flex justify-content-center align-items-center' style={ringStyle}>
        <div className='fs-2 fw-bold d-flex justify-content-center align-items-center border h-100 border-1 rounded-circle bg-white w-100'>
          {percentage} %
        </div>
      </div>
  
    </div>
  );
};

export default DynamicRing;
