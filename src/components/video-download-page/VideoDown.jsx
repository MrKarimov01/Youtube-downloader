import React, { useEffect, useRef, useState } from 'react';

const VideoDown = ({ activeIndex,activeVideodetail,data }) => {
    const [selectedQuality, setSelectedQuality] = useState('default');
    const selectRef = useRef();

    
  
    
      useEffect(()=>{setSelectedQuality("default")},[])
    const handleDownload = () => {
        const selectedLink = data.downloadLinks.find(link => link.resolution === selectedQuality);
        
        if (selectedLink) {
            const link = document.createElement('a');
            link.href = selectedLink.link; // Use the 'link' property for the URL
            link.download = ''; // Set to an empty string to use the filename from the URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up the DOM
        } else {
            alert('Please select a valid quality option.');
        }
    };

    const handleReset = () => {
        setSelectedQuality('default');
        selectRef.current.value = 'default'; // Reset the select element
    };

    return (
        <div className='VideoDown' style={{ height: activeVideodetail ? '400px' : '0' }}
>
            <img src={data.imageUrl} alt="" />
            <div className="custom-select">
                <select 
                    ref={selectRef} 
                    value={selectedQuality} 
                    onChange={(e) => setSelectedQuality(e.target.value)}
                >
                    <option value="default">Default</option>
                    {data.downloadLinks.map(item=>{
                        return(
                            <option value={item.resolution}>mp4 ({item.resolution})</option>
                        )
                    })}
                    {/* You can add more quality options here */}
                </select>
            </div>

            <div className="download-btns">
                <button onClick={handleDownload} disabled={selectedQuality === "default"}>
                    Download
                </button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default VideoDown;
