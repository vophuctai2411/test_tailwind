import "./App.css";
import TaskList from "./components/TaksList";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import TaskDetailModal from "./components/TaskDetailModal";
import { taskType } from "./customTypes/Task";
import MultipleSelect from "./components/MultipleSelect";

function App() {
  const [showModal, setShowModal] = useState(false);
  // const tempTask: taskType[] = [
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: true,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task2",
  //     description: "description 1",
  //     priority: 0,
  //     done: false,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: false,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: true,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: true,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: true,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: true,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: true,
  //   },
  //   {
  //     id: Math.random().toString(),
  //     title: "task1",
  //     description: "description 1",
  //     priority: 0,
  //     done: true,
  //   },
  // ];

  const tempTask: taskType[] = JSON.parse(
    localStorage.getItem("todoList") || ""
  );
  const [tasks, setTasks] = useState(tempTask);
  const preventStorage = useRef(false);

  const filterTaskStatus = (statusArray: string[]) => {
    preventStorage.current = true;
    if (statusArray.length == 0) setTasks(tempTask); // localstorage.get
    else {
      const taskFiltered = tempTask.filter((item) =>
        statusArray.includes(item.done.toString())
      );
      setTasks(taskFiltered);
    }
  };

  useEffect(() => {
    if (preventStorage.current) {
      preventStorage.current = false;
      return;
    }
    localStorage.setItem("todoList", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className="rounded-t-lg h-[20rem] flex justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
        <div className="mt-20">
          <div className="flex justify-between">
            <h1 className="inline-flex items-center text-base font-semibold text-stone-300">
              TO DO LIST
            </h1>
            <button
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add Task
            </button>
            {showModal &&
              createPortal(
                <TaskDetailModal
                  onClose={() => setShowModal(false)}
                  setTasks={setTasks}
                />,
                document.body
              )}
          </div>

          <div className="mt-5 mb-5 w-48">
            <MultipleSelect filterTaskStatus={filterTaskStatus} />
          </div>

          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}

export default App;
