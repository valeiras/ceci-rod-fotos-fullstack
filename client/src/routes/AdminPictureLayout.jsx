/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { PictureSelector } from '../components/admin';
import customFetch from '../utils/customFetch';
import { Outlet } from 'react-router-dom';

export const loader = async ({ params }) => {
  const { sectionId } = params;
  const { data } = await customFetch(`/sections/${sectionId}/pictures`);
  return data.pictures;
};

const AdminPictureLayout = () => {
  return (
    <Wrapper className="AdminPictureLayout">
      <PictureSelector />
      <Outlet />
    </Wrapper>
  );
};
export default AdminPictureLayout;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: var(--admin-column-width) 1fr;
  gap: 1rem;
  justify-content: space-between;
`;
