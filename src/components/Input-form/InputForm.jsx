import React, { useRef, useEffect, useState } from 'react';
import { Logo } from '../../assets/icons';
import VideoDown from '../video-download-page/VideoDown';
import { ApiService } from '../../api.service';

const InputForm = ({ activeIndex }) => {
    const buttonRef = useRef(null);
    const inputRef = useRef(null);
    const [data, setData] = useState([]);
    const [activeVideodetail, setActiveVideodetail] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const animateButton = (e) => {
        e.preventDefault();
        e.target.classList.remove('animate');
        e.target.classList.add('animate');

        setTimeout(() => {
            e.target.classList.remove('animate');
        }, 700);
    };

    useEffect(() => {
        const button = buttonRef.current;
        if (button) {
            button.addEventListener('click', animateButton);
        }
        return () => {
            if (button) {
                button.removeEventListener('click', animateButton);
            }
        };
    }, []);

    const handleinputFocus = () => {
        if (inputRef.current) {
            setInputValue('');
            inputRef.current.focus();
        }
        setData([]);
        setActiveVideodetail(false); // Yangi holatda VideoDown komponentini yashiring
        document.title = 'LinkDownloader'; // O'zingizning xohlagan sarlavhangizni kiriting
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const isValidUrl = (url) => {
        const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return pattern.test(url);
    };

    const handleButtonClick = () => {
        const url = inputValue.trim();
        if (!url) {
            alert('Please enter a valid URL!');
            return;
        }

        if (!isValidUrl(url)) {
            alert('Invalid input! Please enter a correct URL.');
            return;
        }

        setLoading(true);
        ApiService.fetching(url)
            .then(response => {
                setData(response);
                setActiveVideodetail(true);
                document.title = response.title; // Sahifa sarlavhasini o'zgartiring
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error fetching data! Please check the URL.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleButtonClick();
        }
    };

    return (
        <>
            <div className="InputForm">
                <input
                    type="text"
                    placeholder={
                        activeIndex === 0
                            ? 'Enter YouTube URL here ....'
                            : activeIndex === 2
                            ? 'Enter Instagram URL here ....'
                            : 'Enter TikTok URL here ....'
                    }
                    maxLength={150}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    ref={inputRef}
                    onFocus={handleinputFocus}
                />
                <button
                    className={activeIndex === 0 ? "bubbly-buttonYt" : activeIndex === 2 ? "bubbly-buttonIn" : "bubbly-buttontik"}
                    style={{
                        backgroundColor:
                            activeIndex === 0
                                ? '#6E41E2'
                                : activeIndex === 2
                                ? '#FF5B79'
                                : '#69C9D0',
                    }}
                    ref={buttonRef}
                    onClick={handleButtonClick}
                >
                    <Logo color="#fff" /> Download
                </button>
            </div>
            
            {/* Data mavjud bo'lganda VideoDown komponentini ko'rsatish */}
            {activeVideodetail && (
                <VideoDown 
                    activeIndex={activeIndex} 
                    activeVideodetail={activeVideodetail} 
                    data={data} 
                    loading={loading} 
                    handleinputFocus={handleinputFocus} 
                />
            )}
        </>
    );
};

export default InputForm;
