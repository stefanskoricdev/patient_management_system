import resetFilterInputs from "./resetFilterInputs";

const filterListHandler = (e, inputs, data, setState) => {
  e.preventDefault();
  let filterValue = {};

  inputs.map((input, i) => {
    if (input.current.value.trim()) {
      filterValue[input.current.name] = input.current.value.trim();
    }
    return false;
  });

  let filteredList = data.filter((item) => {
    for (let key in filterValue) {
      if (
        item[key] === undefined ||
        item[key].toLowerCase() !== filterValue[key].toLowerCase()
      )
        return false;
    }
    resetFilterInputs(inputs);
    return item;
  });
  setState(filteredList);
};

export default filterListHandler;
