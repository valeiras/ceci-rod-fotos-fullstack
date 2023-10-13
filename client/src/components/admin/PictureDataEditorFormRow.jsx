/* eslint-disable react/prop-types */
import styled from 'styled-components';
const PictureDataEditorFormRow = ({ name, tag, value, isDisabled }) => {
  return (
    <Wrapper className="form-row">
      <label htmlFor={name} className="admin-form-label">
        {tag}:
      </label>
      <input
        className="form-input"
        type="text"
        name={name}
        defaultValue={value}
        disabled={isDisabled}
        required
      />
    </Wrapper>
  );
};
export default PictureDataEditorFormRow;

const Wrapper = styled.div`
  .admin-form-label {
    text-transform: capitalize;
  }
`;
