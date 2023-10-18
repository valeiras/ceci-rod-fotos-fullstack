/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useEffect } from 'react';
import PictureStrip from './PictureStrip';
import {
  useNavigation,
  useOutletContext,
  useLoaderData,
} from 'react-router-dom';

const LaptopGallery = () => {
  const { currPictureIdx, setCurrPictureIdx, isLoading, setIsLoading } =
    useOutletContext();

  const { currSectionPictures } = useLoaderData();
  const currNbPictures = currSectionPictures.length;

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      setIsLoading(true);
    }
  }, [navigation.state, setIsLoading]);

  const handlePrevButtonClick = () => {
    const newId = (currPictureIdx - 1 + currNbPictures) % currNbPictures;
    setCurrPictureIdx(newId);
  };

  const handleNextButtonClick = () => {
    const newId = (currPictureIdx + 1) % currNbPictures;
    setCurrPictureIdx(newId);
  };

  return (
    <Wrapper className="LaptopGallery">
      <i
        className="arrow-btn prev-btn fa-solid fa-angle-left"
        onClick={handlePrevButtonClick}
      ></i>

      <PictureStrip />
      {isLoading && <div className="loading"></div>}
      <i
        className="arrow-btn next-btn fa-solid fa-angle-right"
        onClick={handleNextButtonClick}
      ></i>
    </Wrapper>
  );
};

export default LaptopGallery;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
  display: none;
  align-items: center;
  justify-content: space-between;

  .arrow-btn {
    font-size: 3rem;
    align-self: center;
    transition: var(--transition);
    cursor: pointer;
    margin: 5vw;
    display: none;
  }

  .next-btn:hover {
    transform: translateX(5px);
  }

  .prev-btn:hover {
    transform: translateX(-5px);
  }

  @media screen and (min-width: 1200px) {
    display: flex;
    .arrow-btn {
      display: inline-block;
    }
  }
  @media screen and (min-width: 1400px) {
    .arrow-btn {
      margin: 10vw;
    }
  }
`;
