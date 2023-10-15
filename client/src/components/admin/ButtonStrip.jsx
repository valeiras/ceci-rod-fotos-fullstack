import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  EnableEditModeButton,
  DisableEditButton,
  UpdateButton,
  DeleteButton,
  CreateButton,
} from './PictureEditorButtons';
import { usePictureEditorContext } from './pictureEditorContext';
import { NEW_IMAGE } from '../../assets/utils/constants';
import { useEffect } from 'react';

const ButtonStrip = () => {
  const {
    isEditMode,
    setIsEditMode,
    setIsConfirmationModalVisible,
    setIntent,
  } = usePictureEditorContext();

  const { pictureId } = useParams();
  const isNewImage = pictureId === NEW_IMAGE;

  useEffect(() => {
    setIsEditMode(isNewImage);
    if (isNewImage) {
      setIntent('create');
    } else {
      setIntent('update');
    }
  }, [isNewImage, setIntent, setIsEditMode]);

  const toggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const EditModeButtonStrip = () => {
    if (isNewImage) {
      return (
        <>
          <CreateButton />
          <DisableEditButton toggleEdit={toggleEdit} />
        </>
      );
    } else {
      return (
        <>
          <UpdateButton />
          <DeleteButton
            setIsConfirmationModalVisible={setIsConfirmationModalVisible}
          />
          <DisableEditButton toggleEdit={toggleEdit} />
        </>
      );
    }
  };

  return (
    <Wrapper>
      {isEditMode ? (
        <EditModeButtonStrip />
      ) : (
        <EnableEditModeButton toggleEdit={toggleEdit} />
      )}
    </Wrapper>
  );
};
export default ButtonStrip;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
