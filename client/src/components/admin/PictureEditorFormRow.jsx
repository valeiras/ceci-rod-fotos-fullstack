/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { propsToTags } from '../../data/pictureData';
import { useEffect, useState } from 'react';
import { usePictureEditorContext } from './PictureEditorContext';

const PictureEditorFormRow = ({ name, initialValue, isDisabled }) => {
  const [value, setValue] = useState(initialValue);
  const { isFormReset } = usePictureEditorContext();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, isFormReset]);

  return (
    <Wrapper className="form-row">
      <label htmlFor={name} className="admin-form-label">
        {propsToTags[name]}:
      </label>
      <input
        className="form-input"
        type="text"
        name={name}
        value={value}
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        disabled={isDisabled}
        required
      />
    </Wrapper>
  );
};
export default PictureEditorFormRow;

const Wrapper = styled.div`
  .admin-form-label {
    text-transform: capitalize;
  }

  .form-input:disabled {
    background-color: var(--color-1);
  }
`;
