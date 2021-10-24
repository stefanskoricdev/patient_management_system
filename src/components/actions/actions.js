import db from "../../services/firebase";
import {
  ErrorMessage,
  SuccessMessage,
  WarningMessage,
} from "../UI/Messages/Messages";

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
  WarningMessage(
    "Are you sure you want to delete data?",
    "You won't be able to revert this!"
  ).then((result) => {
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
          SuccessMessage("Deleted!", "Your data has been deleted successfully");
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
  updatedData
) => {
  setLoading(true);
  db.collection(collection)
    .doc(targetId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setLoading(false);
        setState(updatedData);
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
//Has to be upgraded more. Add messages and stuff!
export const deletePhysio = (
  collection,
  physio,
  patients,
  patientsCollection
) => {
  WarningMessage(
    "Are you sure you want to delete data?",
    "You won't be able to revert this!"
  ).then((result) => {
    if (result.isConfirmed) {
      db.collection(collection)
        .doc(physio.id)
        .delete()
        .then(() => {
          const targetedPatients = patients.filter(
            (patient) => patient.physiotherapist === physio.firstName
          );
          if (targetedPatients.length < 1) {
            return;
          }
          targetedPatients.forEach((patient) => {
            db.collection(patientsCollection)
              .doc(patient.id)
              .delete()
              .then(() => {
                SuccessMessage("Deleted!", "Data has been deleted!");
              })
              .catch((err) => ErrorMessage(err));
          });
        })
        .catch((error) => {
          ErrorMessage(error);
        });
    }
  });
};
