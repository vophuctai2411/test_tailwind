import "./App.css";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TaskDetailModal from "./components/TaskDetailModal";
import { taskType } from "./customTypes/Task";
import MultipleSelect from "./components/MultipleSelect";
import backgroundImage from "./assets/Mountains.svg";
import { mockData } from "./assets/mockData";
import { Input } from "antd";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [filterValues, setFilterValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [tasks, setTasks] = useState<taskType[]>(
    JSON.parse(localStorage.getItem("todoList") || JSON.stringify(mockData))
  );

  const [showTasks, setShowTasks] = useState<taskType[]>([]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(tasks));

    //filter
    let filteredData = tasks;
    if (filterValues.length > 0) {
      const tempData = tasks.filter((item) =>
        filterValues.includes(item.done.toString())
      );
      filteredData = tempData;
    }

    //search
    let searchedData = filteredData;
    if (searchValue?.length > 0) {
      const tempData = filteredData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description.toLowerCase().includes(searchValue.toLowerCase())
      );
      searchedData = tempData;
    }

    setShowTasks(searchedData);
  }, [filterValues, tasks, searchValue]);

  return (
    <div
      style={{ height: "100vh", backgroundImage: `url(${backgroundImage})` }}
      className="Background_Image"
    >
      <div className="h-[20rem] flex justify-center ">
        <div className="m-10 mt-20">
          <div className="flex mb-10 justify-center">
            <h1
              className="inline-flex items-center text-base font-extrabold text-[#063970] opacity-75"
              style={{ fontSize: 30 }}
            >
              TO DO LIST
            </h1>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-5 flex-wrap mb-5">
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
                    allTasks={tasks}
                  />,
                  document.body
                )}
              <div style={{ minWidth: 180 }}>
                <MultipleSelect setFilterValue={setFilterValue} />
              </div>

              <div>
                <Input
                  placeholder="Input search text"
                  style={{ height: 40 }}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <TaskList tasks={showTasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
