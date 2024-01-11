import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/client/recordList";
import Edit from "./components/client/edit";
import Create from "./components/client/create";
import LoginPage from "./components/login";
const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route path="/home" element={<LoginPage />} />
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;





// import React, { useState } from 'react';

// const ApprovalProcess = () => {
//   const [managerApproval, setManagerApproval] = useState(null);
//   const [subManagerApproval, setSubManagerApproval] = useState(null);
//   const [accountDetails, setAccountDetails] = useState({ name: '', email: '' });

//   const handleInputChange = (event) => {
//     setAccountDetails({ ...accountDetails, [event.target.name]: event.target.value });
//   };

//   const handleManagerApproval = (event) => {
//     const approval = event.target.value === 'yes';
//     setManagerApproval(approval);
//     if (!approval) {
//       setSubManagerApproval(null);
//     }
//   };

//   const handleSubManagerApproval = (event) => {
//     setSubManagerApproval(event.target.value === 'yes');
//   };

//   return (
//     <div>
//       <form>
//         <label>
//           Name:
//           <input type="text" name="name" onChange={handleInputChange} />
//         </label>
//         <label>
//           Email:
//           <input type="text" name="email" onChange={handleInputChange} />
//         </label>
//         <div>
//           <label>
//             Manager Approval:
//             <input type="radio" name="managerApproval" value="yes" onChange={handleManagerApproval} /> Yes
//             <input type="radio" name="managerApproval" value="no" onChange={handleManagerApproval} /> No
//           </label>
//         </div>
//         {managerApproval && subManagerApproval === null && (
//           <div>
//             <label>
//               Sub-Manager Approval:
//               <input type="radio" name="subManagerApproval" value="yes" onChange={handleSubManagerApproval} /> Yes
//               <input type="radio" name="subManagerApproval" value="no" onChange={handleSubManagerApproval} /> No
//             </label>
//           </div>
//         )}
//       </form>
//       {managerApproval && subManagerApproval && <p>Account is open for {accountDetails.name} with email {accountDetails.email}!</p>}
//     </div>
//   );
// };

// export default ApprovalProcess;
