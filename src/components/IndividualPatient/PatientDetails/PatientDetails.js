import styles from "./PatientDetails.module.scss";
import { useParams, useRouteMatch, useHistory, Link } from "react-router-dom";
import { useContext, Fragment, useState } from "react";
import { getAge } from "../../../helpers/getAge";
import { deleteData, updateData } from "../../actions/actions";
import AppContext from "../../../store/AppProvider";
import maleAvatar from "../../../assets/img/male_avatar.svg";
import femaleAvatar from "../../../assets/img/female_avatar.svg";
import Popover from "../../UI/Popover/Popover";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const PatientDetails = ({ collection, physiotherapist, setShowAddPatient }) => {
  const { id } = useParams();
  //we get an id with index=someindex at the end,
  //so we need to transform it to get only ID and APPOINTMENT INDEX
  const findIndex = id.split("=").pop();
  const transformedId = id.replace("index=", "").slice(0, -findIndex.length);

  const appCtx = useContext(AppContext);
  const { individualPatients, setIndividualPatients, setIsLoading } = appCtx;

  const [popoverShow, setPopoverShow] = useState(false);

  const history = useHistory();
  const { path } = useRouteMatch();
  const customPath = path.split(":")[0];

  const optionsClickHandler = () => {
    setPopoverShow((prevValue) => !prevValue);
  };

  const targetedPatient = individualPatients.filter(
    (patient) => patient.id === transformedId
  );

  const patientDetails = targetedPatient.map((pat) => {
    const age = getAge(pat.dateOfBirth);

    const deleteHandler = () => {
      //If patient has only one appointment simply delete it!
      if (pat.appointment.length === 1) {
        deleteData(
          setIsLoading,
          setIndividualPatients,
          collection,
          transformedId,
          history,
          customPath
        );
        return;
      }
      //If patient has more then one appointment we have to update it so we dont
      //lose other appointments. We perform update and only remove selected appointment
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
            const targetedPatientIndex = individualPatients.findIndex(
              (patient) => patient.id === pat.id
            );
            pat.appointment.splice(findIndex, 1);
            const updatedPatientsList = [...individualPatients];
            updatedPatientsList[targetedPatientIndex] = pat;
            updateData(
              setIsLoading,
              collection,
              transformedId,
              pat,
              setIndividualPatients,
              updatedPatientsList
            );
            history.push(customPath);
          }
        });
    };

    return (
      <Fragment key={pat.id}>
        <header>
          <div className={styles.AvatarWrapper}>
            <img
              src={pat.gender === "male" ? maleAvatar : femaleAvatar}
              alt="avatar"
            />
          </div>
          <button onClick={optionsClickHandler} className={styles.OptionsBtn}>
            <i className="fas fa-ellipsis-h"></i>
            <Popover setIsVisible={setPopoverShow} isVisible={popoverShow}>
              <li>
                <Link
                  to={`/patients/individual-patients/${physiotherapist.firstName.toLowerCase()}${physiotherapist.lastName.toLowerCase()}/edit-patient/${id}`}
                  onClick={() => setShowAddPatient(false)}
                >
                  Edit Patient
                </Link>
              </li>
              <li>
                <Link
                  to={`/patients/individual-patients/${physiotherapist.firstName.toLowerCase()}${physiotherapist.lastName.toLowerCase()}/add-appointment/${id}`}
                  onClick={() => setShowAddPatient(false)}
                >
                  Add appointment
                </Link>
              </li>
              <li onClick={deleteHandler}>Delete</li>
            </Popover>
          </button>
        </header>
        <main>
          <h2>{`${pat.firstName} ${pat.lastName}`}</h2>
          <p>
            <i className="fas fa-map-marker-alt"></i>
            {`${pat.address}, ${pat.city}`}
          </p>
          <p>
            <i className="fas fa-calendar-check"></i>
            {`Age: ${age}`}
          </p>
          <p>
            <i className="fas fa-phone-square"></i>
            {`Phone: ${pat.phone}`}
          </p>
          <p>
            <i className="fas fa-envelope-square"></i>
            {`Email: ${pat.email}`}
          </p>
          <p>
            <i className="fas fa-user-circle"></i>
            {`Date acquired: ${pat.date}`}
          </p>
          <div className={styles.Observation}>
            <h2>Observation:</h2>
            <p>{pat.observation}</p>
          </div>
        </main>
      </Fragment>
    );
  });
  return (
    <section className={styles.PatientDetailsWrapper}>{patientDetails}</section>
  );
};

export default PatientDetails;
