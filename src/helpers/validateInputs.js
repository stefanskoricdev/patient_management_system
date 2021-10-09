import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const validateInputs = (inputs, checkInputs = [true]) => {
  const textInputsValue = inputs.filter(
    (input) => input.current.value.trim() === ""
  );

  const checkInputIsValid = checkInputs
    .reduce((currValue, prevValue) => {
      return currValue + prevValue;
    }, [])
    .includes(true);

  const emailInput = inputs.find((input) => input.current.type === "email");
  const passwordInput = inputs.find(
    (input) => input.current.type === "password"
  );

  if (emailInput && !emailInput.current.value.includes("@")) {
    mySwal.fire({
      icon: "warning",
      title: <p>Please include an "@" in the email adress</p>,
      customClass: {
        container: "alert-modal",
      },
    });
    return false;
  }

  if (passwordInput && passwordInput.current.value.length < 6) {
    mySwal.fire({
      icon: "warning",
      title: <p>Password has to be more then 7 characters long</p>,
      customClass: {
        container: "alert-modal",
      },
    });
    return false;
  }

  if (textInputsValue.length > 0 || !checkInputIsValid) {
    mySwal.fire({
      icon: "warning",
      title: <p>Please fill out all fields</p>,
      customClass: {
        container: "alert-modal",
      },
    });
    return false;
  }
  return true;
};

export default validateInputs;
