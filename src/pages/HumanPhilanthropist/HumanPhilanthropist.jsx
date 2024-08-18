import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './HumanPhilanthropist.css';
import human from '../../assets/Images/HumanPhilanthropist/man.png';
import uploadicon from '../../assets/Images/HumanPhilanthropist/Group.png';
import getcontenticon from '../../assets/Images/HumanPhilanthropist/Retrieve.png';
import Language from '../../components/atoms/SelectHuman/Language';
import { Spinner } from 'react-bootstrap';
import EditorPanel from '../../elements/EditorPanel';
import { Box } from '@mui/material';
import EditorPanelHumanphilanthropist from '../../elements/EditorPanelHumansphilanthropist';
import ReformulatePanel from '../../components/organisms/Reformulate/ReformulatePanel'
import LinkModal from '../../components/molecules/LinkModal';

function HumanPhilanthropist() {
    const [isLoading, setIsLoading] = useState(false);
const [openModal, setOpenModal] = useState(false);
    const items = [
        'أدخل النص الذي تريد تحسينه.',
        'اختر ما إذا كان يجب أن يكون المحتوى مبتكر أو فقط إجراء بعض التغييرات على النص الأصلي.',
        'انقر فوق "تحسين" للحصول على محتوى محسن.',
    ];

    return (
        <div className='HumanPhilanthropistPage mx-md-0 mx-2' dir='rtl'>
            <div className='row mb-3 mx-1 bg-vector rounded-3 HumanPhilanthropist ' style={{width:"99.3%"}}>
                <div className='py-4 col-md-8 px-4 text-white'>
                    <h4 className='fw-bold'>حسن جودة المحتوى الخاص بك باستخدام المُحسّن البشري بمتقن</h4>
                    <p className="pt-2 pb-0 fw-medium">
                        مع مُحسِّن المحتوى بمتقن، أصبح جعل المحتوى الخاص بك أكثر جاذبية وتأثيرًا أمرًا سهلاً وسريعًا:
                    </p>
                    <ul className='text-white px-3 fw-medium'>
                        {items.map((item, index) => (
                            <li key={index} className='py-1'>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className='bg-vectorlight col-md-4 d-flex justify-content-center align-items-center'>
                    <img src={human} width={220} height={220} />
                </div>
            </div>

            <div className='row me-1 gap-3' dir='rtl'>
                <div className='px-4 col-md-5 col-12 bg-white rounded-2'>
                    <h5 className='py-4 pb-1 fw-semibold' style={{color:"#1B223C"}}>ادخل المحتوي</h5>
                    <div>
                        <Formik
                            initialValues={{ content: '', file: null, selectedValue: '' }}
                            onSubmit={(values) => {
                                setIsLoading(true);
                                console.log('Content:', values.content);
                                console.log('Selected Language:', values.selectedValue);
                                console.log('File:', values.file);
                                setTimeout(() => {
                                    setIsLoading(false);
                                }, 2000); // Simulating a loading delay
                            }}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                    <Field
                                        as="textarea"
                                        name="content"
                                        className='input-text-area-human rounded-2 fw-medium p-3'
                                        style={{ height: '200px' }}
                                        placeholder="ادخل المحتوي هنا"
                                    />
                                    <div className='row justify-content-center align-items-center px-2 mt-3 gap-3 fw-medium' style={{color:"#1B223C"}}>
                                        <div className='border-blue-btn-human mx-1 rounded-2 col-md col-12'>
                                            <input
                                                type="file"
                                                id="upload-file"
                                                className="d-none"
                                                onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
                                            />
                                            <label htmlFor="upload-file" className='py-2 row'>
                                                <div className='col-md-6'>رفع ملف</div>
                                                <div className='col-md-6  d-flex justify-content-end'>
                                                    <img src={uploadicon} className='bg-white' width={25} />
                                                </div>
                                            </label>
                                        </div>
                                        <div className='border-blue-btn-human mx-1 rounded-2 col-md col-12'>
                                            <div
                                             
                                            />
                                            <label htmlFor="retrieve-file" className='py-2 row'   onClick={()=>setOpenModal(true)}>
                                                <div className='col-md-9'><span>إسترداد المحتوى</span></div>
                                                <div className='col-md-3 d-flex justify-content-end'>
                                                    <img src={getcontenticon} className='bg-white' width={25} />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <Language setSelectedValue={(value) => setFieldValue('selectedValue', value)} />
                                    <div className='w-100 d-flex justify-content-center'>
                                    <button
                                    type="submit"
                                    className='my-4 mb-4 text-white btn-blue-human'
                                    disabled={!values.content || isLoading}
                                >
                                    {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : 'تحسين'}
                                </button>
                                
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className='col-md col-12  bg-white ms-3  rounded-2'>
            <EditorPanelHumanphilanthropist/>
              
                </div>
                <LinkModal
                onClose={() => {
                  setOpenModal(false);
                  // setOpenPop(false);
                }}
                // show={openPop}
                show={openModal}
                />


            
            </div>
        </div>
    );
}

export default HumanPhilanthropist;
