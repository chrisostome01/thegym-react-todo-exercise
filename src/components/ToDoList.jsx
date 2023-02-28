import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ToDoList({
  todoList,
  handleDelete,
  handleSuccessEvent,
}) {

  return (
    <>
      {todoList.map((value, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-500 border-opacity-40 py-4"
          >
            <div className="flex items-center justify-between gap-4">
              <input
                type="checkbox"
                checked={value.done}
                onClick={() => handleSuccessEvent(value.id)}
              />
              <div className={`text-base font-medium text-gray-600 ${value.done ? 'line-through' : ''}`}>
                {" "}
                {value.description}
                {" "}
              </div>
            </div>
            <button
              onClick={() => handleDelete(value.id)}
              className="cursor-pointer bg-gray-500 bg-opacity-40 rounded-full w-[40px] h-[40px]"
            >
               <FontAwesomeIcon icon={faTrash} className='text-red-500' />
            </button>
          </div>
        );
      })}
    </>
  );
}
