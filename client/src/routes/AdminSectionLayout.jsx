/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { PictureSelector } from '../components/admin';
import customFetch from '../utils/customFetch';
import { Outlet } from 'react-router-dom';

export const loader = async ({ params }) => {
  const { sectionName } = params;
  console.log(sectionName);
  const { data: sectionData } = await customFetch(
    `/sectionsByName/${sectionName}`
  );
  console.log(sectionData);
  const { data: picturesData } = await customFetch(
    `/sections/${sectionData._id}/pictures`
  );
  return picturesData.pictures;
};

const AdminSectionLayout = () => {
  return (
    <Wrapper className="AdminSectionLayout">
      <PictureSelector />
      <Outlet />
    </Wrapper>
  );
};
export default AdminSectionLayout;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: var(--admin-column-width) 1fr;
  gap: 1rem;
  justify-content: space-between;
`;
