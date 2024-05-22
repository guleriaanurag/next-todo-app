import { todoType, useTodoContext } from "@/context/TodoContextProvider";

export default function Todo({todo}:{todo:todoType}){
    
    const { deleteTodo,toggleStatus } = useTodoContext();
    
    const deadlineDay = new Date(todo.deadline).toLocaleDateString('en-US',{
        day: '2-digit',
    });
    const deadlineMonth = new Date(todo.deadline).toLocaleDateString('en-US',{month:'2-digit'});
    const deadlineYear = new Date(todo.deadline).toLocaleDateString('en-US',{year:'2-digit'});

    function handleDeleteTodo(id:number){
        deleteTodo(id);
    }

    function handleToggleStatus(id:number){
        toggleStatus(id);
    }

    return (
        <div className="w-[90%] h-[75px] border border-gray-400 rounded-md flex">
            <div className="w-[70%] flex items-center justify-evenly">
                <p className={todo.taskStatus === 'done' ? 'text-red-500 line-through' : ''}>{todo.task}</p>
                <p className="text-sm">Deadline: {`${deadlineDay}-${deadlineMonth}-${deadlineYear}`}</p>
            </div>
            <div className="w-[30%] flex items-center gap-3">
                <button 
                    className="px-3 py-2 border border-black rounded-lg transition-colors duration-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
                    onClick={()=>handleDeleteTodo(todo.id)}
                >
                    Delete
                </button>
                <button 
                    className="px-3 py-2 border border-black rounded-lg transition-colors duration-500 hover:text-white hover:bg-blue-500"
                    onClick={()=>handleToggleStatus(todo.id)}
                >
                    Mark {todo.taskStatus === 'pending' ? 'Complete' : 'Incomplete'}
                </button>
            </div>
        </div>
    );
}