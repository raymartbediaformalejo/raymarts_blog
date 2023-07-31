import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Topic {
  id?: number;
  name: string;
}

interface PostState {
  postItem: {
    category: string;
    topic: Topic[];
    title: string;
    summary: string;
    coverPhoto: string;
    isFeatured: boolean;
    content: string;
    status: string;
    visibility: string;
  };
}

const initialState: PostState = {
  postItem: {
    category: "",
    topic: [{ id: 0, name: "" }],
    title: "",
    summary: "",
    coverPhoto: "",
    isFeatured: false,
    content: "",
    status: "",
    visibility: "",
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCategoryToStore: (state, action: PayloadAction<string | null>) => {
      console.log("++++++++++++++++++++++++++++++++++++++++++++");
      console.log(state);
      console.log(action.payload);
      state.postItem.category = action.payload || "";
    },
    setTopicToStore: (state, action: PayloadAction<Topic[]>) => {
      state.postItem.topic = action.payload;
    },
    setInputValueToStore: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload;
      state.postItem = { ...state.postItem, [name]: value };
    },
  },
});

export const { setCategoryToStore, setTopicToStore, setInputValueToStore } =
  postSlice.actions;

export default postSlice;
