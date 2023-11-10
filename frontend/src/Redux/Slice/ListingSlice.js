import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createListings = createAsyncThunk("data/createListings", async ({ name, description, address, type, bedrooms, bathrooms, regularPrice, discountPrice, offer, parking, furnished, userRef, images }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("type", type);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("regularPrice", regularPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("offer", offer);
    formData.append("parking", parking);
    formData.append("furnished", furnished);
    formData.append("userRef",userRef)
    for (let i = 0; i < images.length; i++) {
        if (images[i]) {
            formData.append('img',images[i]);
          }
    }
  
    try {
      const response = await fetch("https://real-estate-vpkf.onrender.com/api/listing/create", {
        method: "POST",
        mode: "cors",
        credentials: 'include',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
// ========================GET USER LISTING========================
export const GetUserListing = createAsyncThunk("data/GetUserListing", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://real-estate-vpkf.onrender.com/api/user/getlisting/${id}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.ok) {
      return data; // Assuming data is the response payload you expect
    } else {
      throw new Error(data.message || "Failed to fetch data");
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// ==============================DELETE LISTING==========================
export const DeleteListing = createAsyncThunk("data/ DeleteListing", async(id,{rejectWithValue}) => {
try {
  const response = await fetch(`https://real-estate-vpkf.onrender.com/api/listing/delete/${id}`, {
    method: "DELETE",
    mode:"cors",
    credentials: 'include',
  });
  const data = await response.json();
  if (response.ok) {
    return data; // Assuming data is the response payload you expect
  } else {
    throw new Error(data.message || "Failed to fetch data");
  }
} catch (error) {
  return rejectWithValue(error.message);
}
})
// =======================GET SINGLE LISTING==============================
export const FetchSingleListing = createAsyncThunk("data/FetchSingleListing", async(id,{rejectWithValue}) => {
  try {
    const response = await fetch(`https://real-estate-vpkf.onrender.com/api/listing/get/${id}`, {
      method: "GET",
      mode:"cors",
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      return data; // Assuming data is the response payload you expect
    } else {
      throw new Error(data.message || "Failed to fetch data");
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
})
// ========================UPDATE LISTING=============================
export const UpdateSingleListing = createAsyncThunk("data/ UpdateSingleListing", async({id, name, description, address, type, bedrooms, bathrooms, regularPrice, discountPrice, offer, parking, furnished, userRef, images }, {rejectWithValue}) =>{
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("address", address);
  formData.append("type", type);
  formData.append("bedrooms", bedrooms);
  formData.append("bathrooms", bathrooms);
  formData.append("regularPrice", regularPrice);
  formData.append("discountPrice", discountPrice);
  formData.append("offer", offer);
  formData.append("parking", parking);
  formData.append("furnished", furnished);
  formData.append("userRef",userRef)
  for (let i = 0; i < images.length; i++) {
      if (images[i]) {
          formData.append('img',images[i]);
        }
  }
  try {
    const response = await fetch(`https://real-estate-vpkf.onrender.com/api/listing/update/${id}`, {
      method: "PATCH",
      mode:"cors",
      credentials: 'include',
      body: formData
    });
    const data = await response.json();
    if (response.ok) {
      return data; // Assuming data is the response payload you expect
    } else {
      throw new Error(data.message || "Failed to fetch data");
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
})
const initialState = {
userListing: [],
SingleListing: {}, 
loading: false,
error: null,
}
const Listingslice = createSlice({
    name: "listing",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder
        .addCase(createListings.pending, (state) => {
          state.loading = true
          state.error = null
      })
      .addCase(createListings.fulfilled, (state, action) => {
          state.loading = false
          state.error = null;
      })
      .addCase(createListings.rejected, (state,action) => {
          state.loading = false
          state.error = action.payload
      })
      .addCase(GetUserListing.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(GetUserListing.fulfilled, (state, action) => {
      state.userListing = action.payload
        state.loading = false
        state.error = null;
    })
    .addCase(GetUserListing.rejected, (state,action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase(FetchSingleListing.pending, (state) => {
      state.loading = true
      state.error = null
  })
  .addCase(FetchSingleListing.fulfilled, (state, action) => {
    state.SingleListing = action.payload
      state.loading = false
      state.error = null;
  })
  .addCase(FetchSingleListing.rejected, (state,action) => {
      state.loading = false
      state.error = action.payload
  })
    }
})

export default Listingslice.reducer