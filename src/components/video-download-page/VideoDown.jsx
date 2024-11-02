import React, { useEffect, useRef, useState } from 'react';

const VideoDown = ({ activeIndex, activeVideodetail, data }) => {
    const [selectedQuality, setSelectedQuality] = useState('default');
    const selectRef = useRef();

    console.log(data); // data obyektini konsolda tekshirish
    
    useEffect(() => {
        setSelectedQuality("default");
    }, []);

    const handleDownload = () => {
        // `downloadLinks` arrayni mavjudligini tekshirish
        const selectedLink = data.downloadLinks && data.downloadLinks.find(link => link.resolution === selectedQuality);
        
        if (selectedLink) {
            const link = document.createElement('a');
            link.href = selectedLink.link;
            link.download = ''; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Please select a valid quality option.');
        }
    };

    const handleReset = () => {
        setSelectedQuality('default');
        if (selectRef.current) {
            selectRef.current.value = 'default';
        }
    };

    return (
        <div className='VideoDown' style={{ height: activeVideodetail ? '400px' : '0', overflow: 'hidden' }}>
            {/* Thumbnail rasmni ko‘rsatish */}
            {data.thumbnail && <img src={data.thumbnail} alt="Video thumbnail" />}
            {/* Agar downloadLinks mavjud bo‘lsa, tanlash ro‘yxatini ko‘rsatish */}
            {data.downloadLinks && data.downloadLinks.length > 0 && (
                <div className="custom-select">
                    <select 
                        ref={selectRef} 
                        value={selectedQuality} 
                        onChange={(e) => setSelectedQuality(e.target.value)}
                    >
                        <option value="default">Default</option>
                        {data.downloadLinks.map((item, index) => (
                            <option key={index} value={item.resolution}>mp4 ({item.resolution})</option>
                        ))}
                    </select>
                </div>
            )}

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
