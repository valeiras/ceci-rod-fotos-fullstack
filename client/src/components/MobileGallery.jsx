/* eslint-disable react/prop-types */
import styled from 'styled-components';
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import { IKImage } from 'imagekitio-react';

const MobileGallery = () => {
  const { setCurrPictureIdx, isLoading, setIsLoading, setShowFullPage, width } =
    useOutletContext();
  const { currSection, currSectionPictures } = useLoaderData();

  const handleMobileGalleryClick = (picIdx) => {
    setCurrPictureIdx(picIdx);
    setShowFullPage(true);
  };
  const navigation = useNavigation();
  console.log(navigation.state);

  console.log(isLoading);
  return (
    <Wrapper className="MobileGallery">
      <h4 className="mobile-title" style={{ opacity: isLoading ? '0' : '1' }}>
        {currSection.name}:
      </h4>
      {isLoading && <div className="loading"></div>}
      <div
        className="mobile-pic-container"
        style={{ opacity: isLoading ? '0' : '1' }}
      >
        {currSectionPictures.map(({ url, _id }, picIdx) => {
          return (
            <IKImage
              src={url}
              transformation={[{ width: 0.9 * width }]}
              key={_id}
              onClick={() => {
                handleMobileGalleryClick(picIdx);
              }}
              onLoad={() => {
                setIsLoading(false);
              }}
              lqip={{ active: true, quality: 10, blur: 10 }}
              loading="lazy"
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default MobileGallery;

const Wrapper = styled.section`
  height: 100%;
  width: 90%;
  max-width: 600px;
  transition: var(--transition);
  display: flex;
  flex-flow: column nowrap;
  padding-bottom: 25px;
  gap: 10px;
  overflow: auto;
  scroll-behavior: smooth;

  .mobile-title {
    color: var(--color-3);
    font-size: 1.2rem;
    text-transform: uppercase;
    transition: var(--slow-transition);
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  .mobile-pic-container {
    transition: var(--slow-transition);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    gap: 10px;
  }

  .mobile-pic {
    transition: var(--slow-transition);
    cursor: pointer;
    width: 100%;
    height: auto;
  }
`;
