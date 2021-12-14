import AddEditGroupPhysioForm from "./AddEditGroupPhysioForm/AddEditGroupPhysioForm";

const AddEditGroupPhysio = ({ workingHours, rootPath }) => {
  return (
    <section>
      <AddEditGroupPhysioForm workingHours={workingHours} rootPath={rootPath} />
    </section>
  );
};

export default AddEditGroupPhysio;
