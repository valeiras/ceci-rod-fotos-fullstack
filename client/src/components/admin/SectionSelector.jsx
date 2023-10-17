/* eslint-disable react/prop-types */
import { NavLink, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminContext } from './AdminContext';

import { IoAddCircleOutline } from 'react-icons/io5';

import { AiFillEdit } from 'react-icons/ai';
import { useState } from 'react';
import CreateSectionModal from './CreateSectionModal';
import UpdateSectionModal from './UpdateSectionModal';

const SectionSelector = () => {
  const sections = useLoaderData();
  const { setCurrentPictureName } = useAdminContext();
  const [isCreateSectionModalVisible, setIsCreateSectionModalVisible] =
    useState(false);
  const [isUpdateSectionModalVisible, setIsUpdateSectionModalVisible] =
    useState(false);

  const SectionRow = ({ name, friendlyUrlName }) => {
    return (
      <div className="section-row">
        <NavLink
          to={friendlyUrlName}
          className="nav-link"
          style={{ marginRight: 0 }}
          onClick={() => {
            setCurrentPictureName('');
          }}
        >
          {name}
        </NavLink>
        <button
          className="btn edit-section-btn"
          onClick={() => {
            setIsUpdateSectionModalVisible(true);
          }}
        >
          <AiFillEdit />
        </button>
      </div>
    );
  };

  return (
    <Wrapper>
      <CreateSectionModal
        isVisible={isCreateSectionModalVisible}
        setIsVisible={setIsCreateSectionModalVisible}
      />
      <UpdateSectionModal
        isVisible={isUpdateSectionModalVisible}
        setIsVisible={setIsUpdateSectionModalVisible}
      />
      {sections.map(({ name, friendlyUrlName, _id }) => {
        return (
          <SectionRow
            key={_id}
            name={name}
            friendlyUrlName={friendlyUrlName}
          ></SectionRow>
        );
      })}
      <button
        className="btn invisible-btn add-btn"
        onClick={() => {
          setIsCreateSectionModalVisible(true);
        }}
      >
        <IoAddCircleOutline />
      </button>
    </Wrapper>
  );
};
export default SectionSelector;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-row {
    display: flex;
    position: relative;
  }

  .edit-section-btn {
    display: none;
    position: absolute;
    left: -2px;
    top: 50%;
    transform: translate(-100%, -50%);
    padding: 0.8rem;
    box-shadow: none;
  }
  .active + .edit-section-btn {
    display: flex;
  }
`;
