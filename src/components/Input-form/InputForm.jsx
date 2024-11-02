import React, { useRef, useEffect, useState } from 'react';
import { Logo } from '../../assets/icons';
import VideoDown from '../video-download-page/VideoDown';
import { ApiService } from '../../api.service'; // Import ApiService

const InputForm = ({ activeIndex }) => {
    const buttonRef = useRef(null);
    const [data, setData] = useState([]);
    const [activeVideodetail, setActiveVideodetail] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

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

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        const url = inputValue.trim(); // Get the input value
        if (!url) {
            alert('Please enter a valid URL!'); // Check for empty input
            return;
        }

        setLoading(true); // Start loading
        ApiService.fetching(url)
          .then(response => {

            setData(response);
            setActiveVideodetail(true); // Show VideoDown component
          })
          .catch(error => {

            setLoading(false); // Stop loading on error
          });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleButtonClick(); // Call the button click handler on Enter
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
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
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
            {loading && <div>Loading...</div>} {/* Loading indicator */}
            <VideoDown activeIndex={activeIndex} activeVideodetail={activeVideodetail} data={data} />
        </>
    );
};

export default InputForm;
