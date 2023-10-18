/* eslint-disable react-refresh/only-export-components */
import { BREAKPOINT } from '../utils/constants';
import { useEffect } from 'react';
import {
  MobileGallery,
  LaptopGallery,
  Sidebar,
  FullPagePicture,
} from '../components/';
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
  const { sectionName } = useParams();
  const { setCurrPictureIdx, showFullPage } = useOutletContext();
  const { width } = useOutletContext();

  useEffect(() => {
    setCurrPictureIdx(0);
  }, [sectionName, setCurrPictureIdx]);

  return width < BREAKPOINT ? (
    <>
      <MobileGallery />
      {showFullPage && <FullPagePicture />}
    </>
  ) : (
    <>
      <LaptopGallery />
      <Sidebar />
      {showFullPage && <FullPagePicture />}
    </>
  );
};
export default Gallery;
