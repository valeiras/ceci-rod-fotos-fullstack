/* eslint-disable react/prop-types */
const LoginFormRow = ({ type, name, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={''}
        required
      />
    </div>
  );
};
export default LoginFormRow;
