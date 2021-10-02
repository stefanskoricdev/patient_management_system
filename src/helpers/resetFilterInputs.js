const resetFilterInputs = (filterInputs) => {
  filterInputs.map((filter) => (filter.current.value = ""));
};

export default resetFilterInputs;
