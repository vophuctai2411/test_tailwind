import { taskType } from "../../customTypes/Task";
import { createPortal } from "react-dom";
import TaskDetailModal from "../TaskDetailModal";
import { useState } from "react";
import { Rate } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./TaskList.css";
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
        className={`w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-5  ${
          item.done ? "grayscale bg-slate-200" : "bg-white"
        } `}
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
            <div className="flex w-9 space-x-2">
              <EditOutlined
                onClick={() => setItemWillBeEditted(item)}
                style={{ color: "#4E89FF" }}
                className="antdIcon"
              />
              <DeleteOutlined
                onClick={() => deleteTask(item)}
                style={{ color: "#ff6666" }}
                className="antdIcon"
              />
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-wrap gap-5">{taskElement}</div>
      {typeof itemWillBeEditted != "boolean" &&
        createPortal(
          <TaskDetailModal
            onClose={() => setItemWillBeEditted(false)}
            setTasks={setTasks}
            task={itemWillBeEditted}
            allTasks={tasks}
          />,
          document.body
        )}
    </>
  );
}

export default TaskList;
