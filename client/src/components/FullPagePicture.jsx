/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { GoInfo, GoX } from 'react-icons/go';
import PictureInfo from './PictureInfo';
import { IKImage } from 'imagekitio-react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

const FullPagePicture = () => {
  const {
    currPictureIdx,
    setShowFullPage,
    showPictureInfo,
    setShowPictureInfo,
  } = useOutletContext();

  const { currSectionPictures } = useLoaderData();

  const closePage = () => {
    setShowFullPage(false);
    setShowPictureInfo(false);
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
    <Wrapper
      className="FullPagePicture"
      tabIndex={-1}
      ref={ref}
      onKeyDown={handleKeyDown}
    >
      <IKImage
        src={currSectionPictures[currPictureIdx].url}
        alt={currSectionPictures[currPictureIdx].name}
        className="fullpage-pic"
      />
      <GoX className="close-btn" onClick={closePage} />
      <GoInfo className="info-btn" onClick={() => setShowPictureInfo(true)} />
      {showPictureInfo && (
        <PictureInfo info={currSectionPictures[currPictureIdx]} />
      )}
    </Wrapper>
  );
};

export default FullPagePicture;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* width: 100vw; */
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: var(--color-dark);
  animation: appear var(--fading-time-1) ease;
  display: flex;
  align-items: center;

  .fullpage-pic {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 82vh;
  }

  .info-btn,
  .close-btn {
    position: absolute;
    top: 1rem;
    font-size: 2.5rem;
    color: var(--color-1);
    cursor: pointer;
    transition: var(--transition);
  }

  .info-btn:hover,
  .close-btn:hover {
    transform: scale(1.05);
  }

  .close-btn {
    right: 1rem;
  }

  .info-btn {
    left: 1rem;
  }

  @media screen and (min-width: 1200px) {
    .info-btn,
    .close-btn {
      top: 2rem;
    }
    .close-btn {
      right: 2rem;
    }

    .info-btn {
      left: 2rem;
    }
    .fullpage-pic {
      max-height: 100vh;
    }
  }
`;
