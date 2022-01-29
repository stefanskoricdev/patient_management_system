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
            history.push(path);
            setState((prevState) =>
              prevState.filter((data) => data.id !== targetId)
            );
            setLoading(false);
            SuccessMessage(
              "Deleted!",
              "Your data has been deleted successfully"
            );
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
        throw new Error("Data does not exist. Please try again later!");
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
  setPatients,
  setIsLoading,
  handleQuery,
  additionalData
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
        setIsLoading(true);
        db.collection(physiosCollection)
          .doc(physio.id)
          .delete()
          .then(() => {
            setPhysios((prevState) =>
              prevState.filter((data) => data.id !== physio.id)
            );
            //Delete targeted physio and then delete all its patients
            const targetedPatients = patients.filter(
              (patient) => patient.physioId === physio.id
            );
            if (targetedPatients.length < 1) {
              setIsLoading(false);
              return;
            }
            batchDeletePatients(
              patientsCollection,
              "physioId",
              physio.id,
              setPatients,
              setIsLoading,
              handleQuery,
              additionalData
            );
          })
          .catch((error) => {
            setIsLoading(false);
            ErrorMessage(error);
          });
      }
    });
};

export const batchDeletePatients = (
  collection,
  property,
  data,
  setPatients,
  setIsLoading,
  handleQuery,
  additionalData
) => {
  db.collection(collection)
    .where(property, "==", data)
    .get()
    .then((query) => {
      const batch = db.batch();

      handleQuery(query, batch, setPatients, additionalData);

      return batch.commit();
    })
    .then(() => {
      setIsLoading(false);
      SuccessMessage("Deleted!", "Data has been deleted!");
    })
    .catch((err) => {
      setIsLoading(false);
      ErrorMessage(err);
    });
};
