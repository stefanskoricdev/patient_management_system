import styles from "./AddEditGroupPhysioForm.module.scss";
import { useContext, useState } from "react";
import { WarningMessage } from "../../../UI/Messages/Messages";
import { sendData } from "../../../actions/actions";
import { useHistory } from "react-router-dom";
import FormInput from "../../../UI/Forms/FormInput/FormInput";
import validateForm from "../../../../helpers/validateForm";
import uuid from "react-uuid";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";

const AddEditGroupPhysioForm = ({ workingHours, rootPath }) => {
  const appCtx = useContext(AppContext);
  const { physiosCollection, setIsLoading, setPhysios } = appCtx;

  const history = useHistory();

  let initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    groupConfig: [
      {
        workingDays: "mon/wed",
        workingHours: "08:00",
      },
    ],
  };

  const [inputValues, setInputValues] = useState(initialValue);
  const [groupConfig, setGroupConfig] = useState(initialValue.groupConfig[0]);
  const [group, setGroup] = useState([]);

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

  const createGroupHandler = (e) => {
    e.preventDefault();
    setGroup((prevState) => [...prevState, groupConfig]);
  };

  const removeGroupItemHandler = (e) => {
    const itemIndex = e.currentTarget.dataset.index;
    const itemsList = [...group];
    const updatedItemsList = itemsList.filter(
      (_, i) => i !== parseInt(itemIndex)
    );
    setGroup(updatedItemsList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = validateForm(inputValues);
    if (!validate) return;

    if (group.length < 1) {
      WarningMessage(
        "",
        "Please create groups for selected physio",
        false,
        "Back"
      );
    }
    //Transform group config to remove duplicates in working days
    //and woking hours section

    const { firstName, lastName, email, phoneNumber } = inputValues;

    const newGroupPhysio = {
      id: uuid(),
      firstName,
      lastName,
      email,
      phoneNumber,
      groupCfg: group,
      physioType: "group",
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };

    sendData(setIsLoading, physiosCollection, newGroupPhysio, setPhysios);
    history.push("/settings");
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.Form}>
      <h2>Add Group Physio</h2>
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
            {workingHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </label>
        <button onClick={createGroupHandler}>Create</button>
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
      </div>
      <button className={styles.SubmitBtn}>Add</button>
    </form>
  );
};

export default AddEditGroupPhysioForm;
