/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  Form,
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from 'react-router-dom';

import customFetch from '../../assets/utils/customFetch';
import PictureDataEditorFormRow from './PictureDataEditorFormRow';
import {
  ToggleEditButton,
  UpdateButton,
  DeleteButton,
} from './PictureDataEditorButtons';
import { useAdminContext } from './adminContext';
import { NEW_IMAGE } from '../../assets/utils/constants';
import { toast } from 'react-toastify';
import ConfirmationModal from '../ConfirmationModal';

export const loader = async ({ params }) => {
  const { pictureId, sectionId } = params;
  let picture;
  if (pictureId === NEW_IMAGE) {
    picture = {
      name: '',
      url: null,
      sectionId,
    };
  } else {
    const { data } = await customFetch(`pictures/${pictureId}`);
    picture = data;
  }
  return picture;
};

export const action = async ({ params, request }) => {
  const { pictureId } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const intent = data.intent;

  try {
    switch (intent) {
      case 'create':
        return await customFetch.post(`/pictures/${pictureId}`, data);
      case 'update':
        return await customFetch.patch(`/pictures/${pictureId}`, data);
      default:
        break;
    }
  } catch (error) {
    toast.error(`Algo ha salido mal: ${error.message}`);
    console.log(error);
  }

  return null;
};

const PictureDataEditor = () => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const { pictureId, sectionId } = useParams();
  const { setCurrentPictureName } = useAdminContext();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const toggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const picture = useLoaderData();
  const { url, name } = picture;

  const iterablePicture = { ...picture };
  delete iterablePicture._id;
  delete iterablePicture.sectionId;
  delete iterablePicture.url;
  delete iterablePicture.__v;

  useEffect(() => {
    setCurrentPictureName(name);
  }, [name, setCurrentPictureName]);

  const deletePicture = async () => {
    try {
      const { data } = await customFetch.delete(`/pictures/${pictureId}`);
      setIsConfirmationModalVisible(false);
      setCurrentPictureName('');
      navigate(`/admin/${sectionId}`);
      revalidator.revalidate();
      toast.success(`'${data.picture.name}' eliminada`);
    } catch (error) {
      toast.error(`Algo ha salido mal: ${error.message}`);
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ConfirmationModal
        isVisible={isConfirmationModalVisible}
        setIsVisible={setIsConfirmationModalVisible}
        message="¿Deseas eliminar esta imagen?"
        acceptTag="Sí"
        rejectTag="No"
        onAccept={deletePicture}
        onReject={() => {
          setIsConfirmationModalVisible(false);
        }}
      />
      <div className="grid-layout">
        <Form
          className="form admin-form"
          method="post"
          state={{ some: 'value' }}
        >
          {Object.keys(iterablePicture).map((key) => {
            return (
              <PictureDataEditorFormRow
                key={key}
                name={key}
                tag={key}
                value={picture[key]}
                isDisabled={isEditMode}
              />
            );
          })}
          <div className="button-strip">
            {isEditMode ? (
              <ToggleEditButton toggleEdit={toggleEdit} />
            ) : (
              <>
                <UpdateButton />
                <DeleteButton
                  setIsConfirmationModalVisible={setIsConfirmationModalVisible}
                />
              </>
            )}
          </div>
        </Form>
        {url ? <img src={url} alt="" /> : 'Subir imagen'}
      </div>
    </Wrapper>
  );
};
export default PictureDataEditor;

const Wrapper = styled.div`
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  img {
    width: 100%;
  }

  .admin-form {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .form-input:disabled {
    background-color: var(--color-1);
  }

  .edit-btn {
    width: fit-content;
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  .button-strip {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`;
