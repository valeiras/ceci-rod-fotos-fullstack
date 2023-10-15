/* eslint-disable react/prop-types */
import {
  AiFillSave,
  AiFillEdit,
  AiFillDelete,
  AiFillCloseCircle,
} from 'react-icons/ai';

const SubmitButton = ({ icon, onClick }) => {
  return (
    <button className="btn edit-btn" type="submit" onClick={onClick}>
      {icon}
    </button>
  );
};

export const UpdateButton = ({ onClick }) => {
  return SubmitButton({ icon: <AiFillSave />, onClick });
};

export const CreateButton = ({ onClick }) => {
  return SubmitButton({ icon: <AiFillSave />, onClick });
};

export const DeleteButton = ({ setIsConfirmationModalVisible }) => {
  return (
    <button
      type="button"
      className="btn edit-btn"
      onClick={() => {
        setIsConfirmationModalVisible(true);
      }}
    >
      <AiFillDelete />
    </button>
  );
};

export const EnableEditModeButton = ({ toggleEdit }) => {
  return (
    <button className="btn edit-btn" onClick={toggleEdit}>
      <AiFillEdit />
    </button>
  );
};

export const DisableEditButton = ({ toggleEdit }) => {
  return (
    <button className="btn edit-btn" onClick={toggleEdit}>
      <AiFillCloseCircle />
    </button>
  );
};
