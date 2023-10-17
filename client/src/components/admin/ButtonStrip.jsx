import styled from 'styled-components';
import { useNavigation, useParams } from 'react-router-dom';
import { usePictureEditorContext } from './pictureEditorContext';
import { NEW_IMAGE } from '../../utils/constants';

/* eslint-disable react/prop-types */
import {
  AiFillSave,
  AiFillEdit,
  AiFillDelete,
  AiFillCloseCircle,
} from 'react-icons/ai';

const SubmitButton = ({ icon, intent }) => {
  return (
    <button className="btn edit-btn" type="submit" name="intent" value={intent}>
      {icon}
    </button>
  );
};

const UpdateButton = () => {
  return SubmitButton({
    icon: <AiFillSave />,
    intent: 'update',
  });
};

const CreateButton = () => {
  return SubmitButton({
    icon: <AiFillSave />,
    intent: 'create',
  });
};

const DeleteButton = ({ setIsConfirmationModalVisible }) => {
  return (
    <button
      type="button"
      className="btn edit-btn"
      onClick={() => {
        setIsConfirmationModalVisible(true);
      }}
    >
      <AiFillDelete />
    </button>
  );
};

const EnableEditModeButton = ({ toggleEdit }) => {
  return (
    <button className="btn edit-btn" onClick={toggleEdit}>
      <AiFillEdit />
    </button>
  );
};

const DisableEditButton = ({ toggleEdit }) => {
  return (
    <button className="btn edit-btn" onClick={toggleEdit}>
      <AiFillCloseCircle />
    </button>
  );
};

const ButtonStrip = () => {
  const { isEditMode, setIsEditMode, setIsConfirmationModalVisible } =
    usePictureEditorContext();

  const { pictureName } = useParams();
  const isNewImage = pictureName === NEW_IMAGE;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const toggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const EditModeButtonStrip = () => {
    if (isNewImage) {
      return (
        <>
          <CreateButton setIsEditMode={setIsEditMode} />
          <DisableEditButton toggleEdit={toggleEdit} />
        </>
      );
    } else {
      return (
        <>
          <UpdateButton setIsEditMode={setIsEditMode} />
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
