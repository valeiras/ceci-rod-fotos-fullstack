import { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

export const AdminContextProvider = ({ children }) => {
  const [currentPictureName, setCurrentPictureName] = useState('');

  return (
    <AdminContext.Provider
      value={{ currentPictureName, setCurrentPictureName }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
