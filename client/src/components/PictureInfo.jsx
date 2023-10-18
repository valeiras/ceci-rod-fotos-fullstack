import styled from 'styled-components';

import { nanoid } from 'nanoid';
import { GoX } from 'react-icons/go';
import { useOutletContext } from 'react-router-dom';
import { pictureProps, propsToTags } from '../data/pictureData';

/* eslint-disable react/prop-types */
const PictureInfo = ({ info }) => {
  const { showFullPage, setShowPictureInfo } = useOutletContext();

  return (
    <Wrapper
      className="PictureInfo"
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
    </Wrapper>
  );
};
export default PictureInfo;

const Wrapper = styled.div`
  position: absolute;
  bottom: calc(var(--corner-distance-laptop) + 5px);
  left: calc(var(--corner-distance-laptop) + 5px);

  z-index: 1000;
  background-color: var(--color-1);
  padding: 1rem;
  transition: var(--transition);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 0.4rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-1);
  animation: appear var(--fading-time-1) ease;

  .close-info-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .close-info-btn:hover {
    transform: scale(1.05);
  }
`;
