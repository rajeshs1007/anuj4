
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
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]); // Initialize records to an empty array
  const [positionFolders, setPositionFolders] = useState({});
  const [openFolders, setOpenFolders] = useState([]);

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

  const handleSubmit = () => {
    if (inputText) {
      const user = users.find((user) => user.name === inputText);

      if (user) {
        const positions = user.position;
        fetchRecords(positions); // Fetch records when a search is made
      } else {
        console.log("No matching manager found");
        setPositionFolders({}); // Clear position folders if no matching manager found
      }
    } else {
      setPositionFolders({}); // Clear position folders if input text is empty
    }
  };

  async function fetchRecords(positions) {
    const response = await fetch(`http://202.54.6.99:5050/record/`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const allRecords = await response.json();
    const filteredRecords = allRecords.filter((record) => positions.includes(record.position));
    setRecords(filteredRecords); // Update records with filtered records
    updatePositionFolders(filteredRecords); // Update position folders with filtered records
  }

  function updatePositionFolders(records) {
    const folders = {};
    records.forEach((record) => {
      const position = record.position;
      if (!folders[position]) {
        folders[position] = [];
      }
      folders[position].push(record);
    });
    setPositionFolders(folders);
  }

  const toggleFolder = (position) => {
    setOpenFolders((prevOpenFolders) =>
      prevOpenFolders.includes(position)
        ? prevOpenFolders.filter((folder) => folder !== position)
        : [...prevOpenFolders, position]
    );
  };

  return (
    <div>
      <h2>Find User</h2>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {Object.entries(positionFolders).map(([position, records]) => (
        <div key={position}>
          <h4 onClick={() => toggleFolder(position)}>
            {position} 
          </h4>
          {openFolders.includes(position) && (
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
                {records.map((record) => (
                  <Record
                    key={record._id}
                    record={record}
                    deleteRecord={() => console.log("Implement deleteRecord function")}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
