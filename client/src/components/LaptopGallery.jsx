/* eslint-disable react/prop-types */
import { useGlobalContext } from '../context';
import TinyImageLoader from './TinyImageLoader';
import { FADING_TIME1 } from '../constants';
import ImageStrip from './ImageStrip';

const LaptopGallery = () => {
  const {
    currImage,
    currSection,
    setIsImageChanging,
    isSectionChanging,
    setImageById,
  } = useGlobalContext();

  const currNbImages = currSection.imgs.length;

  const setNewImageId = (id) => {
    setIsImageChanging(true);
    setTimeout(() => {
      setImageById(id);
      setIsImageChanging(false);
    }, FADING_TIME1);
  };

  const handlePrevButtonClick = (currImageId, nbImgs) => {
    const newId = (currImageId - 1 + nbImgs) % nbImgs;
    setNewImageId(newId);
  };

  const handleNextButtonClick = (currImageId, nbImgs) => {
    const newId = (currImageId + 1) % nbImgs;
    setNewImageId(newId);
  };

  return (
    <div className="gallery-container">
      <i
        className="arrow-btn prev-btn fa-solid fa-angle-left"
        onClick={() => {
          handlePrevButtonClick(currImage.id, currNbImages);
        }}
      ></i>

      <ImageStrip imgs={currSection.imgs} currImgId={currImage.id} />
      {isSectionChanging && (
        <div
          className="loading"
          style={{ opacity: isSectionChanging ? 1 : 0 }}
        ></div>
      )}
      <i
        className="arrow-btn next-btn fa-solid fa-angle-right"
        onClick={() => {
          handleNextButtonClick(currImage.id, currNbImages);
        }}
      ></i>
      {!isSectionChanging && <TinyImageLoader />}
    </div>
  );
};

export default LaptopGallery;
