import styled from 'styled-components';
import { useNavigation, useParams } from 'react-router-dom';
import {
  EnableEditModeButton,
  DisableEditButton,
  UpdateButton,
  DeleteButton,
  CreateButton,
} from './PictureEditorButtons';
import { usePictureEditorContext } from './pictureEditorContext';
import { NEW_IMAGE } from '../../utils/constants';

const ButtonStrip = () => {
  const { isEditMode, setIsEditMode, setIsConfirmationModalVisible } =
    usePictureEditorContext();

  const { pictureId } = useParams();
  const isNewImage = pictureId === NEW_IMAGE;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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
        <>
          {isSubmitting ? (
            <span className="sending">Enviando...</span>
          ) : (
            <EditModeButtonStrip />
          )}
        </>
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
  min-height: 4rem;

  .sending {
    font-size: 1.2rem;
  }
`;
