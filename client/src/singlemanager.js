
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.location}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

function App() {
  const [inputText, setInputText] = useState("");
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [openFolders, setOpenFolders] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openUsers, setOpenUsers] = useState([]); // Add this line

  useEffect(() => {
    async function getManagers() {
      const response = await fetch(`http://202.54.6.99:5050/manager/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const managers = await response.json();
      setManagers(managers);
    }

    getManagers();
  }, []);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://202.54.6.99:5050/user/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const users = await response.json();
      setUsers(users);
    }

    getUsers();
  }, []);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://202.54.6.99:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, []);

  const handleSubmit = () => {
    if (inputText) {
      const manager = managers.find((manager) => manager.name === inputText);
      if (manager) {
        const foundUsers = users.filter((user) =>
          manager.position.some((position) => user.name.includes(position))
        );
        if (foundUsers.length > 0) {
          setUser(foundUsers); // Set all matching users
          setSelectedPosition(foundUsers.map((user) => user.position[0])); // Set the first position of each user
          const foundRecords = records.filter((record) =>
            foundUsers.some((user) => user.position.includes(record.position))
          );
          setFilteredRecords(foundRecords);
        } else {
          console.log("No matching data found");
        }
      } else {
        console.log("No matching manager found");
      }
    } else {
      setUser(null);
      setSelectedPosition(null);
      setFilteredRecords([]);
    }
  };

  const togglePosition = (position) => {
    setSelectedPosition((prevSelectedPosition) =>
      prevSelectedPosition.includes(position)
        ? prevSelectedPosition.filter((pos) => pos !== position)
        : [position]
    );
  };

  const toggleFolder = (position) => {
    setOpenFolders((prevOpenFolders) =>
      prevOpenFolders.includes(position)
        ? prevOpenFolders.filter((folder) => folder !== position)
        : [...prevOpenFolders, position]
    );
  };

  const toggleUser = (user) => { // Add this function
    setOpenUsers((prevOpenUsers) =>
      prevOpenUsers.includes(user)
        ? prevOpenUsers.filter((openUser) => openUser !== user)
        : [...prevOpenUsers, user]
    );
  };

  return (
    <div>
      <h2>Find Manager</h2>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {user && selectedPosition && (
        <div>
          <h2>Users</h2>
          {user.map((user, index) => (
            <div key={index}>
              <p onClick={() => toggleUser(user)}>Name: {user.name}</p>
              {openUsers.includes(user) && (
                <div>
                  <h5>Positions</h5>
                  {user.position.map((position, index) => (
                    <button key={index} onClick={() => togglePosition(position)}>
                      {position}
                    </button>
                  ))}
                  {filteredRecords.length > 0 && selectedPosition.includes(user.position[0]) && (
                    <div>
                      <h2>Clients</h2>
                      {filteredRecords
                        .filter((record) => user.position.includes(record.position))
                        .map((record, index) => (
                          <div key={index}>
                            <h3 onClick={() => toggleFolder(record.position)}>{record.name} </h3>
                            {openFolders.includes(record.position) && (
                              <table className="table table-striped" style={{ marginTop: 10 }}>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <Record
                                    record={record}
                                    deleteRecord={() => console.log("Implement deleteRecord function")}
                                    key={record._id}
                                  />
                                </tbody>
                              </table>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
