/* eslint-disable react/prop-types */

import styled from 'styled-components';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { IKImage } from 'imagekitio-react';

const Sidebar = () => {
  const { setCurrPictureIdx, isLoading } = useOutletContext();
  const { currSection, currSectionPictures } = useLoaderData();

  return (
    <Wrapper className="Sidebar">
      <h4>{currSection.name}:</h4>
      <div className={'sidebar-img-container'}>
        {currSectionPictures.map(({ url, _id }, picIdx) => {
          return (
            <IKImage
              src={url}
              key={_id}
              transformation={[{ height: 800 }]}
              lqip={{ active: true, quality: 10, blur: 10 }}
              className="sidebar-img"
              onClick={() => {
                setCurrPictureIdx(picIdx);
              }}
              style={{ opacity: isLoading ? '0' : '1' }}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  position: absolute;
  top: 100px;
  left: -150px;
  height: 100%;
  transition: var(--transition);
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  gap: 10px;
  overflow: auto;
  background-color: var(--color-1);
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  width: 200px;
  box-shadow: var(--shadow-4);
  overflow: hidden;

  h4 {
    color: var(--color-3);
    font-size: 1rem;
    text-align: center;
    margin-left: 10px;
    text-transform: uppercase;
    transition: var(--transition);
    position: sticky;
  }

  .sidebar-img-container {
    transition: var(--slow-transition);
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    overflow: auto;
  }

  .sidebar-img-container::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-img {
    border-radius: 10px;
    transition: var(--slow-transition);
    cursor: pointer;
  }

  .sidebar-img:last-of-type {
    margin-bottom: 120px;
  }

  @media screen and (max-width: 1200px) {
    display: none;
  }

  &:hover {
    left: 0;
  }
  .corner-border.sidebar-img {
    padding: 0;
  }
`;
