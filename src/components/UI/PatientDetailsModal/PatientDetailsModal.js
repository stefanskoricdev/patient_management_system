import styles from "./PatientDetailsModal.module.scss";
import { useState } from "react";
import { getAge } from "../../../helpers/getAge";
import { deleteData } from "../../actions/actions";
import maleAvatar from "../../../assets/img/male_avatar.svg";
import femaleAvatar from "../../../assets/img/female_avatar.svg";
import dotsIcon from "../../../assets/img/dots_icon.png";

const PatientDetailsModal = ({
  patients,
  patientId,
  setLoading,
  setPatients,
  setIsModalOpen,
  collection,
}) => {
  const targetedPatientIndex = patients.findIndex(
    (patient) => patient.id === patientId
  );
  const targetedPatient = patients[targetedPatientIndex];

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const openOptionsHandler = (e) => {
    if (e.target.id === "options-btn") {
      setIsOptionsOpen(true);
    } else {
      setIsOptionsOpen(false);
    }
  };

  return (
    <section onClick={openOptionsHandler} className={styles.PatientDetailModal}>
      <header className={styles.Header}>
        <div className={styles.Options}>
          <button>
            <img id="options-btn" src={dotsIcon} alt="dots" />
          </button>
          <div
            className={
              !isOptionsOpen
                ? styles.OptionsList
                : [styles.OptionsList, styles["active"]].join(" ")
            }
          >
            <ul>
              <li
                onClick={() => {
                  deleteData(
                    setLoading,
                    setPatients,
                    collection,
                    targetedPatient.id
                  );
                  setIsModalOpen(false);
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
        <svg
          height="100%"
          width="100%"
          id="svg"
          viewBox="0 0 1440 700"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,700 C 0,700 0,175 0,175 C 45.24493301271039,149.28237718996908 90.48986602542078,123.56475437993817 167,145 C 243.51013397457922,166.43524562006183 351.28546891102724,235.0233596702164 431,224 C 510.71453108897276,212.9766403297836 562.3682583304706,122.34180693919618 618,121 C 673.6317416695294,119.65819306080382 733.2414977670903,207.609412572999 813,212 C 892.7585022329097,216.390587427001 992.6657506011679,137.22054276880795 1057,129 C 1121.334249398832,120.77945723119204 1150.0954998282377,183.50841635176914 1208,203 C 1265.9045001717623,222.49158364823086 1352.9522500858811,198.74579182411543 1440,175 C 1440,175 1440,700 1440,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="#64656a66"
            className="transition-all duration-300 ease-in-out delay-150"
            transform="rotate(-180 720 350)"
          ></path>
          <path
            d="M 0,700 C 0,700 0,350 0,350 C 58.164204740638965,365.2071453108897 116.32840948127793,380.41429062177946 181,391 C 245.67159051872207,401.58570937822054 316.85056681552726,407.54998282377187 395,391 C 473.14943318447274,374.45001717622813 558.2693232566129,335.38577808313295 637,334 C 715.7306767433871,332.61422191686705 788.0721401580214,368.90690484369634 843,372 C 897.9278598419786,375.09309515630366 935.4421161113019,344.98660254208176 1007,346 C 1078.5578838886981,347.01339745791824 1184.1593953967708,379.14668498797664 1262,385 C 1339.8406046032292,390.85331501202336 1389.9203023016146,370.4266575060117 1440,350 C 1440,350 1440,700 1440,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="#64656a88"
            className="transition-all duration-300 ease-in-out delay-150"
            transform="rotate(-180 720 350)"
          ></path>
          <path
            d="M 0,700 C 0,700 0,525 0,525 C 64.20680178632773,494.12401236688424 128.41360357265546,463.2480247337685 205,473 C 281.58639642734454,482.7519752662315 370.55238749570594,533.1319134318103 433,542 C 495.44761250429406,550.8680865681897 531.3768464445208,518.2243215389901 589,492 C 646.6231535554792,465.7756784610099 725.940226726211,445.9708004122295 810,466 C 894.059773273789,486.0291995877705 982.8622466506358,545.8924768120921 1061,570 C 1139.1377533493642,594.1075231879079 1206.6107866712468,582.4592923394023 1268,569 C 1329.3892133287532,555.5407076605977 1384.6946066643766,540.2703538302989 1440,525 C 1440,525 1440,700 1440,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="#64656aff"
            className="transition-all duration-300 ease-in-out delay-150"
            transform="rotate(-180 720 350)"
          ></path>
        </svg>
      </header>
      <main className={styles.Main}>
        <div className={styles.Avatar}>
          <img
            src={targetedPatient.gender === "male" ? maleAvatar : femaleAvatar}
            alt="avatar"
          ></img>
        </div>
        <section className={styles.MainInfo}>
          <h2>{`${targetedPatient.firstName} ${targetedPatient.lastName}`}</h2>
          <p>
            {`${getAge(targetedPatient.dateOfBirth)} years`},{" "}
            {targetedPatient.city}
          </p>
          <p>{targetedPatient.address}</p>
          <p>{targetedPatient.phone}</p>
          <p>{`Date acquired: ${targetedPatient.date}`}</p>
        </section>
        <section className={styles.Observation}>
          <h3>Observation:</h3>
          <p>{targetedPatient.observation}</p>
        </section>
      </main>
    </section>
  );
};
export default PatientDetailsModal;
