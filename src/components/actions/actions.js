import db from "../../services/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const sendData = (setLoading, collection, newData) => {
  setLoading(true);
  db.collection(collection)
    .doc(newData.id)
    .set(newData)
    .then(() => {
      setLoading(false);
      mySwal.fire({
        title: "Success!",
        text: `New ${collection} have been created`,
        icon: "success",
        customClass: { container: "alert-modal" },
      });
    })
    .catch((error) => {
      mySwal.fire({
        title: "Something went wrong!",
        text: `${error}`,
        icon: "error",
        customClass: { container: "alert-modal" },
      });
    });
};

export const deleteData = (setLoading, setState, collection, targetId) => {
  mySwal
    .fire({
      title: `Are you sure you want to delete ${collection}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(197, 27, 21)",
      cancelButtonColor: "rgb(101, 195, 157)",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        db.collection(collection)
          .doc(targetId)
          .delete()
          .then(() => {
            setState((prevState) =>
              prevState.filter((patient) => patient.id !== targetId)
            );
            setLoading(false);
            mySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted",
              icon: "success",
              customClass: { container: "alert-modal" },
            });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            mySwal.fire({
              title: "Something went wrong!!",
              text: `${error}`,
              icon: "error",
              customClass: { container: "alert-modal" },
            });
          });
      }
    });
};

export const getData = (setLoading, setState, collection) => {
  let patientsList = [];
  setLoading(true);
  db.collection(collection)
    .get()
    .then((patients) => {
      if (patients.docs.length > 0) {
        patients.forEach((patient) => {
          const singlePatient = {
            id: patient.data().id,
            firstName: patient.data().firstName,
            lastName: patient.data().lastName,
            city: patient.data().city,
            address: patient.data().address,
            gender: patient.data().gender,
            phone: patient.data().phone,
            dateOfBirth: patient.data().dateOfBirth,
            observation: patient.data().observation,
            physiotherapist: patient.data().physiotherapist,
          };
          patientsList.push(singlePatient);
          setLoading(false);
        });
        setState(patientsList);
      } else {
        mySwal.fire({
          title: `There is no stored patients`,
          text: "Please add patients to schedules",
          icon: "error",
          customClass: { container: "alert-modal" },
        });
        setLoading(false);
      }
    })
    .catch((error) => {
      setLoading(false);
      mySwal.fire({
        title: "Something went wrong!!",
        text: `${error}`,
        icon: "error",
        customClass: { container: "alert-modal" },
      });
    });
};

export const getTasks = (setLoading, setState, collection) => {
  setLoading(true);
  db.collection(collection)
    .get()
    .then((tasks) => {
      let tasksList = [];
      if (tasks.docs.length > 0) {
        tasks.forEach((task) => {
          const singleTask = {
            id: task.data().id,
            title: task.data().title,
            isChecked: task.data().isChecked,
            author: task.data().author,
          };
          tasksList.push(singleTask);
        });
      }
      setState(tasksList);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      mySwal.fire({
        title: "Something went wrong!!",
        text: `${error}`,
        icon: "error",
        customClass: { container: "alert-modal" },
      });
    });
};

export const updateTask = (setLoading, collection, targetId) => {
  setLoading(true);
  db.collection(collection)
    .doc(targetId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setLoading(false);
        return doc.ref.update({ isChecked: !doc.data().isChecked });
      } else {
        throw new Error("Task does not exist");
      }
    })
    .catch((error) => {
      setLoading(false);
      mySwal.fire({
        title: "Something went wrong!!",
        text: `${error}`,
        icon: "error",
        customClass: { container: "alert-modal" },
      });
    });
};
