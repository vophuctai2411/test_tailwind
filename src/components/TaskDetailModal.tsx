import { useState } from "react";
import { taskType } from "../customTypes/Task";
import { Rate } from "antd";

type ModalProps = {
  onClose: () => void;
  setTasks?: React.Dispatch<React.SetStateAction<taskType[]>>;
  task?: taskType;
};

function TaskDetailModal({ onClose, setTasks, task }: ModalProps) {
  const isEdit = task?.id;
  const [priority, setPriority] = useState(isEdit ? task?.priority : 0);

  const submitFormAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title =
      (document?.getElementById("taskTitle") as HTMLInputElement)?.value || "";
    const description =
      (document?.getElementById("taskDescription") as HTMLInputElement)
        ?.value || "";

    if (setTasks) {
      if (isEdit) {
        const itemAfterChange = {
          ...task,
          title,
          description,
          priority,
        };

        setTasks((previousItem) => {
          const replaceItems = previousItem.map((obj) => {
            if (itemAfterChange.id == obj.id) return itemAfterChange;
            else return obj;
          });
          return replaceItems;
        });
      } else {
        const newTask: taskType = {
          id: Math.random().toString(),
          title,
          description,
          priority,
          done: false,
        };

        setTasks((previousTasks) => [newTask, ...previousTasks]);
      }
      onClose();
    }
  };

  return (
    <div
      id="authentication-modal"
      className="mt-40 flex justify-center fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {isEdit ? "Edit" : "Create"} new Task
            </h3>
            <form
              className="space-y-6"
              action="#"
              onSubmit={(e) => submitFormAction(e)}
            >
              <div>
                <label
                  htmlFor="taskTitle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  name="taskTitle"
                  id="taskTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Type a new task title"
                  required
                  defaultValue={task?.title}
                />
              </div>
              <div>
                <label
                  htmlFor="taskDescription"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  name="taskDescription"
                  id="taskDescription"
                  placeholder="Type your task description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  defaultValue={task?.description}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Priority
                </label>
                <Rate
                  value={priority}
                  onChange={(value) => setPriority(value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;
