import styles from "./AddEditGroupPhysioForm.module.scss";
import { useContext, useState } from "react";
import { ErrorMessage, WarningMessage } from "../../../UI/Messages/Messages";
import {
  batchDeletePatients,
  sendData,
  updateData,
} from "../../../actions/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import FormInput from "../../../UI/Forms/FormInput/FormInput";
import validateForm from "../../../../helpers/validateForm";
import uuid from "react-uuid";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const AddEditGroupPhysioForm = ({ workingHours, rootPath }) => {
  const appCtx = useContext(AppContext);
  const {
    physiosCollection,
    setIsLoading,
    setPhysios,
    physios,
    groupsCollection,
    groupPatients,
    setGroupPatients,
  } = appCtx;

  const {
    params: { id },
  } = useRouteMatch();
  const history = useHistory();

  const isAddMode = !id;

  let groupPhysioToEdit = !isAddMode
    ? physios.find((physio) => physio.id === id)
    : null;

  let initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    groupConfig: [],
  };

  if (physios.length < 1 && !isAddMode) history.push(rootPath);
  //This prevents issues if reloading page in !isAddMode!

  if (!isAddMode && physios.length > 0) {
    //groupPhysioToEdit = physios.find((physio) => physio.id === id);
    const { firstName, lastName, email, phoneNumber, groupCfg } =
      groupPhysioToEdit;
    initialValue = {
      firstName,
      lastName,
      email,
      phoneNumber,
      groupConfig: groupCfg,
    };
  }

  const [inputValues, setInputValues] = useState(initialValue);
  const [groupConfig, setGroupConfig] = useState([]);
  const [group, setGroup] = useState(initialValue.groupConfig);

  const basicInfoInputs = [
    {
      label: "First Name:",
      name: "firstName",
      type: "text",
      value: inputValues.firstName,
    },
    {
      label: "Last Name:",
      name: "lastName",
      type: "text",
      value: inputValues.lastName,
    },
    { label: "Email:", name: "email", type: "email", value: inputValues.email },
    {
      label: "Phone Number:",
      name: "phoneNumber",
      type: "tel",
      value: inputValues.phoneNumber,
    },
  ];

  const handleBasicInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handleGroupCfgChange = (e) => {
    const { name, value } = e.target;
    setGroupConfig((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const checkIsGroupTaken = (arr, val) => {
    return arr.some((arrValue) => {
      return JSON.stringify(arrValue) === JSON.stringify(val);
    });
  };

  const createGroupHandler = (e) => {
    e.preventDefault();
    const isTaken = checkIsGroupTaken(group, groupConfig);
    if (isTaken) {
      WarningMessage(
        "This group is taken",
        "Please create another group",
        false,
        "Back"
      );
      return;
    }
    setGroup((prevState) => [...prevState, groupConfig]);
  };

  const handleQuery = (query, batch, setState, additionalData) => {
    query.forEach((doc) => {
      if (
        doc.ref.id.includes(
          `${additionalData.id}-${additionalData.workingDays}-${additionalData.workingHours}`
        )
      ) {
        batch.delete(doc.ref);
        setState((prevState) =>
          prevState.filter((pat) => pat.id !== doc.ref.id)
        );
      }
    });
  };

  const removeGroupItemHandler = (e) => {
    const itemIndex = e.currentTarget.dataset.index;
    const itemsList = [...group];
    const updatedItemsList = itemsList.filter(
      (_, i) => i !== parseInt(itemIndex)
    );
    const targetedItem = itemsList[itemIndex];

    const targetedPatients = groupPatients.filter((patient) => {
      if (
        patient.physioId === id &&
        patient.appointment.day === targetedItem.workingDays &&
        patient.appointment.time === targetedItem.workingHours
      ) {
        return patient;
      }
      return false;
    });

    if (group.length < 2) {
      WarningMessage(
        "Please create groups for selected physio",
        "You can not delete all groups. Delete physio instead if you need, but be aware all its patients will be lost!",
        false,
        "Back"
      );
      return;
    }

    if (!isAddMode && targetedPatients.length > 0) {
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
            batchDeletePatients(
              groupsCollection,
              "physioId",
              id,
              setGroupPatients,
              setIsLoading,
              handleQuery,
              {
                id,
                workingDays: targetedItem.workingDays,
                workingHours: targetedItem.workingHours,
              }
            );
          }
        })
        .then(() => {
          setGroup(updatedItemsList);
        })
        .catch((err) => {
          setIsLoading(false);
          ErrorMessage(err);
        });
      return;
    }
    setGroup(updatedItemsList);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const { firstName, lastName, email, phoneNumber } = inputValues;

    const validate = validateForm(inputValues);
    if (!validate) return;

    const physioExists = physios.find((physio) => {
      if (
        physio.physioType === "group" &&
        physio.firstName === firstName &&
        physio.lastName === lastName
      ) {
        return physio;
      }
      return false;
    });
    if (isAddMode && physioExists) {
      WarningMessage(
        "This physio allready exists!",
        "Please create another physio",
        false,
        "Back"
      );
      return;
    }

    if (group.length < 1) {
      WarningMessage(
        "",
        "Please create groups for selected physio",
        false,
        "Back"
      );
      return;
    }
    //Transform group config to remove duplicates in working days
    //and woking hours section

    const newGroupPhysio = {
      id: isAddMode ? uuid() : id,
      firstName,
      lastName,
      email,
      phoneNumber,
      groupCfg: group,
      physioType: "group",
      dateCreated: isAddMode
        ? firebase.firestore.FieldValue.serverTimestamp()
        : groupPhysioToEdit.dateCreated,
    };

    if (isAddMode) {
      sendData(setIsLoading, physiosCollection, newGroupPhysio, setPhysios);
    } else {
      const targetedPhysioIndex = physios.findIndex(
        (physio) => physio.id === id
      );
      const updatedPhysioList = [...physios];
      updatedPhysioList[targetedPhysioIndex] = newGroupPhysio;
      updateData(
        setIsLoading,
        physiosCollection,
        id,
        newGroupPhysio,
        setPhysios,
        updatedPhysioList
      );
    }

    history.push(rootPath);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.Form}>
      <h2>{isAddMode ? "Add Group Physio" : "Edit Group Physio"}</h2>
      <div className={styles.BasicInfo}>
        {basicInfoInputs.map((info) => {
          const { label, name, type, value } = info;
          return (
            <FormInput
              key={name}
              label={label}
              name={name}
              type={type}
              value={value}
              onChange={handleBasicInputChange}
            />
          );
        })}
      </div>
      <div className={styles.CreateGroup}>
        <h3>Create Group:</h3>
        <label>
          Select Working Days:
          <select onChange={handleGroupCfgChange} name="workingDays">
            <option value=""></option>
            <option value="mon-wed">MON/WED</option>
            <option value="mon-thu">MON/THU</option>
            <option value="mon-fri">MON/FRI</option>
            <option value="tue-thu">TUE/THU</option>
            <option value="tue-fri">TUE/FRI</option>
            <option value="wed-fri">WED/FRI</option>
          </select>
        </label>
        <label>
          Select Working Hours:
          <select onChange={handleGroupCfgChange} name="workingHours">
            <option value=""></option>
            {workingHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </label>
        {groupConfig.workingDays && groupConfig.workingHours && (
          <button onClick={createGroupHandler}>Create</button>
        )}
        {group.length > 0 && (
          <div className={styles.GroupCfgPreview}>
            {group.map((item, i) => (
              <p
                data-index={i}
                onClick={removeGroupItemHandler}
                key={i + item.workingDays + item.workingHours}
              >
                <i className="fas fa-times"></i>
                {item.workingDays} {item.workingHours}
              </p>
            ))}
          </div>
        )}
      </div>
      <button className={styles.SubmitBtn}>{isAddMode ? "Add" : "Edit"}</button>
    </form>
  );
};

export default AddEditGroupPhysioForm;
