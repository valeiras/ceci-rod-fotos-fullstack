import { NavLink, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

const PictureSelector = () => {
  const pictures = useLoaderData();

  return (
    <Wrapper>
      {pictures.map(({ name, _id }) => {
        return (
          <NavLink
            to={_id}
            key={_id}
            className="nav-link"
            style={{ marginRight: 0 }}
          >
            {name}
          </NavLink>
        );
      })}
    </Wrapper>
  );
};
export default PictureSelector;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
