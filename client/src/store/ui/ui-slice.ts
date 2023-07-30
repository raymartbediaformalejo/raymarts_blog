import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../interface/INotification";
import { NotificationState } from "../../interface/INotification";

const initialState: NotificationState = {
  notification: { status: "", title: "", message: "" },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
  },
});

export const { showNotification } = uiSlice.actions;

export default uiSlice;
