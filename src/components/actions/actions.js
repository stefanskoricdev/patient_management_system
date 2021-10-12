import db from "../../services/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const getData = (setLoading, setState, collection) => {
  setLoading(true);
  db.collection(collection)
    .orderBy("dateCreated", "asc")
    .get()
    .then((data) => {
      let dataList = [];
      if (data.docs.length > 0) {
        data.forEach((physio) => {
          let singleData = {};
          for (const key in physio.data()) {
            singleData[key] = physio.data()[key];
          }
          dataList.push(singleData);
        });
      }
      setState(dataList);
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

export const deleteData = (
  setLoading,
  setState,
  collection,
  targetId,
  history,
  path
) => {
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
            history.push(path);
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
      }
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
