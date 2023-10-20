import styled from 'styled-components';
import { useNavigation, useParams } from 'react-router-dom';
import { usePictureEditorContext } from './PictureEditorContext';
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
    <button
      className="btn edit-btn"
      type="submit"
      name="intent"
      value={intent}
      title="Guardar cambios"
    >
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
      title="Eliminar imagen"
    >
      <AiFillDelete />
    </button>
  );
};

const EnableEditModeButton = ({ enableEditMode }) => {
  return (
    <button
      className="btn edit-btn"
      onClick={enableEditMode}
      title="Editar imagen"
    >
      <AiFillEdit />
    </button>
  );
};

const DisableEditButton = ({ disableEditMode }) => {
  return (
    <button
      className="btn edit-btn"
      onClick={disableEditMode}
      title="Descartar cambios"
    >
      <AiFillCloseCircle />
    </button>
  );
};

const ButtonStrip = () => {
  const {
    isEditMode,
    setIsEditMode,
    setIsFormReset,
    setIsConfirmationModalVisible,
  } = usePictureEditorContext();

  const { pictureName } = useParams();
  const isNewImage = pictureName === NEW_IMAGE;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const enableEditMode = () => {
    setIsFormReset(false);
    setIsEditMode(true);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
    setIsFormReset(true);
  };

  const EditModeButtonStrip = () => {
    if (isNewImage) {
      return (
        <>
          <CreateButton title="Crear nueva imagen" />
          <DisableEditButton disableEditMode={disableEditMode} />
        </>
      );
    } else {
      return (
        <>
          <UpdateButton />
          <DeleteButton
            setIsConfirmationModalVisible={setIsConfirmationModalVisible}
          />
          <DisableEditButton disableEditMode={disableEditMode} />
        </>
      );
    }
  };

  return (
    <Wrapper>
      {isEditMode ? (
        <EditModeButtonStrip />
      ) : (
        <>
          {isSubmitting ? (
            <div className="loading-container">
              <span className="sending">Enviando...</span>
              <div className="tiny-loading"></div>
            </div>
          ) : (
            <EnableEditModeButton enableEditMode={enableEditMode} />
          )}
        </>
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

  .loading-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
