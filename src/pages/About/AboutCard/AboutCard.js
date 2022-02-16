const AboutCard = () => {
  return (
    <>
      <section>
        <h2>About</h2>
        <p>
          This is a clinical and practice management system for healthcare
          establishments, which helps user to manage patient records,
          treatments, scheduling and complete care.
          <br />
          It is fully dynamic web app which allows user to create custom health
          care professional profile and schedule. It allows you to create
          patient profile with basic info and professional examination.
          <br /> User can also use centralized dashboard to gain visibility into
          key performance indicator as well as patient listing and important
          notes made by users. <br />
          User can utilize this app using multiple devices like mobile, tablet,
          laptop or desktops.
        </p>
      </section>
      <section>
        <h2>Technologies</h2>
        <p>Project is created with:</p>
        <ul>
          <li>
            React JS(Context API and props used to manage data flow, React
            router used for routing)
          </li>
          <li>Firebase(Firestore, Firebase Auth, Firebase Storage)</li>
          <li>Scss</li>
          <li>Data visualisation with ChartJS</li>
        </ul>
        <h2>Features</h2>
        <ul>
          <li>Log in</li>
          <li>
            Admin mode:
            <ul>
              <li>Add user,</li>
              <li>
                Add physiotherapist and determine its working hours and days
                which leads to automatically creating schedule for that physio,
              </li>
              <li>Edit physios basic info, working days and hours,</li>
              <li>Delete physiotherapist.</li>
            </ul>
          </li>
          <li>
            Regular user:
            <ul>
              <li>
                Add patient with all the basic info and appointment which then
                puts that patient into schedule,
              </li>
              <li>Edit patient,</li>
              <li>Delete patient,</li>
              <li>Review each patient,</li>
              <li>
                Edit your own profile info(Basic info, profile picture, email,
                password).
              </li>
              <li>Create notes which are viewable to other users.</li>
            </ul>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AboutCard;
