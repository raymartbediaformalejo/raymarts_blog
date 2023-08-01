import { ChangeEvent, Fragment, useState, useEffect } from "react";
import MyModal from "../../../components/ui/MyModal";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  addNewTopic,
  deleteTopic,
  editTopic,
  fetchTopicData,
} from "../../../store/topic/topic-action";

const TopicPage = () => {
  const dispatch = useAppDispatch();
  const allTopic = useAppSelector((state) => state.topic.topic);
  const [newTopic, setNewTopic] = useState("");
  const [oldEditTopicName, setOldEditTopicName] = useState<string>("");
  const [toEditTopicName, setToEditTopicName] = useState<string>("");
  const [toEditTopicId, setToEditTopicID] = useState<number>();
  const [toDeleteTopicName, setToDeleteTopicName] = useState<string>("");
  const [toDeleteTopicId, setToDeleteTopicID] = useState<number>();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    dispatch(fetchTopicData());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEdit = (oldNameValue: string, id?: number) => {
    setOpenEdit(true);
    setOldEditTopicName(oldNameValue);
    setToEditTopicID(id);
  };

  const handleCloseEdit = () => {
    // setTopicName("");
    setOpenEdit(false);
  };
  const handleOpenDelete = (oldNameValue: string, id?: number) => {
    setOpenDelete(true);
    setToDeleteTopicName(oldNameValue);
    setToDeleteTopicID(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickSaveTopic = async () => {
    try {
      if (newTopic) {
        dispatch(addNewTopic(newTopic));
        setOpen(false);
      } else if (toDeleteTopicId) {
        dispatch(deleteTopic(toDeleteTopicId));
        setOpenDelete(false);
      } else if (toEditTopicId && oldEditTopicName && toEditTopicName) {
        dispatch(editTopic(toEditTopicName, toEditTopicId));
        setOpenEdit(false);
      }
      window.location.reload();
    } catch (error) {
      console.error(`💥💥 ${error}`);
    }
  };

  const topicNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTopic(e.target.value);
  };
  const handlerChangeEditTopicName = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setToEditTopicName(e.target.value);
  };

  return (
    <Fragment>
      {openEdit && oldEditTopicName && (
        <MyModal
          type="edit"
          openModal={openEdit}
          handleCloseModal={handleCloseEdit}
          modalHeader={`Edit topic ${oldEditTopicName}`}
          placeHolderTopic={toEditTopicName}
          handleChangeTopicName={handlerChangeEditTopicName}
          handleClickSave={handleClickSaveTopic}
        />
      )}

      {openDelete && toDeleteTopicName && (
        <MyModal
          type="delete"
          openModal={openDelete}
          handleCloseModal={handleCloseDelete}
          modalHeader={`Are you sure you want to delete topic ${toDeleteTopicName}?`}
          handleClickSave={handleClickSaveTopic}
        />
      )}
      <div className="flex flex-col mx-4 mt-24">
        <button onClick={handleOpen} className="self-end mr-4">
          New topic
        </button>
        <MyModal
          type="add"
          openModal={open}
          handleCloseModal={handleClose}
          modalHeader="Add new topic"
          handleChangeTopicName={topicNameChangeHandler}
          handleClickSave={handleClickSaveTopic}
        />

        <table className="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTopic.map(({ name, id }) => {
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>
                    {/* EDOT BUTTON */}
                    <button
                      onClick={() => handleOpenEdit(name, id)}
                      className="bg-green"
                    >
                      Edit
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleOpenDelete(name, id)}
                      className="text-white bg-red/80"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
export default TopicPage;
