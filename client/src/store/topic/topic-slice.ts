import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Topic } from "../../interface/ITopic";
import { TopicState } from "../../interface/ITopic";

const initialState: TopicState = {
  topic: [],
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    replaceTopic: (state, action: PayloadAction<Topic[]>) => {
      state.topic = action.payload;
    },
  },
});

export const { replaceTopic } = topicSlice.actions;

export default topicSlice;
