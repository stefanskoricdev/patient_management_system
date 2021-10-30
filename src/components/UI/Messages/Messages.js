import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const ErrorMessage = (err) => {
  mySwal.fire({
    title: "Something went wrong!",
    text: `${err.message}`,
    icon: "error",
    customClass: { container: "alert-modal" },
  });
};

export const SuccessMessage = (title, text) => {
  mySwal.fire({
    title: title,
    text: text,
    icon: "success",
    customClass: { container: "alert-modal" },
  });
};

export const WarningMessage = (
  title,
  text,
  showCancelButton = true,
  confirmButtonText = "Yes, delete it!"
) => {
  mySwal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: showCancelButton,
    confirmButtonColor: "rgb(197, 27, 21)",
    cancelButtonColor: "rgb(101, 195, 157)",
    confirmButtonText: confirmButtonText,
  });
};
