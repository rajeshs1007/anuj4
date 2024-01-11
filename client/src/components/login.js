import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
//   let history = useNavigate();

//   const handleRegister = async (event) => {
//     event.preventDefault();

//     const name = event.target.name.value;
//     const password = event.target.password.value;

//     const response = await fetch('http://202.54.6.99:5050/data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, password }),
//     });

//     if (response.ok) {
//       alert('User registered successfully');
//       history("/home");
//     } else {
//       alert('Failed to register user');
//     }
//   }

  return (
    <div>
      <h2>Home Page</h2>
      {/* <form onSubmit={handleRegister}>
        <label>
          name:
          <input type="text" name="name" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Register</button>
      </form> */}
    </div>
  );
}

export default RegisterPage;
