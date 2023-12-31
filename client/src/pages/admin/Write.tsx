import React, { Fragment, useState, useEffect, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchTopicData } from "../../store/topic/topic-action";
import "react-quill/dist/quill.snow.css";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Topic } from "../../interface/ITopic";
import {
  setCategoryToStore,
  setContentToStore,
  setInputValueToStore,
  setIsFeatureToStore,
  setStatusToStore,
  setTopicToStore,
  setVisibilityToStore,
} from "../../store/post/post-slice";
import { addPost } from "../../store/post/post-action";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const loadQuillNoSSRWrapper = () =>
  import("react-quill").then((module) => ({ default: module.default }));

const DynamicQuillNoSSRWrapper = React.lazy(loadQuillNoSSRWrapper);
const categories = ["Blog", "TIL"];

const visibilityOptions = ["Private", "Public"];
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const WritePage = () => {
  const dispatch = useAppDispatch();
  const allTopic = useAppSelector((state) => state.topic.topic);
  const postItem = useAppSelector((state) => state.post.postItem);
  const tempTopic = useAppSelector((state) => state.post.postItem.topic);
  const tempCateg = useAppSelector((state) => state.post.postItem.category);
  const tempTitle = useAppSelector((state) => state.post.postItem.title);
  const tempSummary = useAppSelector((state) => state.post.postItem.summary);
  const tempIsFeatured = useAppSelector(
    (state) => state.post.postItem.isFeatured
  );
  const tempContent = useAppSelector((state) => state.post.postItem.content);
  const tempVisibility = useAppSelector(
    (state) => state.post.postItem.visibility
  );
  const tempStatus = useAppSelector((state) => state.post.postItem.status);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>();
  console.log(postItem);

  useEffect(() => {
    dispatch(fetchTopicData());
  }, [dispatch]);

  const handleChangeCategory = (
    _: React.SyntheticEvent,
    value: string | null
  ) => {
    dispatch(setCategoryToStore(value));
  };
  const handleChangeTopic = (
    _: React.SyntheticEvent,
    value: Topic[] | null
  ) => {
    const selectedTopics = value
      ? value.map((topic) => ({ id: topic.id || 0, name: topic.name }))
      : [];
    // setPost((prev) => ({ ...prev, topic: selectedTopics }));
    dispatch(setTopicToStore(selectedTopics));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    dispatch(
      setInputValueToStore({ name: e.target.name, value: e.target.value })
    );
  };

  const handleClickIsFeatured = () => {
    // setPost((prev) => ({ ...prev, isFeatured: !prev.isFeatured }));
    dispatch(setIsFeatureToStore());
  };
  const handleChangeContent = (value: string) => {
    // setPost((prev) => ({ ...prev, content: value }));
    dispatch(setContentToStore(value));
  };

  const handleClickSaveAsDraft = () => {
    dispatch(setStatusToStore());
  };

  const handleChangeVisibility = (
    _: React.SyntheticEvent,
    value: string | null
  ) => {
    // setPost((prev) => ({ ...prev, visibility: value || "" }));
    dispatch(setVisibilityToStore(value));
  };

  const handlerChangeCoverPhoto = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target) {
        setImageSrc(onLoadEvent.target.result);
      }
    };

    const fileInput = event.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
    if (fileInput.files) {
      reader.readAsDataURL(fileInput.files[0]);
      // console.log(fileInput.files);
    }
  };

  // function async uploadImageToCloudinary<T>(formData: T): void {
  //   try {
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
  //       formData
  //     );
  //     const imageData = response.data;
  //     return imageData;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     throw error;
  //   }
  // };

  const handleClickSavePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);

    const form = e.target as HTMLFormElement;

    const fileInput = form.querySelector<HTMLInputElement>("#coverPhoto");
    console.log(fileInput);
    dispatch(addPost(postItem, fileInput));
    // if (fileInput && fileInput.files) {
    //   const formData = new FormData();
    //   for (const file of fileInput.files) {
    //     formData.append("file", file);
    //   }

    //   formData.append("upload_preset", "ml_default");
    //   console.log(typeof formData);

    //   try {
    //     const response = await axios.post(
    //       "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
    //       formData
    //     );
    //     const imageData = response.data;

    //     console.log("Image data:", imageData.secure_url);
    //     // if (imageData.secure_url) {
    //     //   dispatch(setCoverPhotoToStore(imageData.imageData.secure_url));
    //     // }
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //   }
    // }
  };

  // const handleClickSavePost = (e: HTMLFormEvent) => {
  //   e.preventDefault();
  //   console.log(e.target);

  //   const form = e.target;

  //   const fileInput = Array.from(form.elements).find(
  //     ({ id }) => id === "coverPhoto"
  //   );
  //   // // if (fileInput) {
  //   //   console.log(fileInput as Element);
  //   // }

  //   const formData = new FormData();

  //   if (fileInput) {
  //     for (const file of fileInput.files) {
  //       formData.append("file", file);
  //     }
  //   }
  // dispatch(addPost(postItem));
  // };
  // console.log(post);

  return (
    <Fragment>
      <div className="pt-20 ">
        <h2 className="mx-4 font-semibold text-blue text-[20px] mb-4">
          Create blog post
        </h2>
        <form onSubmit={handleClickSavePost} className="flex flex-col gap-8">
          <div className="bg-white">
            <div className="flex flex-col gap-4 px-4 pt-8">
              {/* CATEGORY */}
              <div>
                <label
                  htmlFor="categories"
                  className="text-[rgb(116,117,119)] text-sm"
                >
                  Category:
                </label>
                <Autocomplete
                  disableCloseOnSelect
                  value={tempCateg}
                  onChange={handleChangeCategory}
                  disablePortal
                  size="small"
                  id="category"
                  options={categories}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{
                    marginTop: "4px",
                    outlineOffset: "3px solid rgb(14 165 233)",
                    "&:focus-within": {
                      outline: "3px solid rgb(14 165 233)",
                      borderRadius: "4px",
                    },
                  }}
                />
              </div>

              {/* TOPIC */}
              <div>
                <label htmlFor="topics" className="text-[#747577] text-sm">
                  Topic:
                </label>

                <Autocomplete
                  onChange={handleChangeTopic}
                  size="small"
                  multiple
                  id="topics"
                  options={allTopic}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => {
                    const isSelectedTopic = tempTopic.some(
                      (topic) => option.id === topic.id
                    );

                    const handleClickOption = () => {
                      const newSelectedTopics = isSelectedTopic
                        ? tempTopic.filter((topic) => topic.id !== option.id)
                        : [...tempTopic, option];

                      // Update the selected topics state
                      dispatch(setTopicToStore(newSelectedTopics));
                    };

                    return (
                      <li {...props} onClick={handleClickOption}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={isSelectedTopic}
                        />
                        {option.name}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <Fragment>
                            {tempTopic.map((topic) => (
                              <Chip
                                key={topic.id}
                                label={topic.name}
                                size="small"
                                onDelete={() => {
                                  // Remove the topic from tempTopic when onDelete is triggered
                                  const newSelectedTopics = tempTopic.filter(
                                    (t) => t.id !== topic.id
                                  );

                                  // Update the selected topics state
                                  dispatch(setTopicToStore(newSelectedTopics));
                                }}
                                className="MuiAutocomplete-tag MuiAutocomplete-tagSizeSmall"
                              />
                            ))}
                            {params.InputProps.startAdornment}
                          </Fragment>
                        ),
                      }}
                    />
                  )}
                  sx={{
                    marginTop: "4px",
                    outlineOffset: "3px solid rgb(14 165 233)",
                    "&:focus-within": {
                      outline: "3px solid rgb(14 165 233)",
                      borderRadius: "4px",
                    },
                  }}
                />
              </div>

              {/* TITLE */}
              <div>
                <label htmlFor="title" className="text-[#747577] text-sm">
                  Title:
                </label>
                <input
                  onChange={handleChangeInput}
                  id="title"
                  name="title"
                  value={tempTitle}
                  className="hover:border-[#000] focus:border-blue mt-1"
                />
              </div>

              {/* SUMMARY */}
              <div>
                <label htmlFor="summary" className="text-[#747577] text-sm ">
                  Summary:
                </label>
                <input
                  onChange={handleChangeInput}
                  name="summary"
                  id="summary"
                  value={tempSummary}
                  className="hover:border-[#000] focus:border-blue mt-1"
                />
              </div>

              {/* COVER PHOTO */}
              <div>
                <label
                  htmlFor="cover-photo"
                  className="font-[300] text-[#747577] text-sm"
                >
                  Cover photo:
                </label>
                <label className="block">
                  <span className="select-none sr-only">Choose photo</span>
                  <input
                    onChange={handlerChangeCoverPhoto}
                    id="coverPhoto"
                    name="coverPhoto"
                    type="file"
                    className="mt-1 block w-full text-sm text-grayDark file:mr-4 file:py-2 file:px-3 file:rounded-md file:border file:border-gray/50 file:text-sm file:font-semibold file:bg-[#f3f3f3] file:text-gray/90 hover:file:bg-[#F7F7F7]/10 "
                  />
                </label>
                {typeof imageSrc && imageSrc === "string" ? (
                  <img src={imageSrc} />
                ) : (
                  ""
                )}
              </div>

              {/* IS FEATURED BLOG */}
              <div className="mt-2">
                <Checkbox
                  checked={tempIsFeatured}
                  onClick={handleClickIsFeatured}
                  id="isFeatured"
                  className="p-0 m-0 "
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 text-[16px] text-gray font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                >
                  Is featured blog post?
                </label>
              </div>

              {/* EDITOR */}
              <Suspense fallback={<div>Loading Quill editor</div>}>
                <DynamicQuillNoSSRWrapper
                  id="content"
                  className="mt-4 overflow-hidden bg-white rounded-sm"
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={tempContent}
                  onChange={handleChangeContent}
                />
              </Suspense>
            </div>
          </div>

          {/* PUBLISH */}
          <div className="bg-white">
            <div className="mx-4 mb-8 ">
              <h3 className="mb-3 text-lg font-inter text-grayDark/90">
                Publish
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={handleClickSaveAsDraft}
                    className="bg-[#f3f3f3] text-gray/90 border border-gray/40 hover:bg-[#F7F7F7]/10"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    className="bg-[#f3f3f3] text-gray/90 border border-gray/30 hover:bg-[#F7F7F7]/10"
                  >
                    Preview
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#747577] text-sm">Status:</p>
                  <p>
                    {tempStatus &&
                      tempStatus.charAt(0).toUpperCase() + tempStatus.slice(1)}
                  </p>
                </div>

                {/* VISIBILITY */}
                <div>
                  <label
                    htmlFor="visibility"
                    className="text-[rgb(116,117,119)] text-sm"
                  >
                    Visibility:
                  </label>
                  <Autocomplete
                    onChange={handleChangeVisibility}
                    disablePortal
                    id="visibility"
                    options={visibilityOptions}
                    size="small"
                    value={tempVisibility}
                    sx={{
                      marginTop: "4px",
                      outlineOffset: "3px solid rgb(14 165 233)",
                      "&:focus-within": {
                        outline: "3px solid rgb(14 165 233)",
                        borderRadius: "4px",
                      },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="button" className="w-2/4">
                    Delete
                  </button>
                  <button className="w-2/4" type="submit">
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default WritePage;
