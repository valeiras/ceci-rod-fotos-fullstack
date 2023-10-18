/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css';
import { Navbar } from '../components';
import { Outlet, useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerWidth);

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      setIsLoading(true);
    }
  }, [navigation.state, setIsLoading]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

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
          width,
          height,
        }}
      />
    </div>
  );
};
export default HomeLayout;
