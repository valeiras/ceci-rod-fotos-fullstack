/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Form,
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from 'react-router-dom';
import customFetch from '../../assets/utils/customFetch';
import { NEW_IMAGE } from '../../assets/utils/constants';
import { PictureEditorFormRow, ButtonStrip, ImageInput } from '.';
import { useAdminContext } from './AdminContext';
import { usePictureEditorContext } from './pictureEditorContext';

import ConfirmationModal from '../ConfirmationModal';
import { pictureProps } from '../../data/pictureData';

export const loader = async ({ params }) => {
  const { pictureId } = params;
  let picture;
  if (pictureId === NEW_IMAGE) {
    picture = {
      name: 'Nueva imagen',
      url: null,
    };
  } else {
    const { data } = await customFetch(`pictures/${pictureId}`);
    picture = data;
  }
  return picture;
};

const PictureEditor = () => {
  const {
    isConfirmationModalVisible,
    setIsConfirmationModalVisible,
    isEditMode,
    setIsEditMode,
    setIsNewPicture,
    hasPictureFile,
    setHasPictureFile,
    intent,
  } = usePictureEditorContext();
  const { pictureId, sectionId } = useParams();
  const { setCurrentPictureName } = useAdminContext();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const picture = useLoaderData();

  const { url, name } = picture;

  useEffect(() => {
    setCurrentPictureName(name);
    setIsNewPicture(!url);
    setHasPictureFile(!!url);
  }, [name, setCurrentPictureName, setHasPictureFile, setIsNewPicture, url]);

  // ----------------------- Helper functions ----------------------------------------------

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsEditMode(false);
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);
    let response;
    try {
      switch (intent) {
        case 'create':
          if (!data.imgFile) {
            throw new Error('Es necesario subir un archivo de imagen');
          }
          data.url =
            'https://ceci-rodriguez-fotos.netlify.app/imgs/Medium/Atardeceres/Desert%20and%20the%20city.jpg';
          data.sectionId = sectionId;
          response = await customFetch.post(`/pictures/`, data);
          navigate(`/admin/${sectionId}/${response.data.picture._id}`);
          break;
        case 'update':
          await customFetch.patch(`/pictures/${pictureId}`, data);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(`Algo ha salido mal: ${error.message}`);
      console.log(error);
      return error;
    }

    revalidator.revalidate();
    return null;
  };

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

  // --------------------------------------------------------------------------
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
      <Form className="form grid-layout" onSubmit={handleSubmit}>
        <div className="left-column">
          {pictureProps.map((prop) => {
            return (
              <PictureEditorFormRow
                key={prop}
                name={prop}
                initialValue={picture[prop] || ''}
                isDisabled={!isEditMode}
              />
            );
          })}
          <ButtonStrip />
        </div>

        <div className="right-column">
          <img
            src={url}
            id="image-preview"
            className={hasPictureFile ? '' : 'hidden'}
          />
          {isEditMode && <ImageInput />}
        </div>
      </Form>
    </Wrapper>
  );
};
export default PictureEditor;

const Wrapper = styled.div`
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    justify-items: center;
    margin: 0;
  }

  img {
    width: 100%;
  }

  .right-column,
  .left-column {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .edit-btn {
    width: fit-content;
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  .hidden {
    position: absolute;
    opacity: 0;
  }
`;
