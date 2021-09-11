import db from "../../services/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const sendData = (setLoading, collection, newData, setState) => {
  setLoading(true);
  db.collection(collection)
    .doc(newData.id)
    .set(newData)
    .then(() => {
      setLoading(false);
      setState((prevState) => [...prevState, newData]);
      mySwal.fire({
        title: "Success!",
        icon: "success",
        customClass: { container: "alert-modal" },
      });
    })
    .catch((error) => {
      setLoading(false);
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
      title: `Are you sure you want to delete data?`,
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
              text: "Data has been deleted",
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
            date: patient.data().date,
          };
          patientsList.push(singlePatient);
          setLoading(false);
        });
        setState(patientsList);
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

export const getNotes = (setLoading, setState, collection) => {
  setLoading(true);
  db.collection(collection)
    .orderBy("dateCreated", "asc")
    .get()
    .then((notes) => {
      let notesList = [];
      if (notes.docs.length > 0) {
        notes.forEach((note) => {
          const singleNote = {
            id: note.data().id,
            title: note.data().title,
            isChecked: note.data().isChecked,
            author: note.data().author,
            date: note.data().date,
          };
          notesList.push(singleNote);
        });
      }
      setState(notesList);
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

export const updateNote = (setLoading, collection, targetId) => {
  setLoading(true);
  db.collection(collection)
    .doc(targetId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setLoading(false);
        return doc.ref.update({ isChecked: !doc.data().isChecked });
      } else {
        throw new Error("Note does not exist");
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

export const getUsers = (setLoading, setState, collection) => {
  setLoading(true);
  db.collection(collection)
    .get()
    .then((users) => {
      let usersList = [];
      if (users.docs.length > 0) {
        users.forEach((user) => {
          const singleUser = {
            id: user.data().id,
            firstName: user.data().firstName,
            lastName: user.data().lastName,
            email: user.data().email,
          };
          console.log(singleUser);
          usersList.push(singleUser);
        });
      }
      setState(usersList);
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
