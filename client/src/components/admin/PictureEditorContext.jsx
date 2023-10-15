/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const PictureEditorContext = createContext(null);

export const PictureEditorContextProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [isNewPicture, setIsNewPicture] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [intent, setIntent] = useState('');
  const [hasPictureFile, setHasPictureFile] = useState(false);

  return (
    <PictureEditorContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        hasPictureFile,
        setHasPictureFile,
        isNewPicture,
        setIsNewPicture,
        isConfirmationModalVisible,
        setIsConfirmationModalVisible,
        intent,
        setIntent,
      }}
    >
      {children}
    </PictureEditorContext.Provider>
  );
};

export const usePictureEditorContext = () => {
  return useContext(PictureEditorContext);
};
