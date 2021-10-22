import FilterInputs from "./FilterInputs/FilterInputs";

const FilterForm = ({ submit, inputs }) => {
  return (
    <form onSubmit={submit}>
      {inputs.map((input) => {
        const { label, name, type, inputRef } = input;
        return (
          <FilterInputs
            key={input.name}
            label={label}
            name={name}
            type={type}
            ref={inputRef}
          />
        );
      })}

      <button>
        <i className="fas fa-filter"></i> Filter
      </button>
    </form>
  );
};

export default FilterForm;
