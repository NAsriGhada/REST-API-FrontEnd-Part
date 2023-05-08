import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addUsers, getAllUsers } from '../redux/UserSlice'
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
      const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      const newUser = { name, age, email, password };
      dispatch(addUsers(newUser))
        .then(() => dispatch(getAllUsers())) 
        // to update the list of users automatically if user was added successfully
        .catch((err) => console.error(err));
      setName("");
      setAge(0)
      setEmail("");
      setPassword("");
      navigate('/')
    };
  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser