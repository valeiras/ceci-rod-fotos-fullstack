/* eslint-disable react/prop-types */
import { useGlobalContext } from '../context';
import { useRef, useEffect } from 'react';
import { GoInfo, GoX } from 'react-icons/go';
import ImageInfo from './ImageInfo';

const FullPageImage = () => {
  const { currImage, setShowFullPage, showImageInfo, setShowImageInfo } =
    useGlobalContext();

  const closePage = () => {
    setShowFullPage(false);
    setShowImageInfo(false);
  };

  const handleKeyDown = (evt) => {
    if (evt.key == 'Escape') {
      closePage();
    }
  };

  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div
      id="fullpage-img-container"
      tabIndex={-1}
      ref={ref}
      onKeyDown={handleKeyDown}
    >
      <img
        src={currImage.pathMd}
        alt={currImage.name}
        className="fullpage-img"
      />
      <GoX className="close-btn" onClick={closePage} />
      <GoInfo className="info-btn" onClick={() => setShowImageInfo(true)} />
      {showImageInfo && currImage.info && <ImageInfo info={currImage.info} />}
    </div>
  );
};

export default FullPageImage;
