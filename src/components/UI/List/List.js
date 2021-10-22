import { Fragment } from "react";
import { Link } from "react-router-dom";

const List = ({ title, data, tableHeader, dataKeys, path = null }) => {
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
              {/* <th>Actions</th> */}
              {tableHeader.map((title) => (
                <th key={title}>{title}</th>
              ))}
            </tr>
            {data.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  {/* <td>
                    <Link to={`${path}/edit-user/${dataItem.id}`}>
                      <i className="fas fa-user-edit"></i>
                    </Link>
                    <button>
                      <i className="fas fa-user-times"></i>
                    </button>
                  </td> */}
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
