import { forwardRef } from "react";
const FilterInputs = forwardRef(({ label, name, type }, ref) => {
  return (
    <label>
      {label}
      <input name={name} type={type} ref={ref} />
    </label>
  );
});

export default FilterInputs;
