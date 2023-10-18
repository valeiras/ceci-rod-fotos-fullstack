/* eslint-disable react/prop-types */
import { useRef } from 'react';
import ImageInfo from './ImageInfo';
import ProgressiveImage from 'react-progressive-graceful-image';
import { useOutletContext } from 'react-router-dom';

const ImageStrip = ({ imgs, currImgId }) => {
  const {
    isSectionChanging,
    isImageChanging,
    setIsSectionChanging,
    setShowFullPage,
    showImageInfo,
    setShowImageInfo,
  } = useOutletContext();
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const handleImageLoad = () => {
    if (isSectionChanging) {
      setIsSectionChanging(false);
    }
  };

  const handleMouseLeave = (evt) => {
    const img = imgRef.current;
    const { left, right, bottom, top } = img.getBoundingClientRect();
    const { clientX, clientY } = evt;

    if (
      clientX < left + 1 ||
      clientX > right - 1 ||
      clientY > bottom - 1 ||
      clientY < top + 1
    ) {
      setShowImageInfo(false);
    }
  };

  return (
    <div className="image-strip">
      {imgs.map(({ name, id, info, pathMd, pathTy }, imgIdx) => {
        return (
          <div
            className={'img-container corner-border'}
            ref={containerRef}
            key={id}
            style={{
              transform: `translate(-50%, ${300 * (imgIdx - currImgId) - 50}%)`,
              opacity: isSectionChanging ? '0' : '1',
            }}
          >
            {imgIdx === currImgId ? (
              <ProgressiveImage src={pathMd} placeholder={pathTy}>
                {(src, loading) => {
                  return imgIdx === currImgId ? (
                    <img
                      src={src}
                      alt={name}
                      className="gallery-img"
                      ref={imgRef}
                      style={{
                        filter: loading ? 'blur(2px)' : 'none',
                        opacity: isImageChanging ? '0' : '1',
                      }}
                      onClick={() => {
                        setShowFullPage(true);
                        setShowImageInfo(false);
                      }}
                      onMouseEnter={() => {
                        setShowImageInfo(true);
                      }}
                      onMouseLeave={handleMouseLeave}
                      onLoad={handleImageLoad}
                    />
                  ) : null;
                }}
              </ProgressiveImage>
            ) : null}
            {showImageInfo && info && <ImageInfo info={info} />}
          </div>
        );
      })}
    </div>
  );
};
export default ImageStrip;
