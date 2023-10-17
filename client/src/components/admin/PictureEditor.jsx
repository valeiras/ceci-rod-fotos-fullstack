/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { NEW_IMAGE } from '../../utils/constants';
import { PictureEditorFormRow, ButtonStrip, ImageInput } from '.';
import { useAdminContext } from './AdminContext';
import { usePictureEditorContext } from './pictureEditorContext';

import ConfirmationModal from '../ConfirmationModal';
import { pictureProps } from '../../data/pictureData';

import imagekit from '../../utils/imagekit';

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

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const { sectionId, pictureId } = params;
  const data = Object.fromEntries(formData);
  data.sectionId = sectionId;
  let picture;

  try {
    switch (data.intent) {
      case 'create':
        picture = await createNewPicture(data);
        return redirect(`/admin/${sectionId}/${picture._id}`);
      case 'update':
        return customFetch.patch(`/pictures/${pictureId}`, data);
      default:
        break;
    }
  } catch (error) {
    toast.error(`Algo ha salido mal: ${error.message}`);
    console.log(error);
    return error;
  }

  return null;
};

const createNewPicture = async (data) => {
  const file = document.getElementById('file-upload');

  try {
    const { data: imagekitAuth } = await customFetch.get('/auth/imagekit');
    const { data: section } = await customFetch.get(
      `/sections/${data.sectionId}`
    );
    console.log(section);

    const imagekitResult = await imagekit.upload({
      file: file.files[0],
      fileName: `${data.name}`,
      ...imagekitAuth,
      useUniqueFileName: false,
      folder: `/ceci-rod-fotos/${section.name}`,
      extensions: [
        {
          name: 'aws-auto-tagging',
          minConfidence: 80,
          maxTags: 10,
        },
      ],
    });

    data.url = imagekitResult.url;
    const { data: axiosResult } = await customFetch.post('/pictures', data);
    console.log(axiosResult.picture);
    return axiosResult.picture;
  } catch (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
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
    setIsEditMode(!url);
    setHasPictureFile(!!url);
  }, [
    name,
    setCurrentPictureName,
    setHasPictureFile,
    setIsEditMode,
    setIsNewPicture,
    url,
  ]);

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
      <Form className="form grid-layout" method="post">
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
