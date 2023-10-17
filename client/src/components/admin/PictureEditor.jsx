/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
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

import { IKImage } from 'imagekitio-react';
import 'regenerator-runtime';
import imagekit from '../../utils/imagekit';
const { urlEndpoint } = 'https://ik.imagekit.io/lyhvtcigz/';

export const loader = async ({ params }) => {
  const { sectionName, pictureName } = params;
  let picture;
  if (pictureName === NEW_IMAGE) {
    const { data: section } = await customFetch(
      `sectionsByName/${sectionName}`
    );
    picture = {
      name: 'Nueva imagen',
      sectionId: section._id,
      url: null,
    };
  } else {
    const { data } = await customFetch(`picturesByName/${pictureName}`);
    picture = data;
  }
  return picture;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const { sectionName } = params;

  const data = Object.fromEntries(formData);
  const pictureId = data.pictureId;
  delete data.pictureId;
  let picture;

  try {
    switch (data.intent) {
      case 'create':
        picture = await createNewPicture(data);
        break;
      case 'update':
        picture = await updatePicture(data, pictureId);
        break;
      default:
        break;
    }
  } catch (error) {
    toast.error(`Algo ha salido mal: ${error.message}`);
    console.log(error);
    return error;
  }

  return redirect(`/admin/${sectionName}/${picture.friendlyUrlName}`);
};

const createNewPicture = async (data) => {
  const file = document.getElementById('file-upload');

  try {
    const { data: imagekitAuth } = await customFetch.get('/auth/imagekit');
    const { data: section } = await customFetch.get(
      `/sections/${data.sectionId}`
    );

    const imagekitResult = await imagekit.upload({
      file: file.files[0],
      fileName: `${data.name}`,
      ...imagekitAuth,
      useUniqueFileName: false,
      folder: `/ceci-rod-fotos/${section.friendlyUrlName}`,
      extensions: [
        {
          name: 'aws-auto-tagging',
          minConfidence: 80,
          maxTags: 10,
        },
      ],
    });

    data.url = imagekitResult.url;
    data.imagekitId = imagekitResult.fileId;

    const { data: axiosResult } = await customFetch.post('/pictures', data);
    toast.success(`'${axiosResult.picture.name}' creada con éxito`);
    return axiosResult.picture;
  } catch (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
};

const updatePicture = async (data, pictureId) => {
  const { data: axiosResult } = await customFetch.patch(
    `/pictures/${pictureId}`,
    data
  );
  toast.success(`'${axiosResult.updatedPicture.name}' actualizada con éxito`);
  return axiosResult.updatedPicture;
};

const PictureEditor = () => {
  const {
    isConfirmationModalVisible,
    setIsConfirmationModalVisible,
    isEditMode,
    setIsEditMode,
    isNewPicture,
    setIsNewPicture,
    setHasPictureFile,
  } = usePictureEditorContext();
  const { sectionName } = useParams();
  const { setCurrentPictureName } = useAdminContext();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const picture = useLoaderData();

  const { url, name } = picture;
  const navigation = useNavigation();

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

  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    setIsEditMode(false);
  }, [isSubmitting]);

  const deletePicture = async () => {
    try {
      const { data } = await customFetch.delete(`/pictures/${picture._id}`);
      setIsConfirmationModalVisible(false);
      setCurrentPictureName('');
      navigate(`/admin/${sectionName}`);
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
        <input type="hidden" name="sectionId" value={picture.sectionId || ''} />
        <input type="hidden" name="pictureId" value={picture._id || ''} />
        <div className="left-column">
          {pictureProps.map((prop) => {
            return (
              <PictureEditorFormRow
                key={prop}
                name={prop}
                initialValue={picture[prop] || ''}
                isDisabled={!isEditMode || isSubmitting}
              />
            );
          })}
          <ButtonStrip />
        </div>

        <div className="right-column">
          {isNewPicture ? (
            <img src="" alt="" id="image-preview" />
          ) : (
            <IKImage
              urlEndpoint={urlEndpoint}
              src={url}
              transformation={[
                {
                  width: 412,
                },
              ]}
            />
          )}
          {isEditMode && isNewPicture && <ImageInput />}
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
