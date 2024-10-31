import React from 'react';
import { Logo } from '../assets/icons.jsx';

const Navbar = ({activeIndex, setActiveIndex}) => {
  

  const handleClick = (index) => {
    setActiveIndex(index);
    sessionStorage.setItem('activeIndex', index);
  };

  return (
    <nav>
      <div className="logo">
        <Logo color={activeIndex === 0 ? '#6E41E2' : activeIndex === 2 ? '#FF5B79' : "#69C9D0"} />
        <span>LinkDownloader</span>
      </div>
      <ul>
        {['Youtube Downloader', 'Tiktok Downloader', 'Instagram Downloader'].map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => handleClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
