import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from '../redux/UserSlice';
import { Link } from 'react-router-dom';


const UsersList = () => {
  const users = useSelector((state) => state.UserReducer.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [ dispatch]);
  // By doing this, React will know that the useEffect callback function depends on dispatch, and it will make sure to update the function whenever dispatch changes.
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id)).then(() => {
      dispatch(getAllUsers()); // Fetch the updated user list after the user is deleted
    });
  };
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id number #</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>{" "}
                  | <Link to={`update/${user._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default UsersList