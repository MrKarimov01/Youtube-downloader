import React, { useEffect, useState } from 'react';
import { Navbar, DownloaderForm } from '.';
import { ApiService } from './api.service';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem('activeIndex');
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  




  return (
    <div className='container'>
      <Navbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {/* Pass the fetched data to the DownloaderForm */}
      <DownloaderForm activeIndex={activeIndex}/>
    </div>
  );
};

export default App;
