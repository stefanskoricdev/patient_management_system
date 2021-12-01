import AddEditPhysioForm from "./AddEditPhysioForm/AddEditPhysioForm";
const AddEditPhysio = ({ rootPath, workingDays, workingHours }) => {
  return (
    <section>
      <AddEditPhysioForm
        rootPath={rootPath}
        workingDays={workingDays}
        workingHours={workingHours}
      />
    </section>
  );
};

export default AddEditPhysio;
