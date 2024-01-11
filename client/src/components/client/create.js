import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Select from "react-select"; // Import the react-select component

export default function Create() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   location: "", // Add the new field
 });
 const [records, setRecords] = useState([]); // Add a new state for storing the records
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };

   await fetch("http://202.54.6.99:4000/record", {
     method: "POST",
     headers: {
       "Content-Type": "application",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({ name: "", position: "", location:""});
   navigate("/");
 }




//  async function onSubmit(e) {
//   e.preventDefault();

//   // Check if position is not null or an empty string
//   if (form.position && form.position.value) {
//     const newPerson = { ...form, position: form.position.value };

//     await fetch("http://202.54.6.99:4000/record", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newPerson),
//     })
//     .catch(error => {
//       window.alert(error);
//       return;
//     });

//     setForm({ name: "", position: "", location:""});
//     navigate("/records");
//   } else {
//     window.alert('Position is required');
//   }
// }

 // This function will fetch the data from the record and store it in the records state
 async function fetchData() {
   await fetch("http://202.54.6.99:4000/record")
   .then(response => response.json())
   .then(data => setRecords(data))
   .catch(error => {
     window.alert(error);
     return;
   });
 }

 // This effect will run once when the component mounts and fetch the data
 useEffect(() => {
   fetchData();
 }, []);

 // This function will remove the duplicate locations from an array of records
 function removeDuplicates(records) {
   // Create a new array to store the unique locations
   let uniqueLocations = [];
   // Loop over the records and check if the location is already in the unique array
   for (let record of records) {
     // If the location is not in the unique array, push it to the array
     if (!uniqueLocations.includes(record.position)) {
       uniqueLocations.push(record.position);
     }
   }
   // Return the unique array
   return uniqueLocations;
 }

 // This function will convert the array of locations into an array of objects with label and value properties
 function formatOptions(locations) {
   // Create a new array to store the formatted options
   let options = [];
   // Loop over the locations and create an object for each one
   for (let location of locations) {
     // Create an object with label and value properties
     let option = {
       label: location, // The label is what the user sees in the dropdown
       value: location, // The value is what the user selects and is stored in the state
     };
     // Push the object to the options array
     options.push(option);
   }
   // Return the options array
   return options;
 }

 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Client</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Location</label>
        
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
  <label htmlFor="location">ClientID </label>
  <input
    type="text"
    className="form-control"
    id="location"
    value={form.location}
    onChange={(e) => updateForm({ location: e.target.value })}
  />
</div>      
       <div className="form-group">
         <input
           type="submit"
           value="Create Client"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}


















 {/* <Select // Use the Select component instead of the input element
           id="position"
           value={form.position} // The value is an object with label and value properties
           onChange={(option) => updateForm({ position: option })} // The option is an object with label and value properties
           options={formatOptions(removeDuplicates(records))} // The options are an array of objects with label and value properties
           isClearable // This prop allows the user to clear the selected value
           isSearchable // This prop allows the user to search for the options
           placeholder="Select or type a location" // This prop sets the placeholder text
         /> */}