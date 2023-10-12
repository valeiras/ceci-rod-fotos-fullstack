/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Form, redirect, useLoaderData, useSubmit } from 'react-router-dom';

import customFetch from '../../assets/utils/customFetch';
import AdminFormRow from './AdminFormRow';
import { ToggleEditButton, SaveButton, DeleteButton } from './AdminFormButtons';
import { useAdminContext } from './adminContext';

export const loader = async ({ params }) => {
  const { pictureId } = params;
  const { data } = await customFetch(`pictures/${pictureId}`);
  return data;
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { pictureId, sectionId } = params;
  console.log('action:', data);
  console.log('pictureId:', pictureId);
  return redirect(`/admin/${sectionId}/${pictureId}`);
  // customFetch.patch('/pictures/');
};

const PictureDataEditor = () => {
  const [isEditMode, setIsEditMode] = useState(true);
  const { setCurrentPictureName } = useAdminContext();

  const toggleEdit = () => {
    setIsEditMode(!isEditMode);
  };
  const submit = useSubmit();

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

  return (
    <Wrapper>
      <div className="grid-layout">
        <Form
          className="form admin-form"
          method="post"
          state={{ some: 'value' }}
        >
          {Object.keys(iterablePicture).map((key) => {
            return (
              <AdminFormRow
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
                <SaveButton toggleEdit={toggleEdit} submit={submit} />
                <DeleteButton toggleEdit={toggleEdit} />
              </>
            )}
          </div>
        </Form>
        <img src={url} alt="" />
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
