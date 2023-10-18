/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { GoInfo, GoX } from 'react-icons/go';
import ImageInfo from './PictureInfo';
import { IKImage } from 'imagekitio-react';
import { useOutletContext } from 'react-router-dom';

const FullPagePicture = () => {
  const { currImage, setShowFullPage, showImageInfo, setShowImageInfo } =
    useOutletContext();

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

export default FullPagePicture;
