/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useRef } from 'react';
import PictureInfo from './PictureInfo';
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import { IKImage } from 'imagekitio-react';

const PictureStrip = () => {
  const { currPictureIdx, setShowImageInfo, isLoading, setIsLoading } =
    useOutletContext();
  const { currSectionPictures } = useLoaderData();
  const containerRef = useRef(null);
  const imgRef = useRef(null);

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
      {currSectionPictures.map(({ name, _id, info, url }, picIdx) => {
        return (
          <Wrapper
            className="corner-border"
            ref={containerRef}
            key={_id}
            style={{
              opacity: !isLoading & (currPictureIdx === picIdx) ? '1' : '0',
            }}
          >
            <IKImage
              src={url}
              className="gallery-pic"
              transformation={[{ height: 800 }]}
              lqip={{ active: true, quality: 10, blur: 10 }}
              onLoad={() => {
                setIsLoading(false);
              }}
            />
            {/* {picIdx === currPictureIdx ? (
              <ProgressiveImage src={pathMd} placeholder={pathTy}>
                {(src, loading) => {
                  return imgIdx === currPictureIdx ? (
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
            {showImageInfo && info && <PictureInfo info={info} />} */}
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
