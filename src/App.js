import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ToDoList from "./components/ToDoList";

function App() {
  const [todo, setTodo] = useState({
    id: 0,
    description: "",
    done: false,
  });
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("todolist");
    if (localStorageData === null) return;
    const parsedList = JSON.parse(localStorageData);
    setTodoList(parsedList);
  }, []);

  useEffect(() => {
    if (todoList.length !== 0)
      localStorage.setItem("todolist", JSON.stringify(todoList));
  }, [todoList]);

  const handSubmit = (event) => {
    event.preventDefault();
    const newTodo = [...todoList];
    newTodo.push(todo);
    setTodoList(newTodo);
    setTodo({
      id: 0,
      description: "",
      done: false,
    });
  };

  const handleInput = (e) => {
    setTodo(() => ({ id: nanoid(), description: e.target.value }));
  };

  const handleDelete = (todoId) => {
    const newTodo = [...todoList].filter((value) => value.id !== todoId);
    setTodoList(newTodo);
  };

  const handleSuccessEvent = (todoId) => {
    // get target todo item
    const targetTodo = [...todoList].find((value) => value.id === todoId);
    const tardgetIndex = todoList.indexOf(targetTodo);
    targetTodo.done = !targetTodo.done;
    // clone the current list
    const newTodolist = [...todoList];
    newTodolist[tardgetIndex] = targetTodo;
    // update the actual list
    setTodoList(newTodolist);
  };

  return (
    <div className="h-screen w-screen bg-slate-100">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-gray-500 text-opacity-30 font-bold text-9xl text-center">
          {" "}
          todos{" "}
        </h1>
        <form className="w-full pt-36 pb-11 relative">
          <div className="w-full relative overflow-x-hidden rounded-full text-lg font-semibold shadow-lg ">
            <input
              value={todo.description}
              className="w-full px-6 py-4 outline-none"
              placeholder="Add todo.."
              name="description"
              onChange={handleInput}
            />
            <button
              onClick={handSubmit}
              className="font-extrabold bg-green-600 text-white text-2xl absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-[30px] w-[30px] flex items-center justify-center cursor-pointer"
            >
              <span className="">+</span>
            </button>
          </div>
        </form>
        <div className="flex flex-col">
          <ToDoList
            todoList={todoList}
            handleDelete={handleDelete}
            handleSuccessEvent={handleSuccessEvent}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
