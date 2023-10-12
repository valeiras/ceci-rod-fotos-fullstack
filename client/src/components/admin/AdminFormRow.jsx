/* eslint-disable react/prop-types */
import styled from 'styled-components';
const AdminFormRow = ({ name, tag, value, isDisabled }) => {
  return (
    <Wrapper className="form-row">
      <label htmlFor={name} className="admin-form-label">
        {tag}:
      </label>
      <input
        className="form-input"
        type="text"
        name={name}
        value={value}
        disabled={isDisabled}
      ></input>
    </Wrapper>
  );
};
export default AdminFormRow;

const Wrapper = styled.div`
  .admin-form-label {
    text-transform: capitalize;
  }
`;
