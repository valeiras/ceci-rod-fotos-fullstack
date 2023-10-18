/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useRef } from 'react';
import PictureInfo from './PictureInfo';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { IKImage } from 'imagekitio-react';

const PictureStrip = () => {
  const {
    currPictureIdx,
    showPictureInfo,
    setShowPictureInfo,
    isLoading,
    setIsLoading,
    height,
    setShowFullPage,
  } = useOutletContext();
  const { currSectionPictures } = useLoaderData();
  const picRef = useRef(null);

  const handleMouseLeave = (evt) => {
    const pic = picRef.current;
    const { left, right, bottom, top } = pic.getBoundingClientRect();
    const { clientX, clientY } = evt;
    if (
      clientX < left + 1 ||
      clientX > right - 1 ||
      clientY > bottom - 1 ||
      clientY < top + 1
    ) {
      setShowPictureInfo(false);
    }
  };

  return (
    <div className="image-strip">
      {currSectionPictures.map((currPicture, picIdx) => {
        return (
          <Wrapper
            className="corner-border"
            key={currPicture._id}
            style={{
              opacity: !isLoading & (currPictureIdx === picIdx) ? '1' : '0',
            }}
            ref={picRef}
            onClick={() => {
              setShowFullPage(true);
              setShowPictureInfo(false);
            }}
            onMouseEnter={() => {
              setShowPictureInfo(true);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <IKImage
              src={currPicture.url}
              className="gallery-pic"
              transformation={[{ height: 0.7 * height }]}
              lqip={{ active: true, quality: 10, blur: 10 }}
              onLoad={() => {
                setIsLoading(false);
              }}
            />
            {showPictureInfo && currPicture && (
              <PictureInfo info={currPicture} />
            )}
          </Wrapper>
        );
      })}
    </div>
  );
};
export default PictureStrip;

const Wrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 70vh;
  min-width: 10vw;
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
  transition-property: opacity, filter, -webkit-filter, -moz-filter;
  transition-duration: var(--fading-time-2);
  transition-timing-function: linear;

  .gallery-pic {
    height: 100%;
    border-radius: var(--border-radius);
    margin: auto;
    z-index: 10;
    cursor: pointer;
    transition: opacity var(--fading-time-1) linear;
    animation: appear var(--fading-time-1) linear;
  }

  @media screen and (min-width: 1400px) {
    height: 80vh;
  }
`;
