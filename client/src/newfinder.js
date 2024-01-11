
import React, { useEffect, useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://202.54.6.99:5050/manager/`);

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
      const response = await fetch(`http://202.54.6.99:5050/user/`);

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
    const foundRecord = records.find((rec) => rec.name === inputText);

    if (foundRecord) {
      setRecord(foundRecord);
    } else {
      console.log("No matching data found");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {record && (
        <div>
          <h2>Record</h2>
          <p>Name: {record.name}</p>
          <h3>Positions</h3>
          {record.position.map((position, index) => (
            <p key={index}>{position}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
