import React, { useRef, useEffect, useState } from 'react';
import { Logo } from '../../assets/icons';
import VideoDown from '../video-download-page/VideoDown';

const InputForm = ({ activeIndex }) => {
    const buttonRef = useRef(null);
    const [activeVideodetail, setActiveVideodetail] = useState(false); // Fixed typo
    const [inputValue, setInputValue] = useState(''); // State for input value

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
        // Clean up event listener on unmount
        return () => {
            if (button) {
                button.removeEventListener('click', animateButton);
            }
        };
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update state on input change
    };

    const handleButtonClick = () => {
        console.log('Input Value:', inputValue); // Optional: logging input value
        setActiveVideodetail(true); // Show the VideoDown component
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleButtonClick(); // Call the button click handler on Enter
        }
    };
    const data = {
        "imageUrl": "https://i.ytimg.com/vi/YLslsZuEaNE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGE0gZSg6MA8=&rs=AOn4CLDMwoPwNUdSAgc0nX1-pkx4O0HxHg",
        "downloadLinks": [
          {
            "resolution": "640 * 360",
            "link": "https://redirector.googlevideo.com/videoplayback?expire=1730424226&ei=QtkjZ-THAb6TsfIPnarX4QY&ip=209.141.44.95&id=o-AJDXlYmdHku6FUVVKPh7a7ItKRKgWO6O09ZCdMk0GFNl&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1730402626%2C&mh=FH&mm=31%2C26&mn=sn-a5msenek%2Csn-q4flrnss&ms=au%2Conr&mv=m&mvi=2&pl=19&rms=au%2Cau&initcwndbps=783750&siu=1&bui=AQn3pFTuH7NzD1l3iiFI3jTKx6rAYymRG2NT_cIF9FRJINNKnd3HGBewmVb_reb91dMjIqpPYw&spc=qtApASgja1ATMQTrGV3ReGKLaSrcDXnSYfviksWyJhnhANBvSXRjy18THd8zjACf9GfXeprhckSd&vprv=1&svpuc=1&mime=video%2Fmp4&ns=L3o-debriLAHjFkufhw-gqQQ&rqh=1&cnr=14&ratebypass=yes&dur=60.093&lmt=1724605959653101&mt=1730402235&fvip=2&fexp=51312688%2C51326932%2C51331021&c=WEB&sefc=1&txp=5430434&n=xIDOzOvhhtwdkA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhANsoEFLgCj9NXOaedc9AKzpWxVxtQ9_aHP2knNMP1FjNAiATCVAXtf8BBylf11qrpRo4Tz2vJ-WAF_o7uUFCEyzUNw%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACJ0pHgwRgIhAJiYxsn46kYBdtrqRCXpmqRvn9TSijxeYWNXLSIX5LNpAiEAqyUtTgPX2cSpNuJ0Gq-FGCh5m_q2AwiG7_oLGg-6Zi4%3D&pot=MltEsCRMkohqN0SI3CnArB9QzVjclHudkYV9SN1880uePdkGTJr5krYOFqbALsireKxlCTpOQL9Jff09O7_a8G9nUmVx79hz6pE7CPAa3MGaFDxo1-DfnWb0O6Sl&range=0-"
          },
                  ]
      }

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
                    value={inputValue} // Bind input value to state
                    onChange={handleInputChange} // Update state on change
                    onKeyPress={handleKeyPress} // Handle Enter key press
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
                    onClick={handleButtonClick} // Call handleButtonClick on click
                >
                    <Logo color="#fff" /> Download
                </button>
            </div>
            <VideoDown activeIndex={activeIndex} activeVideodetail={activeVideodetail} data={data} /> {/* Pass inputValue if needed */}
        </>
    );
};

export default InputForm;
