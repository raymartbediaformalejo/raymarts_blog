import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Topic {
  id?: number;
  name: string;
}

export interface PostState {
  postItem: {
    category: string;
    topic: Topic[];
    title: string;
    summary: string;
    coverPhoto: string;
    isFeatured: boolean;
    content: string;
    status?: string;
    visibility: string | null;
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
    status: "Draft",
    visibility: "",
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCategoryToStore: (state, action: PayloadAction<string | null>) => {
      state.postItem.category = action.payload || "";
    },
    setTopicToStore: (state, action: PayloadAction<Topic[]>) => {
      state.postItem.topic = action.payload;
    },
    setCoverPhotoToStore: (state, action: PayloadAction<string>) => {
      state.postItem.coverPhoto = action.payload;
    },
    setInputValueToStore: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload;
      state.postItem = { ...state.postItem, [name]: value };
    },

    setIsFeatureToStore: (state) => {
      state.postItem = {
        ...state.postItem,
        isFeatured: !state.postItem.isFeatured,
      };
    },

    setContentToStore: (state, action: PayloadAction<string>) => {
      state.postItem.content = action.payload;
    },

    setVisibilityToStore: (state, action: PayloadAction<string | null>) => {
      state.postItem.visibility = action.payload;
    },
    setStatusToStore: () => {},
  },
});

export const {
  setCategoryToStore,
  setTopicToStore,
  setCoverPhotoToStore,
  setInputValueToStore,
  setIsFeatureToStore,
  setContentToStore,
  setVisibilityToStore,
  setStatusToStore,
} = postSlice.actions;

export default postSlice;
