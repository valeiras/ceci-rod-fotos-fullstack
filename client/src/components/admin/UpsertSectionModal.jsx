/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { ConfirmationModal } from '../';

import { AiFillSave, AiFillDelete } from 'react-icons/ai';

const UpsertSectionModal = ({
  isVisible,
  setIsVisible,
  title,
  upsertSection,
  deleteSection = null,
  defaultName = '',
}) => {
  const [name, setName] = useState('');
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  const closeModal = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    setIsVisible(false);
  };

  if (isVisible) {
    return (
      <Wrapper className="UpsertSectionModal" style={{ top: 0 }}>
        <ConfirmationModal
          message="¿Realmente deseas eliminar esta sección? Se elmininarán también todas las imágenes asociadas a ella"
          acceptTag="Sí, sé lo que hago"
          rejectTag="No, ¡sácame de aquí!"
          onAccept={() => {
            deleteSection();
            setIsVisible(false);
            setIsConfirmationModalVisible(false);
          }}
          isVisible={isConfirmationModalVisible}
          setIsVisible={setIsConfirmationModalVisible}
        />
        <div className="modal-content">
          <FaTimes className="close-modal-btn" onClick={closeModal} />
          <h3>{title}</h3>
          <Form className="create-section-form">
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(evt) => {
                setName(evt.target.value);
              }}
            />
            <div className="button-strip">
              <button
                type="submit"
                onClick={() => {
                  upsertSection(name);
                }}
                className="btn"
                disabled={!name}
              >
                <AiFillSave />
              </button>
              {deleteSection && (
                <button
                  type="submit"
                  onClick={() => {
                    setIsConfirmationModalVisible(true);
                  }}
                  className="btn"
                >
                  <AiFillDelete />
                </button>
              )}
            </div>
          </Form>
        </div>
      </Wrapper>
    );
  } else {
    return null;
  }
};
export default UpsertSectionModal;

const Wrapper = styled.div`
  --modal-width-mobile: 90vw;
  --modal-height-mobile: 30vh;
  --modal-width-laptop: 30vw;
  --modal-height-laptop: 20vh;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: #0f0f0fe6;
  width: 100vw;
  height: 100vh;
  animation: fade-in 0.3s ease-in-out;

  .modal-content {
    min-height: var(--modal-height-mobile);
    min-width: var(--modal-width-mobile);
    align-self: center;
    justify-self: center;
    margin: 0 auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    gap: 1rem;
    background-color: var(--color-1);
  }

  .create-section-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-input {
    width: 80%;
    font-size: 1rem;
  }

  .close-modal-btn {
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    margin-left: auto;
  }

  .close-modal-btn:hover {
    scale: 1.02;
  }

  .btn {
    min-width: 3rem;
    margin: 1rem;
  }

  @media screen and (min-width: 992px) {
    .modal-content {
      min-height: var(--modal-height-laptop);
      min-width: var(--modal-width-laptop);
    }
  }
`;
