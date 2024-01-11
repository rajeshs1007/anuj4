// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Record = (props) => (
//   <tr>
//     <td>{props.record.name}</td>
//     <td>{props.record.position}</td>
//     <td>{props.record.location}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
//         Edit
//       </Link>{" "}
//       |{" "}
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// );

// export default function RecordList() {
//   const [records, setRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [positionFolders, setPositionFolders] = useState({});
//   const [openFolders, setOpenFolders] = useState([]);

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function getUsers() {
//       const response = await fetch(`http://202.54.6.99:5050/user/`);

//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const users = await response.json();

//       // Map each user to an object that includes an array of positions
//       const usersWithPositions = users.map(user => ({
//         ...user,
//         positions: typeof user.position === 'string' ? [user.position.trim()] : Array.isArray(user.position) ? user.position.map(position => position.trim()) : []

//       }));
      
      

//       setUsers(usersWithPositions);
//     }

//     getUsers();
//   }, []);

//   useEffect(() => {
//     async function getRecords() {
//       const response = await fetch(`http://202.54.6.99:5050/record/`);

//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const records = await response.json();
//       setRecords(records);
//     }

//     getRecords();
//   }, []);

//   // Delete a record
//   async function deleteRecord(id) {
//     try {
//       const response = await fetch(`http://202.54.6.99:5050/record/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete record: ${response.statusText}`);
//       }

//       // Update the state to remove the deleted record
//       const newRecords = records.filter((record) => record._id !== id);
//       setRecords(newRecords);
//     } catch (error) {
//       console.error(error);
//       // Handle error, e.g., display an error message to the user
//     }
//   }

//   // Toggle the visibility of the records for a folder
//   function toggleFolder(position) {
//     setOpenFolders((prevOpenFolders) =>
//       prevOpenFolders.includes(position)
//         ? prevOpenFolders.filter((folder) => folder !== position)
//         : [...prevOpenFolders, position]
//     );
//   }

//   return (
//     <div>
//       <h3>Users</h3>
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by name or position"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {/* Display folders with toggle functionality */}
//       {users.map((user) => {
//         // Filter records for each position of the user
//         const userRecords = user.positions.flatMap(position =>
//           records.filter(record => record.position === position)
//         );

//         // Filter records based on the search term
//         const filteredRecords = userRecords.filter(
//           record =>
//             user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
//         );

//         // Only display the folder if there are matching records
//         if (filteredRecords.length > 0) {
//           return (
//             <div key={user._id}>
//               <h4 onClick={() => toggleFolder(user._id)}>
//                 {user.name} 
//               </h4>
//               {openFolders.includes(user._id) && (
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Position</th>
//                       <th>Location</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredRecords.map((record) => (
//                       <Record
//                         record={record}
//                         deleteRecord={deleteRecord}
//                         key={record._id}
//                       />
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           );
//         }
//         return null; // Return null if no matching records
//       })}
//     </div>
//   );
// }















// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Record = (props) => (
//   <tr>
//     <td>{props.record.name}</td>
//     <td>{props.record.position}</td>
//     <td>{props.record.location}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
//         Edit
//       </Link>{" "}
//       |{" "}
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// );

// export default function RecordList() {
//   const [records, setRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [positionFolders, setPositionFolders] = useState({});
//   const [openFolders, setOpenFolders] = useState([]);

//   const [users, setUsers] = useState([]);

//   // Add state for the current user
//   const [currentUser, setCurrentUser] = useState("");

//   useEffect(() => {
//     async function getUserData() {
//       // Include the user's ID, token, or other credentials in the API call
//       const response = await fetch(`http://202.54.6.99:5050/user/${currentUser}`);

//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const user = await response.json();

//       // Update the state with the fetched user data
//       setCurrentUser(user);
//     }

//     getUserData();
//   }, [currentUser]);

//   useEffect(() => {
//     async function getRecords() {
//       const response = await fetch(`http://202.54.6.99:5050/record/`);

//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const records = await response.json();
//       setRecords(records);
//     }

//     getRecords();
//   }, []);

//   // Delete a record
//   async function deleteRecord(id) {
//     try {
//       const response = await fetch(`http://202.54.6.99:5050/record/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete record: ${response.statusText}`);
//       }

//       // Update the state to remove the deleted record
//       const newRecords = records.filter((record) => record._id !== id);
//       setRecords(newRecords);
//     } catch (error) {
//       console.error(error);
//       // Handle error, e.g., display an error message to the user
//     }
//   }

//   // Toggle the visibility of the records for a folder
//   function toggleFolder(position) {
//     setOpenFolders((prevOpenFolders) =>
//       prevOpenFolders.includes(position)
//         ? prevOpenFolders.filter((folder) => folder !== position)
//         : [...prevOpenFolders, position]
//     );
//   }

//   return (
//     <div>
//       <h3>|| Users ||</h3><br></br>
//       {/* Display folders with toggle functionality */}
//       {users.map((user) => {
//         // Only display the folder if the username matches the current user
//         if (user.name === currentUser) {
//           // Filter records for each position of the user
//           const userRecords = user.positions.flatMap(position =>
//             records.filter(record => record.position === position)
//           );

//           // Filter records based on the search term
//           const filteredRecords = userRecords.filter(
//             record =>
//               record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               record.position.toLowerCase().includes(searchTerm.toLowerCase())
//           );

//           // Only display the folder if there are matching records
//           if (filteredRecords.length > 0) {
//             return (
//               <div key={user._id}>
//                 <h4 onClick={() => toggleFolder(user._id)}>
//                   {user.name} 
//                 </h4>
//                 {openFolders.includes(user._id) && (
//                   <table className="table">
//                     <thead className="thead-light">
//                       <tr>
//                         <th>Name</th>
//                         <th>Position</th>
//                         <th>Location</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredRecords.map((record) => (
//                         <Record
//                           record={record}
//                           deleteRecord={deleteRecord}
//                           key={record._id}
//                         />
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             );
//           }
//         }
//         return null;
//       })}
//     </div>
//   );
// }
