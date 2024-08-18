import React from 'react';
import { Form, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function ImageForm(props) {
  return (
    <div>
      <div>
        <Form className='justify-content-center  h-100 pb-5  align-items-center pe-5 ps-5 '>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">مقاس الصورة</Form.Label>
            <Form.Select id="disabledSelect" className='p-md-2 text-center ' dir='rtl'>
              <option>اختر المقاس</option>
              <option>1080*1080</option>
              <option>720*720</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" dir="rtl">
            <Form.Label htmlFor="disabledSelect">عدد النتايج</Form.Label>
            <Form.Select id="disabledSelect" className='p-md-2 text-center '>
              <option>اختر العدد</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" dir="rtl">
            <Form.Label htmlFor="exampleTextarea">اكتب بإيجاز وصف للصورة التي في ذهنك.. - تصميم صورة</Form.Label>
            <Form.Control as="textarea" rows={3} id="exampleTextarea" className=' p-md-2  ' />
          </Form.Group>
<div className=' row justify-content-center align-items-center pb-5 '>
<div className=' col-md-7'>
<Button className='btn-pink' type="btn">
            الصورة المقترحة
          </Button>

</div>

<div className='  text-decoration-underline col-md-5 text-center  '>
<a onClick={props.onSkip}>تخطي هذه الخطوة </a>

</div>
</div>
          
        </Form>
      </div>
    </div>
  );
}

export default ImageForm;