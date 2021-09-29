import styles from "./PatientDetailsModal.module.scss";
import { useParams } from "react-router-dom";
import { useContext, Fragment } from "react";
import { getAge } from "../../../helpers/getAge";
import AppContext from "../../../store/AppProvider";
import maleAvatar from "../../../assets/img/male_avatar.svg";
import femaleAvatar from "../../../assets/img/female_avatar.svg";

const PatientDetailsModal = () => {
  const { id } = useParams();
  const appCtx = useContext(AppContext);
  const { individualPatients } = appCtx;

  const targetedPatient = individualPatients
    .filter((patient) => patient.id === id)
    .map((pat, i) => {
      console.log(pat);
      const age = getAge(pat.dateOfBirth);
      return (
        <Fragment key={i}>
          <header>
            <div>
              <img
                src={pat.gender === "male" ? maleAvatar : femaleAvatar}
                alt="avatar"
              />
            </div>
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
              <i className="fas fa-user-circle"></i>
              {`Date acquired: ${pat.date}`}
            </p>
            <div className={styles.Observation}>
              <h2>Observation:</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tincidunt purus id libero auctor, vitae cursus tellus lobortis.
                Proin malesuada risus eu scelerisque tristique. In hac habitasse
                platea dictumst. Sed tincidunt nibh vitae suscipit pharetra.
                Vivamus arcu justo, aliquam vel velit non, tincidunt vulputate
                ante. Phasellus congue dictum felis quis iaculis. Sed nisi
                massa, sodales vel nisl ac, accumsan ornare leo. Sed id eros mi.
                Quisque iaculis lorem lorem, eu auctor nisi egestas at. Maecenas
                eget aliquam leo, a gravida nisl. Cras at dui ultricies,
                tincidunt sem et, tempus turpis. Nulla in tincidunt nisi.
                Suspendisse porta vitae nulla sit amet iaculis. Suspendisse sed
                ligula nec enim suscipit congue. Etiam eget eros et libero
                eleifend pulvinar ac nec eros. Fusce lacinia nunc dui, non
                viverra orci fermentum mattis.
              </p>
            </div>
          </main>
        </Fragment>
      );
    });
  return (
    <section className={styles.PatientDetailsWrapper}>
      {targetedPatient}
    </section>
  );
};

export default PatientDetailsModal;
