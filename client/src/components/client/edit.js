import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Edit() {
  const [form, setForm] = useState({
    clname: '',
    ucc: '',
    location: ''
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const password = prompt('Enter the password:');
    if (password !== 'abc.123') {
      alert('Incorrect password. Access denied.');
      navigate('/');
      return;
    }

    async function fetchData() {
      const id = params.id;

      if (!id) {
        return;
      }

      const response = await fetch(`http://202.54.6.99:4000/record/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate('/records');
        return;
      }

      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.clname,
      position: form.ucc,
      location: form.location,
    };

    await fetch(`http://202.54.6.99:4000/record/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
    });

    navigate('/');
  }

  return (
    <div>
      <h3>Update Record</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>ClientID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{form.clname}</td>
            <td>{form.ucc}</td>
            <td>{form.location}</td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.clname}
            onChange={(e) => updateForm({ clname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Location: </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.ucc}
            onChange={(e) => updateForm({ ucc: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">ClientID: </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
