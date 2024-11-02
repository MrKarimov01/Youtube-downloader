import React from 'react';
import { Logo } from '../assets/icons.jsx';

const Navbar = ({ activeIndex, setActiveIndex }) => {
  const titles = ['Youtube - LinkDownloader', 'Tiktok - LinkDownloader', 'Instagram - LinkDownloader'];
  document.title = titles[activeIndex] || 'Default Title';

  const icons = ['fa-youtube', 'fa-tiktok', 'fa-instagram'];

  const handleClick = () => {
    const nextIndex = (activeIndex + 1) % icons.length; // Loop through indexes 0, 1, 2
    setActiveIndex(nextIndex);
    sessionStorage.setItem('activeIndex', nextIndex);
  };

  return (
    <nav>
      <div className="logo">
        <Logo color={activeIndex === 0 ? '#6E41E2' : activeIndex === 2 ? '#FF5B79' : "#69C9D0"} />
        <span>LinkDownloader</span>
      </div>
      <ul className={activeIndex === 0 ? 'youtube' : activeIndex === 1 ? 'tiktok' : 'instagram'}>
        {['Youtube Downloader', 'Tiktok Downloader', 'Instagram Downloader'].map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <ul className='mobile_nav_btn'>
        <button onClick={handleClick} style={{ backgroundColor: activeIndex === 0 ? '#6E41E2' : activeIndex === 2 ? '#FF5B79' : "#69C9D0" }}>
          <i className={`fa-brands ${icons[activeIndex]}`}></i>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
