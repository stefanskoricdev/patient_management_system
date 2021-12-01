import AddEditGroupPhysioForm from "./AddEditGroupPhysioForm/AddEditGroupPhysioForm";

const AddEditGroupPhysio = ({ workingHours }) => {
  return (
    <section>
      <AddEditGroupPhysioForm workingHours={workingHours} />
    </section>
  );
};

export default AddEditGroupPhysio;
