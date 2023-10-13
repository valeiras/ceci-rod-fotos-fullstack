/* eslint-disable react/prop-types */
import { AiFillSave, AiFillEdit, AiFillDelete } from 'react-icons/ai';

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

export const DeleteButton = ({ setIsConfirmationModalVisible }) => {
  return (
    <button
      className="btn edit-btn"
      onClick={() => {
        setIsConfirmationModalVisible(true);
      }}
    >
      <AiFillDelete />
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
