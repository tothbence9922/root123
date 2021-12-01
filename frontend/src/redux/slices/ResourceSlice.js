import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { errorToast } from 'components/common/Toast/Toast'


const url = 'https://localhost:44365/api/resource/all'

export const getAll = createAsyncThunk('resourceSlice/getAll', async (props) => {
  const path = url
  const token = localStorage.getItem("token")
  const response = await axios.get(
    path,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  return response
})

const initialMethodState = {
  status: 'idle',
  error: null,
  response: []
}

const initialState = {
  resources: [],
  get: initialMethodState,
}

export const resourceSlice = createSlice({
  name: 'resourceSlice',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getAll.pending]: (state, action) => {
      state.get.status = 'loading'
    },
    [getAll.fulfilled]: (state, action) => {
      state.get.status = 'succeeded'
      state.get.response = action.payload.data
    },
    [getAll.rejected]: (state, action) => {
      state.get.status = 'failed'
      state.get.error = action.error
      errorToast(state.get.error)
    }
  },
})

export default resourceSlice.reducer