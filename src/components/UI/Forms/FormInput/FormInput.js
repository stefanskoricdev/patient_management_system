import PropTypes from "prop-types";

const FormInput = ({ label, name, type, value, onChange }) => {
  return (
    <label>
      {label}
      <input name={name} type={type} value={value} onChange={onChange} />
    </label>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default FormInput;
