/* eslint-disable react/prop-types */
import { useGlobalContext } from '../context';
import ProgressiveImage from 'react-progressive-graceful-image';

const MobileGallery = () => {
  const {
    currSection,
    setImageById,
    isSectionChanging,
    setIsSectionChanging,
    showLinks,
    setShowFullPage,
  } = useGlobalContext();

  const handleMobileGalleryClick = (imageId) => {
    setImageById(imageId);
    setShowFullPage(true);
  };

  const handleImageLoad = () => {
    if (isSectionChanging) {
      setIsSectionChanging(false);
    }
  };

  return (
    <section className="mobile-gallery">
      <h4
        className="mobile-title"
        style={
          showLinks || isSectionChanging
            ? { opacity: '0%' }
            : { opacity: '100%' }
        }
      >
        {currSection.name}:
      </h4>
      {isSectionChanging && (
        <div
          className="loading"
          style={{
            opacity: isSectionChanging ? 1 : 0,
          }}
        ></div>
      )}
      <div className="mobile-img-container">
        {currSection.imgs.map((img) => {
          return (
            <ProgressiveImage
              src={img.pathMd}
              placeholder={img.pathTy}
              key={img.id}
            >
              {(src, loading) => {
                return (
                  <img
                    src={src}
                    alt={img.name}
                    className="mobile-img corner-border"
                    style={{
                      filter: loading ? 'blur(2px)' : 'none',
                      opacity: isSectionChanging ? 0 : 1,
                    }}
                    onClick={() => {
                      handleMobileGalleryClick(img.id);
                    }}
                    onLoad={handleImageLoad}
                  />
                );
              }}
            </ProgressiveImage>
          );
        })}
      </div>
    </section>
  );
};

export default MobileGallery;
