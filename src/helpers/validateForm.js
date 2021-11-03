import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const errorModal = (message) => {
  mySwal.fire({
    icon: "warning",
    title: <p>{message}</p>,
    customClass: {
      container: "alert-modal",
    },
  });
};

const validateForm = (inputValues, checkboxInputs = false) => {
  const findEmptyInputHandler = () => {
    for (const key in inputValues) {
      if (inputValues[key] === "") {
        return false;
      }
    }
    return true;
  };

  const textInputsValue = findEmptyInputHandler();

  const pattern = /^\d{9}$/;

  const checkboxInputIsValid = checkboxInputs
    ? checkboxInputs.map((input) =>
        input.some((inp) => inp === true) ? true : false
      )
    : [true];

  if (!textInputsValue || checkboxInputIsValid.includes(false)) {
    errorModal("Please fill out all input fields");
    return false;
  }

  if (inputValues.email && !inputValues.email.includes("@")) {
    errorModal("Please enter valid email");
    return false;
  }
  if (inputValues.password && inputValues.password.length < 6) {
    errorModal(
      "Please enter valid password. It should be at least 6 characters long!"
    );
    return false;
  }
  if (
    inputValues.phoneNumber &&
    pattern.test(inputValues.phoneNumber) === false
  ) {
    errorModal("Please enter valid phone number!");
    return false;
  }
  return true;
};

export default validateForm;
