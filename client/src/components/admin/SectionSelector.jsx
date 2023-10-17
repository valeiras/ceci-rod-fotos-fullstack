import { NavLink, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminContext } from './AdminContext';

import { IoAddCircleOutline } from 'react-icons/io5';

const SectionSelector = () => {
  const sections = useLoaderData();
  const { setCurrentPictureName } = useAdminContext();

  return (
    <Wrapper>
      {sections.map(({ name, friendlyUrlName, _id }) => {
        return (
          <NavLink
            to={friendlyUrlName}
            key={_id}
            className="nav-link"
            style={{ marginRight: 0 }}
            onClick={() => {
              setCurrentPictureName('');
            }}
          >
            {name}
          </NavLink>
        );
      })}
      <button className="btn invisible-btn add-btn">
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
`;
