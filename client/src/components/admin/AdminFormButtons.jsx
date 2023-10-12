/* eslint-disable react/prop-types */
import { AiFillSave, AiFillEdit, AiFillDelete } from 'react-icons/ai';

export const SaveButton = ({ toggleEdit, submit }) => {
  return (
    <button
      className="btn edit-btn"
      type="submit"
      onClick={(evt) => {
        submit(evt.currentTarget);
        toggleEdit();
      }}
    >
      <AiFillSave />
    </button>
  );
};

export const ToggleEditButton = ({ toggleEdit }) => {
  return (
    <button className="btn edit-btn" onClick={toggleEdit}>
      <AiFillEdit />
    </button>
  );
};

export const DeleteButton = ({ toggleEdit }) => {
  return (
    <button className="btn edit-btn" onClick={toggleEdit}>
      <AiFillDelete />
    </button>
  );
};
