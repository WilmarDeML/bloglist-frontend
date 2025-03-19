import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  error: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(_state, action) {
      return action.payload;
    },
  },
});

export const { notificationChange } = notificationSlice.actions;

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(notificationChange(notification));
    setTimeout(() => {
      dispatch(notificationChange(initialState));
    }, time);
  };
};

export default notificationSlice.reducer;
