import { BREAKPOINT } from '../utils/constants';
import { useState, useEffect } from 'react';
import MobileGallery from '../components/MobileGallery';
import LaptopGallery from '../components/LaptopGallery';
import Sidebar from '../components/Sidebar';

const Gallery = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // return width < BREAKPOINT ? (
  //   <MobileGallery />
  // ) : (
  //   <>
  //     <LaptopGallery />
  //     <Sidebar />
  //   </>
  // );

  return null;
};
export default Gallery;
