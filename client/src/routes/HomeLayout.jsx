/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css';
import { Navbar, FullPagePicture } from '../components';
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
  const [showPictureInfo, setShowPictureInfo] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currPictureIdx, setCurrPictureIdx] = useState(0);

  return (
    <div className="app">
      <Navbar />
      <Outlet
        context={{
          showPictureInfo,
          setShowPictureInfo,
          showFullPage,
          setShowFullPage,
          currPictureIdx,
          setCurrPictureIdx,
          isLoading,
          setIsLoading,
        }}
      />
      {showFullPage && <FullPagePicture />}
    </div>
  );
};
export default HomeLayout;
