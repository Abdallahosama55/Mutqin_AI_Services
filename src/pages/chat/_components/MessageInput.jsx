import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { PiPaperPlaneRightFill, PiMicrophoneFill } from "react-icons/pi";
import PropTypes from "prop-types";

const Message = styled.textarea`
    padding-left: 38px;
    padding-right: 38px;
    font-size: 14px;
    resize: none;
    line-height: 16px;
    margin-top: 1px;
    overflow-y: scroll !important;
    width: 100%;
    border-radius: 8px;
    border: 1px solid rgba(0, 27, 121, 0.2);
    display: flex; /* Added to enable flex properties */
    align-items: center; /* Center vertically */

    &::placeholder {
        padding-top: 6px;
        font-size: 12px;
        color: rgba(105, 43, 239, 0.4);
    }

    &:focus {
        outline: none;
        border-color: rgba(0, 27, 121, 0.2);
        box-shadow: 0 0 3px rgba(0, 27, 121, 0.5); /* Blue shadow */
    }
`;

const MessageForm = styled(Form)`
    padding: 8px;
    border-radius: 8px;
    width: 100%;
    border: 1px solid rgba(0, 27, 121, 0.2);
`;

const MessageBtn = styled.button`
    color: #5225CE;
    border: none;
    padding: 5px 10px;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &.start-0 {
        left: 0;
    }

    &.end-0 {
        right: 0;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'ar-SA';

function MessageInput({ onSubmit, isDisabled }) {
    const [message, setMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isMicActive, setIsMicActive] = useState(false);
    const messageRef = useRef(null);

    useEffect(() => {
        handleListen();
    }, [isListening]);

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.style.height = 'auto';
            messageRef.current.style.height = `${Math.min(messageRef.current.scrollHeight, 150)}px`;
        }
    }, [message]);

    const handleListen = () => {
        if (isListening && !isMicActive) {
            mic.start();
            setIsMicActive(true);
            mic.onend = () => {
                console.log('continue..');
                mic.start();
                setIsMicActive(true);
            };
        } else if (!isListening && isMicActive) {
            mic.stop();
            setIsMicActive(false);
            mic.onend = () => {
                console.log('Stopped Mic on Click');
                setIsMicActive(false);
            };
        }

        mic.onstart = () => {
            console.log('Mics on');
            setIsMicActive(true);
        };

        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            console.log(transcript);
            setMessage(transcript);
            mic.onerror = event => {
                console.log(event.error);
            };
        };
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message || isDisabled) return;
        onSubmit(message);
        setMessage('');
    };

    return (
        <MessageForm dir={'rtl'} onSubmit={handleSubmit}>
            <div className={'position-relative d-flex align-items-center justify-content-center'}>
                <Message
                    ref={messageRef}
                    placeholder="أكتب رسالة لمتقن شات..."
                    value={message}

                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress} // Handle Enter key press
                    disabled={isDisabled}
                />
                <MessageBtn type={'submit'} variant={''} className={'position-absolute start-0 color-main'} disabled={isDisabled}>
                    <PiPaperPlaneRightFill style={{ transform: "scaleX(-1)" }} />
                </MessageBtn>
                <MessageBtn type={'button'} variant={''} className={'position-absolute end-0 color-main'} disabled={isDisabled} onClick={() => setIsListening(prevState => !prevState)}>
                    {isListening ? <PiMicrophoneFill style={{ color: "red" }} /> : <PiMicrophoneFill />}
                </MessageBtn>
            </div>
        </MessageForm>
    );
}

MessageInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool
};

export default MessageInput;
