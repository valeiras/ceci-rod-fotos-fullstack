import { nanoid } from 'nanoid';
import { GoX } from 'react-icons/go';
import { useOutletContext } from 'react-router-dom';
import { pictureProps, propsToTags } from '../data/pictureData';

/* eslint-disable react/prop-types */
const PictureInfo = ({ info }) => {
  const { showFullPage, setShowPictureInfo } = useOutletContext();

  return (
    <div
      className="image-info"
      style={showFullPage ? { paddingTop: '1.8rem' } : {}}
    >
      {showFullPage && (
        <GoX
          className="close-info-btn"
          onClick={() => {
            setShowPictureInfo(false);
          }}
        />
      )}
      {pictureProps.map((prop) => {
        return <p key={nanoid()}>{`${propsToTags[prop]}: ${info[prop]}`}</p>;
      })}
    </div>
  );
};
export default PictureInfo;
