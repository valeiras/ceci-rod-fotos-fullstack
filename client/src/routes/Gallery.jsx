/* eslint-disable react-refresh/only-export-components */
import { BREAKPOINT } from '../utils/constants';
import { useState, useEffect } from 'react';
import MobileGallery from '../components/MobileGallery';
import LaptopGallery from '../components/LaptopGallery';
import Sidebar from '../components/Sidebar';
import shuffle from 'shuffle-array';
import customFetch from '../utils/customFetch';
import { useOutletContext, useParams } from 'react-router-dom';

export const loader = async ({ params }) => {
  const { sectionName } = params;

  const { data: currSection } = await customFetch(
    `/sectionsByName/${sectionName}`
  );

  const { data } = await customFetch.get(
    `/sections/${currSection._id}/pictures`
  );

  const currSectionPictures = shuffle(data.pictures);
  return { currSection, currSectionPictures };
};

const Gallery = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { sectionName } = useParams();
  const { setCurrPictureIdx } = useOutletContext();

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    setCurrPictureIdx(0);
  }, [sectionName, setCurrPictureIdx]);

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
