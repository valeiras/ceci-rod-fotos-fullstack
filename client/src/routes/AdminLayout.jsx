/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { SectionSelector } from '../components/admin';
import customFetch from '../assets/utils/customFetch';
import { Outlet } from 'react-router-dom';
import {
  AdminContextProvider,
  useAdminContext,
} from '../components/admin/AdminContext';

export const loader = async () => {
  const { data } = await customFetch('/sections');
  return data.sections;
};

const CurrentPictureName = () => {
  const { currentPictureName } = useAdminContext();
  return <>{currentPictureName}</>;
};

const AdminLayout = () => {
  return (
    <AdminContextProvider>
      <Wrapper>
        <div className="admin-container">
          <h1>Panel de administración</h1>
          <div className="titles-grid">
            <div className="admin-title">secciones</div>
            <div className="admin-title">fotografías</div>
            <div className="admin-title">
              <CurrentPictureName />
            </div>
          </div>
          <div className="content-grid">
            <SectionSelector />
            <Outlet />
          </div>
        </div>
      </Wrapper>
    </AdminContextProvider>
  );
};
export default AdminLayout;

const Wrapper = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;

  .admin-container {
    display: flex;
    width: 90vw;
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }

  .titles-grid,
  .content-grid {
    display: grid;
    gap: 1rem;
  }

  .content-grid {
    grid-template-columns: 10vw 1fr;
  }

  .titles-grid {
    grid-template-columns: 10vw 10vw 1fr;
    margin-bottom: 0.5rem;
  }

  .admin-title {
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
    border-bottom: 1px solid var(--color-3);
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
`;
