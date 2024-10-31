import React, { useEffect, useState } from 'react';
import { Navbar, DownloaderForm } from '.';
import { ApiService } from './api.service';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem('activeIndex');
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.fetching();
        console.log(response.data);
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Conditional rendering for loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container'>
      <Navbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {/* Pass the fetched data to the DownloaderForm */}
      <DownloaderForm activeIndex={activeIndex} data={data} />
    </div>
  );
};

export default App;
