import PropTypes from "prop-types";
import { forwardRef } from "react";

const FormInput = forwardRef(({ label, name, type }, ref) => {
  return (
    <label>
      {label}
      <input name={name} type={type} ref={ref} />
    </label>
  );
});

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default FormInput;
