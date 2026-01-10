import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../../services/authApi";

const savedAuth = JSON.parse(localStorage.getItem("authData"));


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      return data;
    } catch (err) {
      return rejectWithValue(err.message); 
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signup(email, password);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userEmail: savedAuth?.email || null,
    authToken: savedAuth?.token || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.userEmail = null;
      state.authToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authData");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userEmail = action.payload.email;
        state.authToken = action.payload.idToken;

        localStorage.setItem(
          "authData",
          JSON.stringify({
            email: action.payload.email,
            token: action.payload.idToken,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userEmail = action.payload.email;
        state.authToken = action.payload.idToken;

        localStorage.setItem(
          "authData",
          JSON.stringify({
            email: action.payload.email,
            token: action.payload.idToken,
          })
        );
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
