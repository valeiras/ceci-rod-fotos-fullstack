import { BREAKPOINT } from '../utils/constants';
import { useState, useEffect } from 'react';
import MobileGallery from './MobileGallery';
import LaptopGallery from './LaptopGallery';
import Sidebar from './Sidebar';

const Gallery = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return width < BREAKPOINT ? (
    <MobileGallery />
  ) : (
    <>
      <LaptopGallery />
      <Sidebar />
    </>
  );
};
export default Gallery;
