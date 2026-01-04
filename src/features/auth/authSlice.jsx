import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../../services/authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await login(email, password);
    return data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }) => {
    const data = await signup(email, password);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userEmail: null,
    authToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.userEmail = null;
      state.authToken = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // for login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userEmail = action.payload.email;
        state.authToken = action.payload.idToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // for signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userEmail = action.payload.email;
        state.authToken = action.payload.idToken;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
