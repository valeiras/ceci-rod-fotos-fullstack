/* eslint-disable react/prop-types */
import {
  AiFillSave,
  AiFillEdit,
  AiFillDelete,
  AiFillCloseCircle,
} from 'react-icons/ai';

const SubmitButton = ({ icon, intent }) => {
  return (
    <button className="btn edit-btn" type="submit" name="intent" value={intent}>
      {icon}
    </button>
  );
};

export const UpdateButton = () => {
  return SubmitButton({ icon: <AiFillSave />, intent: 'update' });
};

export const CreateButton = () => {
  return SubmitButton({ icon: <AiFillSave />, intent: 'create' });
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
