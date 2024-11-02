import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const Image = styled('img')({
  width: '100%',
});

const VideoDown = ({ activeIndex, activeVideodetail, data, loading ,handleinputFocus}) => {
    const [selectedQuality, setSelectedQuality] = useState('default');
    const selectRef = useRef();

  
    document.title = data.title
    

    useEffect(() => {
        setSelectedQuality('default');
    }, [data]);

    const truncateTitle = (title = '', maxLength = 30) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText("DevLink web: " + text).then(() => {
            // You can add some feedback here if needed
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const handleDownload = () => {
        const selectedLink = data.medias && data.medias.find(link => link.quality === selectedQuality);

        if (selectedLink) {
            const link = document.createElement('a');
            link.target = '_blank';
            link.href = selectedLink.url;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Please select a valid quality option.');
        }
    };



    const DEFAULT_IMAGE_URL = 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'; // O'rnini bosuvchi rasm URL'si

    return (
        <div className='VideoDown' style={{ height: activeVideodetail ? '600px' : '0', overflow: 'hidden' }}>
            <div className='video'>
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={200} />
                ) : (
                    <a href={data.url}>
                        <img 
                            src={data.thumbnail || DEFAULT_IMAGE_URL} 
                            alt="Video thumbnail" 
                            onError={(e) => { e.target.src = DEFAULT_IMAGE_URL; }} // Rasm yuklanmasa o'rnini bosuvchi rasm
                        />
                    </a>
                )}
                <div className="video-info">
                    {loading ? (
                        <Skeleton width="80%" height={30} />
                    ) : (
                        <h2 className="video-title" onClick={() => copyToClipboard(data.title)}>
                            {truncateTitle(data.title, 30)} 
                        </h2>
                    )}
                    {loading ? (
                        <Skeleton width="40%" height={20} />
                    ) : (
                        <p className="video-author">Author: {data.author || 'Unknown'}</p>
                    )}
                    {loading ? (
                        <Skeleton width="20%" height={20} />
                    ) : (
                        <p className="video-duration">Duration: {data.duration || '0'} seconds</p>
                    )}
                </div>
            </div>
            <div className="wrapper">
                {data.medias && data.medias.length > 0 && (
                    <div className="custom-select">
                        <select
                            ref={selectRef}
                            value={selectedQuality}
                            onChange={(e) => setSelectedQuality(e.target.value)}
                        >
                            <option value="default" disabled>Sifat tanlang</option>
                            {data.medias.map((item, index) => (
                                <option key={index} value={item.quality}>mp4 ({item.quality})</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="download-btns">
                    <button onClick={handleDownload} disabled={selectedQuality === 'default'}>
                        Download
                    </button>
                    <button onClick={handleinputFocus}>Reset</button>
                </div>
            </div>
        </div>
    );
};

VideoDown.propTypes = {
    activeIndex: PropTypes.number,
    activeVideodetail: PropTypes.bool,
    data: PropTypes.object,
    loading: PropTypes.bool,
};

export default VideoDown;
