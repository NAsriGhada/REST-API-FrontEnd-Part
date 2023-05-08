import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getOneUser } from "../redux/UserSlice";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const users = useSelector((state) => state.UserReducer.users);
    console.log(users)
    console.log(id);
    // const currentUser = users.find((user) => user._id === id);
    // console.log(currentUser)
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
useEffect(() => {
  dispatch(getOneUser(id)).then((res) => {
    setName(res.payload.name);
    setEmail(res.payload.email);
    setAge(res.payload.age);
  });
}, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
      age,
    };
    console.log(updateUser)
    dispatch(updateUser(updatedUser)).then(() => 
      navigate("/")
    );
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
