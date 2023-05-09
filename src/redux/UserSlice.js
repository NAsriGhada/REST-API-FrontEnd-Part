import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUsers = createAsyncThunk("user/addUsers", async (newUser) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/add/user",
      newUser
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/get/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getOneUser = createAsyncThunk("user/getOneUser", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/get/user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/delete/user/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ _id, name, age, email }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/update/user/${_id}`,
        { name, age, email }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add users case
      .addCase(addUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload); // push the new user to the users array
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get all users case
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get one user case
      .addCase(getOneUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Find the index of the old user object
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        // Replace the old user object with the updated user object
        state.users[index] = action.payload;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // delete a user case
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter(
          (user) => user._id !== action.payload.data._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // update a user case
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
