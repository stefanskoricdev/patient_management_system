import { Fragment } from "react";
import { Link } from "react-router-dom";

const List = ({
  title,
  data,
  tableHeader,
  dataKeys,
  rootPath = null,
  actions,
  deletionData,
  setIsLoading,
  deleteHandler,
}) => {
  const handleBatchQuery = (query, batch, setState) => {
    query.forEach((doc) => {
      batch.delete(doc.ref);
      setState((prevState) =>
        prevState.filter((data) => data.id !== doc.ref.id)
      );
    });
  };
  return (
    <Fragment>
      <header>
        <i className="fas fa-list-ul"></i>
        <h3>{title}</h3>
      </header>
      {data.length < 1 && <p>{"No results found"}</p>}
      {data.length > 0 && (
        <table>
          <tbody>
            <tr>
              {actions && <th>Actions</th>}
              {tableHeader.map((title) => (
                <th key={title}>{title}</th>
              ))}
            </tr>
            {data.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  {actions && (
                    <td>
                      <Link
                        to={
                          dataItem.physioType === "individual"
                            ? `${rootPath}/edit-physio/${dataItem.id}`
                            : `${rootPath}/edit-group-physio/${dataItem.id}`
                        }
                      >
                        <i className="fas fa-user-edit"></i>
                      </Link>
                      <button
                        onClick={() => {
                          const {
                            physiosCollection,
                            patientType,
                            patientTypeCollection,
                            setPatients,
                            setPhysios,
                          } = deletionData;
                          deleteHandler(
                            physiosCollection,
                            dataItem,
                            setPhysios,
                            dataItem.physioType === "individual"
                              ? patientType.individual
                              : patientType.group,
                            dataItem.physioType === "individual"
                              ? patientTypeCollection.individual
                              : patientTypeCollection.group,
                            dataItem.physioType === "individual"
                              ? setPatients.individual
                              : setPatients.group,
                            setIsLoading,
                            handleBatchQuery
                          );
                        }}
                      >
                        <i className="fas fa-user-times"></i>
                      </button>
                    </td>
                  )}
                  {dataKeys.map((key) => (
                    <td key={key}>{dataItem[key]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default List;
