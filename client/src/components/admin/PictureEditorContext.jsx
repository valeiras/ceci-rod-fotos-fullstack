/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const PictureEditorContext = createContext(null);

export const PictureEditorContextProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [isNewPicture, setIsNewPicture] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [hasPictureFile, setHasPictureFile] = useState(false);
  const [isFormReset, setIsFormReset] = useState(false);

  return (
    <PictureEditorContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        hasPictureFile,
        setHasPictureFile,
        isNewPicture,
        setIsNewPicture,
        isFormReset,
        setIsFormReset,
        isConfirmationModalVisible,
        setIsConfirmationModalVisible,
      }}
    >
      {children}
    </PictureEditorContext.Provider>
  );
};

export const usePictureEditorContext = () => {
  return useContext(PictureEditorContext);
};
