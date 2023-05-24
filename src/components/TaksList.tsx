import { taskType } from "../customTypes/Task";
import { createPortal } from "react-dom";
import TaskDetailModal from "../components/TaskDetailModal";
import { useState } from "react";
import { Rate } from "antd";

type taskListProps = {
  tasks: taskType[];
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
};

function TaskList({ tasks, setTasks }: taskListProps) {
  const defaulSelectedItem: taskType | boolean = false;
  const [itemWillBeEditted, setItemWillBeEditted] = useState<
    taskType | boolean
  >(defaulSelectedItem);

  const changeTaskStatus = (item: taskType) => {
    const itemAfterChange = {
      ...item,
      done: !item.done,
    };

    setTasks((previousItem) => {
      const replaceItems = previousItem.map((obj) => {
        if (itemAfterChange.id == obj.id) return itemAfterChange;
        else return obj;
      });

      return replaceItems;
    });
  };

  const deleteTask = (item: taskType) => {
    setTasks((previousItem) => {
      const filterItems = previousItem.filter((obj) => {
        return obj.id !== item.id;
      });
      return filterItems;
    });
  };

  const taskElement = tasks.map((item) => {
    return (
      <div
        className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-5"
        key={Math.random()}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              defaultChecked={item.done}
              onClick={() => changeTaskStatus(item)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900  dark:text-white">
              {item.done ? <s>{item.title}</s> : item.title}
            </p>
            <p className="text-sm text-gray-500  dark:text-gray-400">
              {item.done ? <s>{item.description}</s> : item.description}
            </p>
            <Rate value={item.priority} disabled style={{ fontSize: 10 }} />
          </div>
          {!item.done && (
            <div className="flex w-9">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                onClick={() => setItemWillBeEditted(item)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              <svg
                fill="none"
                stroke="red"
                strokeWidth={1.5}
                viewBox="0 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                onClick={() => deleteTask(item)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-4">{taskElement}</div>
      {typeof itemWillBeEditted != "boolean" &&
        createPortal(
          <TaskDetailModal
            onClose={() => setItemWillBeEditted(false)}
            setTasks={setTasks}
            task={itemWillBeEditted}
          />,
          document.body
        )}
    </>
  );
}

export default TaskList;
