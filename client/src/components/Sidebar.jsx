/* eslint-disable react/prop-types */
import { useGlobalContext } from '../context';
import { FADING_TIME1 } from '../constants';
import ProgressiveImage from 'react-progressive-graceful-image';

const Sidebar = () => {
  const {
    currSection,
    currImage,
    setImageById,
    setIsImageChanging,
    isSectionChanging,
  } = useGlobalContext();

  const handleSidebarClick = (imageId) => {
    if (imageId !== currImage.id) {
      setIsImageChanging(true);
      setTimeout(() => {
        setImageById(imageId);
        setIsImageChanging(false);
      }, FADING_TIME1);
    }
  };

  return (
    <div id="sidebar">
      <h4>{currSection.name}:</h4>
      <div className={'sidebar-img-container'}>
        {currSection.imgs.map((img) => {
          return (
            <ProgressiveImage
              src={img.pathSm}
              placeholder={img.pathTy}
              key={img.id}
            >
              {(src, loading) => {
                return (
                  <img
                    src={src}
                    alt={img.name}
                    className="sidebar-img"
                    style={{
                      filter: loading ? 'blur(2px)' : 'none',
                      opacity: isSectionChanging ? 0 : 1,
                    }}
                    onClick={() => {
                      handleSidebarClick(img.id);
                    }}
                  />
                );
              }}
            </ProgressiveImage>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
