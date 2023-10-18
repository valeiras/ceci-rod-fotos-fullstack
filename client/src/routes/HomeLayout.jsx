/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css';
import { Navbar, FullPageImage } from '../components';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  const {
    data: { sections },
  } = await customFetch.get('/sections');
  return { sections };
};

const HomeLayout = () => {
  const [currImage, setCurrImage] = useState(null);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);

  return (
    <div className="app">
      <Navbar />
      <Outlet
        context={{
          currImage,
          setCurrImage,
          showImageInfo,
          setShowImageInfo,
          showFullPage,
          setShowFullPage,
        }}
      />
      {showFullPage && <FullPageImage />}
    </div>
  );
};
export default HomeLayout;
