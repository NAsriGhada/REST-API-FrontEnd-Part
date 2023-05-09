import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getOneUser, getAllUsers } from "../redux/UserSlice";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

useEffect(() => {
  dispatch(getOneUser(id)).then((res) => {
    console.log(res)
    setName(res.payload.name);
    setEmail(res.payload.email);
    setAge(res.payload.age);
  });
}, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, age, email })).then(() => {
      navigate("/");
      console.log('getting users',dispatch(getAllUsers(updateUser))); // Fetch the updated user list after the user is updated
      dispatch(getAllUsers(updateUser)); // Fetch the updated user list after the user is updated
    });
  };


  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name }
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email }
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            value={age }
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
