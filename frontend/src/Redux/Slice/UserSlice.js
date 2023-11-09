import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRegister = createAsyncThunk("data/fetchRegister", async({username, email, password, pic},{ rejectWithValue }) => {
  const formData = new FormData();
  formData.append("username", username)
  formData.append("email", email)
  formData.append("password", password)
  formData.append("photo", pic)
  try {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      mode: "cors",
    "Content-Type": "multipart/form-data",
      body: formData
  })
  const data = await response.json()
  if(response.ok){
      return data
  }else{
    throw new Error(data.message)
  }
  } catch (error) {
    return rejectWithValue(error.message);
  }
})
// =========================DELETE USER=======================
export const DeleteUserLoginUser = createAsyncThunk("data/ DeleteUserLoginUser", async(id,{rejectWithValue}) => {
  try {
    const response = await fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
  })
  const data = await response.json()
  if(response.ok){
      return data
  }else{
    throw new Error(data.message)
  }
  } catch (error) {
    return rejectWithValue(error.message);
  }
})
const infoStorage = () => {
  const StorageUserInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
  if (StorageUserInfo) {
    return StorageUserInfo;
  }
  return null;
};
// ======================USER LOGOUT============================
export const UserLogOut = createAsyncThunk("data/ UserLogOut ", async(_,{rejectWithValue}) => {
    try {
      const response = await fetch(`/api/user/signout`, {
        method: "Get",
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    if(response.ok){
        return data
    }else{
      throw new Error(data.message)
    }
    } catch (error) {
      return rejectWithValue(error.message);
    }

})
const initialState = {
  currentUser: infoStorage() || null,
  loading: false,
  error: null,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("userLoginInfo", JSON.stringify(action.payload));
    },
    signInfailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers : (builder) => {
    builder
    .addCase(fetchRegister.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
    })
    .addCase(fetchRegister.rejected, (state,action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase(DeleteUserLoginUser.pending, (state) => {
      state.loading = true
      state.error = null
  })
  .addCase(DeleteUserLoginUser.fulfilled, (state, action) => {
    state.currentUser = null
    state.loading = false
    state.error = null;
 localStorage.removeItem("userLoginInfo")
  })
  .addCase(DeleteUserLoginUser.rejected, (state,action) => {
      state.loading = false
      state.error = action.payload
  })
  .addCase(UserLogOut.pending, (state) => {
    state.loading = true
    state.error = null
})
.addCase(UserLogOut.fulfilled, (state, action) => {
  state.currentUser = null
    state.loading = false
    state.error = null;
 localStorage.removeItem("userLoginInfo")
})
.addCase(UserLogOut.rejected, (state,action) => {
    state.loading = false
    state.error = action.payload
})
  }
});
export const { signInStart, signInSuccess, signInfailure } = UserSlice.actions;

export default UserSlice.reducer;
