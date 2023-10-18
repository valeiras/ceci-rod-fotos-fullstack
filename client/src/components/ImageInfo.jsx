import { nanoid } from 'nanoid';
import { GoX } from 'react-icons/go';
import { useOutletContext } from 'react-router-dom';

/* eslint-disable react/prop-types */
const ImageInfo = ({ info }) => {
  const { showFullPage, setShowImageInfo } = useOutletContext();
  const infoArray = Array.from(Object.entries(info));
  return (
    <div
      className="image-info"
      style={showFullPage ? { paddingTop: '1.8rem' } : {}}
    >
      {showFullPage && (
        <GoX
          className="close-info-btn"
          onClick={() => {
            setShowImageInfo(false);
          }}
        />
      )}
      {infoArray.map((item) => {
        let [key, value] = item;
        return <p key={nanoid()}>{`${key}: ${value}`}</p>;
      })}
    </div>
  );
};
export default ImageInfo;
