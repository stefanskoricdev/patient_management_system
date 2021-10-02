const resetFormInputs = (formInputs) => {
  formInputs.map((input) => (input.current.value = ""));
};

export default resetFormInputs;
