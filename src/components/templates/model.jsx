import {useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal, Stack} from "react-bootstrap";
import styled from "styled-components";

const ModalContainer = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    //background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
`
const ModalView = styled.div`
    z-index: 1000;
    position: relative;
    padding: 20px;
    border: none;
    
    &>h4 {
        color: #5225CE;
    }
    
    &>p {
        color: rgba(0, 27, 121,0.6);
        font-weight: 400;
    }
    
    &>button {
        background-color: #6f42c1;
    }
`
export default function Model({trigger, onSubmit}) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div onClick={() => setShow(true)}>
                {trigger}
            </div>

            <ModalContainer
                dir={'rtl'}
                show={show}
                aria-labelledby="modal-1-label"
                onHide={() => setShow(false)}
                // backdrop={false}
                centered={true}
                contentClassName={'border-none z-high'}
                backdropClassName={'bg-black  z-low'}
            >
                <ModalView>
                    <h4 id="modal-1-label">حذف المحادثة</h4>
                    <p>هل أنت متأكد أنك تريد حذف هذه المحادثة  نهائيًا؟</p>
                    <Stack gap={3} direction={'horizontal'}>
                        <Button
                            variant={'primary'}
                            onClick={() => {
                                onSubmit()
                                setShow(false)
                            }}
                        >
                            تأكيد
                        </Button>
                        <Button
                            onClick={() => setShow(false)}
                            variant={'outline-secondary'}
                        >
                            إلغاء
                        </Button>
                    </Stack>
                </ModalView>
            </ModalContainer>
        </div>
    );
}