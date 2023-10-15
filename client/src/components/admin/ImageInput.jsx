import { AiOutlineUpload } from 'react-icons/ai';
import { usePictureEditorContext } from './pictureEditorContext';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const ImageInput = () => {
  const { isNewPicture, hasPictureFile, setHasPictureFile } =
    usePictureEditorContext();

  const handleImageInput = () => {
    const fileInput = document.getElementById('file-upload');
    setHasPictureFile(true);
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = document.getElementById('image-preview');
        img.setAttribute('src', evt.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  return (
    <Wrapper>
      <label htmlFor="file-upload" className="btn upload-btn">
        <span className="upload-icon">
          <AiOutlineUpload />
        </span>
        {hasPictureFile ? 'Actualizar imagen' : 'Subir imagen'}
      </label>
      {isNewPicture ? (
        <input
          id="file-upload"
          name="imgFile"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageInput}
          required
        />
      ) : (
        <input
          id="file-upload"
          name="imgFile"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageInput}
        />
      )}
    </Wrapper>
  );
};
export default ImageInput;

const Wrapper = styled.div`
  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .custom-img-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }

  .upload-btn {
    align-self: self-start;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: fit-content;
    margin: 1.5rem auto 0;
  }
  .upload-icon {
    font-size: 1.2rem;
    display: flex;
  }
`;
