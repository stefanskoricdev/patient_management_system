import db from "../../services/firebase";
import { ErrorMessage, SuccessMessage } from "../UI/Messages/Messages";

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
      ErrorMessage(error);
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
      SuccessMessage("Success", "Your data has been created successfully");
    })
    .catch((error) => {
      setLoading(false);
      ErrorMessage(error);
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
      title: "Are you sure you want to delete data?",
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
              prevState.filter((data) => data.id !== targetId)
            );
            setLoading(false);
            SuccessMessage(
              "Deleted!",
              "Your data has been deleted successfully"
            );
            history.push(path);
          })
          .catch((error) => {
            setLoading(false);
            ErrorMessage(error);
          });
      }
    });
};

export const updateData = (
  setLoading,
  collection,
  targetId,
  data,
  setState,
  updatedData,
  storageKeys = [],
  storageValues = []
) => {
  setLoading(true);
  console.log(storageKeys);
  console.log(storageValues);
  db.collection(collection)
    .doc(targetId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setLoading(false);
        setState(updatedData);
        if (storageKeys.length > 0) {
          storageKeys.forEach((key, i) => {
            localStorage.setItem(`${key}`, `${storageValues[i]}`);
          });
        }
        SuccessMessage("Success", "Your data has been updated successfully");
        return doc.ref.update(data);
      } else {
        throw new Error("Data does not exist");
      }
    })
    .catch((error) => {
      setLoading(false);
      ErrorMessage(error);
    });
};

export const deletePhysio = (
  physiosCollection,
  physio,
  setPhysios,
  patients,
  patientsCollection,
  setPatients
) => {
  mySwal
    .fire({
      title: "Are you sure you want to delete data?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(197, 27, 21)",
      cancelButtonColor: "rgb(101, 195, 157)",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        db.collection(physiosCollection)
          .doc(physio.id)
          .delete()
          .then(() => {
            setPhysios((prevState) =>
              prevState.filter((data) => data.id !== physio.id)
            );
            //Delete targeted physio and then delete all its patients
            const targetedPatients = patients.filter(
              (patient) => patient.physiotherapist === physio.firstName
            );
            if (targetedPatients.length < 1) {
              return;
            }
            batchDelete(patientsCollection, physio.firstName, setPatients);
          })
          .catch((error) => {
            ErrorMessage(error);
          });
      }
    });
};

export const batchDelete = (collection, physio, setPatients) => {
  db.collection(collection)
    .where("physiotherapist", "==", physio)
    .get()
    .then((query) => {
      const batch = db.batch();

      query.forEach((doc) => {
        batch.delete(doc.ref);
        setPatients((prevState) =>
          prevState.filter((data) => data.id !== doc.ref.id)
        );
      });

      return batch.commit();
    })
    .then(() => {
      SuccessMessage("Deleted!", "Data has been deleted!");
    })
    .catch((err) => ErrorMessage(err));
};
