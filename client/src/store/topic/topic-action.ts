import { Dispatch } from "redux";
import { replaceTopic } from "./topic-slice";
import axios from "axios";
import { Topic } from "../../interface/ITopic";
import { showNotification } from "../ui/ui-slice";

export const fetchTopicData = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get("http://localhost:8800/api/topics");
      const allTopic: Topic[] = response.data;
      dispatch(replaceTopic(allTopic || []));
    } catch (error) {
      console.error(`💥💥 ${error}`);
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Loading topic data failed!",
        })
      );
    }
  };
};

export const addNewTopic = (topicName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("http://localhost:8800/api/topics", {
        name: topicName,
      });
      console.log(response);
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent topic data successfull!",
        })
      );
    } catch (error) {
      console.error(`💥💥 ${error}`);
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Sending topic data failed!",
        })
      );
    }
  };
};
export const editTopic = (topicName: string, topicId?: number) => {
  console.log("++++++++++++++++++++++++++++++++");
  console.log(topicName);
  console.log(topicId);
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8800/api/topics/${topicId}`,
        {
          name: topicName,
        }
      );
      console.log(response);
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Updating topic name successfull!",
        })
      );
    } catch (error) {
      console.error(`💥💥 ${error}`);
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Updating topic name failed!",
        })
      );
    }
  };
};
export const deleteTopic = (topicId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/topics/${topicId}`
      );
      console.log(response);
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Deleted topic successfull!",
        })
      );
    } catch (error) {
      console.error(`💥💥 ${error}`);
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Deleting topic data failed!",
        })
      );
    }
  };
};
