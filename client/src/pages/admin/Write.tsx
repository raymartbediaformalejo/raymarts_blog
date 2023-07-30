import React, { Fragment } from "react";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const loadQuillNoSSRWrapper = () =>
  import("react-quill").then((module) => ({ default: module.default }));

const DynamicQuillNoSSRWrapper = React.lazy(loadQuillNoSSRWrapper);
const categories = [
  { title: "Blog" },
  { title: "TIL" },
  { title: "Resources" },
  { title: "Projects" },
];

const topics = [
  { title: "React" },
  { title: "HTML" },
  { title: "CSS" },
  { title: "Tailwindcss" },
  { title: "JS" },
  { title: "NodeJS" },
  { title: "Non-technical discussion" },
];
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
  const [editorValue, setEditorValue] = useState<string>(""); // State to store the editor value

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    console.log(value); // Log the editor value to the console
  };
  return (
    <Fragment>
      <div className="pt-20 ">
        <h2 className="mx-4 font-semibold text-blue text-[20px] mb-4">
          Create blog post
        </h2>
        <form className="flex flex-col gap-8">
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
                  sx={{
                    marginTop: "4px",
                    outlineOffset: "3px solid rgb(14 165 233)",
                    "&:focus-within": {
                      outline: "3px solid rgb(14 165 233)",
                      borderRadius: "4px",
                    },
                  }}
                  size="small"
                  multiple
                  id="categories"
                  options={categories}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>

              {/* TOPIC */}
              <div>
                <label htmlFor="topics" className="text-[#747577] text-sm">
                  Topic:
                </label>

                <Autocomplete
                  sx={{
                    marginTop: "4px",
                    outlineOffset: "3px solid rgb(14 165 233)",
                    "&:focus-within": {
                      outline: "3px solid rgb(14 165 233)",
                      borderRadius: "4px",
                    },
                  }}
                  size="small"
                  multiple
                  id="topics"
                  options={topics}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>

              {/* TITLE */}
              <div>
                <label htmlFor="title" className="text-[#747577] text-sm">
                  Title:
                </label>
                <input
                  id="title"
                  className="hover:border-[#000] focus:border-blue mt-1"
                />
              </div>

              {/* SUMMARY */}
              <div>
                <label htmlFor="summary" className="text-[#747577] text-sm ">
                  Summary:
                </label>
                <input
                  id="summary"
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
                  <span className="select-none sr-only">
                    Choose profile photo
                  </span>
                  <input
                    id="cover-photo"
                    type="file"
                    className="mt-1 block w-full text-sm text-grayDark file:mr-4 file:py-2 file:px-3 file:rounded-md file:border file:border-gray/50 file:text-sm file:font-semibold file:bg-[#f3f3f3] file:text-gray/90 hover:file:bg-[#F7F7F7]/10 "
                  />
                </label>
              </div>

              {/* IS FEATURED BLOG */}
              <div className="mt-2">
                <Checkbox id="isFeatured" className="p-0 m-0 " />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 text-[16px] text-gray font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                >
                  Is featured blog post?
                </label>
              </div>

              {/* EDITOR */}
              <DynamicQuillNoSSRWrapper
                className="mt-4 overflow-hidden bg-white rounded-sm"
                theme="snow"
                modules={modules}
                formats={formats}
                value={editorValue}
                onChange={handleEditorChange}
              />
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
                  <button className="bg-[#f3f3f3] text-gray/90 border border-gray/40 hover:bg-[#F7F7F7]/10">
                    Save Draft
                  </button>
                  <button className="bg-[#f3f3f3] text-gray/90 border border-gray/30 hover:bg-[#F7F7F7]/10">
                    Preview
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#747577] text-sm">Status:</p>
                  <p>Draft</p>
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
                    disablePortal
                    id="visibility"
                    options={visibilityOptions}
                    size="small"
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
                  <button className="w-2/4">Delete</button>
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
