import { NavLink, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminContext } from './adminContext';

const SectionSelector = () => {
  const sections = useLoaderData();
  const { setCurrentPictureName } = useAdminContext();

  return (
    <Wrapper>
      {sections.map(({ name, _id }) => {
        return (
          <NavLink
            to={_id}
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
    </Wrapper>
  );
};
export default SectionSelector;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
