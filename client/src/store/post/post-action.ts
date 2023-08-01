import { Dispatch } from "redux";
import axios from "axios";
import { showNotification } from "../ui/ui-slice";
import { Topic } from "../../interface/ITopic";
import { setCoverPhotoToStore } from "./post-slice";
export const addPost = (
  {
    category,
    topic,
    title,
    summary,
    coverPhoto,
    isFeatured,
    content,
    status,
    visibility,
  }: {
    category: string;
    topic: Topic[];
    title: string;
    summary: string;
    coverPhoto: string;
    isFeatured: boolean;
    content: string;
    status?: string | undefined;
    visibility: string | null;
  },
  fileInput: HTMLInputElement | null
) => {
  const topicJSON = JSON.stringify(topic);
  const isFeaturedString = isFeatured + "";
  const formData = new FormData();
  let coverImage = coverPhoto;

  if (fileInput && fileInput.files) {
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "ml_default");
  }
  // const uploadImage = async () => {
  //   const responseImage = await axios.post(
  //     "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
  //     formData
  //   );
  //   coverImage = responseImage.data.secure_url + "";
  //   console.log("????????????????????????????????????????????????")
  //   console.log(coverImage)
  // }
  return async (dispatch: Dispatch) => {
    try {
      const responseImage = await axios.post(
        "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
        formData
      );
      coverImage = responseImage.data.secure_url + "";
      console.log("????????????????????????????????????????????????");
      console.log(coverImage);

      const response = await axios.post("http://localhost:8800/api/posts", {
        category,
        topic: topicJSON,
        title,
        summary,
        coverPhoto: coverImage,
        isFeatured: isFeaturedString,
        content,
        status,
        visibility,
      });
      console.log(response);
      dispatch(setCoverPhotoToStore(coverImage));
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully saving the post data!",
        })
      );
    } catch (error) {
      console.error(`💥💥 ${error}`);
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Failed sending the post data!",
        })
      );
    }
  };
};
