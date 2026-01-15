import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../../services/authApi";

const savedAdmin = JSON.parse(localStorage.getItem("adminAuth"));

/* ADMIN LOGIN */
export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);

      const key = email.replace(/\./g, "_");
      const res = await fetch(
        `https://configurapro-default-rtdb.firebaseio.com/admins/${key}.json`
      );

      const adminData = await res.json();
      if (!adminData) {
        throw new Error("Not an admin account");
      }

      return { email, token: data.idToken };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ADMIN SIGNUP */
export const adminSignup = createAsyncThunk(
  "adminAuth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signup(email, password);

      const key = email.replace(/\./g, "_");
      await fetch(
        `https://configurapro-default-rtdb.firebaseio.com/admins/${key}.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "ADMIN" }),
        }
      );

      return { email, token: data.idToken };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    email: savedAdmin?.email || null,
    token: savedAdmin?.token || null,
    loading: false,
    error: null,
  },
  reducers: {
    adminLogout(state) {
      state.email = null;
      state.token = null;
      localStorage.removeItem("adminAuth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;

        localStorage.setItem(
          "adminAuth",
          JSON.stringify(action.payload)
        );
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        localStorage.setItem(
          "adminAuth",
          JSON.stringify(action.payload)
        );
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
