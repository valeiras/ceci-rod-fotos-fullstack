import {
  NavLink,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { IoAddCircleOutline } from 'react-icons/io5';
import { NEW_IMAGE } from '../../assets/utils/constants';

const PictureSelector = () => {
  const pictures = useLoaderData();
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const createNewPicture = () => {
    navigate(`/admin/${sectionId}/${NEW_IMAGE}`);
  };

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
      <button className="btn invisible-btn add-btn" onClick={createNewPicture}>
        <IoAddCircleOutline />
      </button>
    </Wrapper>
  );
};
export default PictureSelector;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
