import { useState } from "react";
import { todoType, useTodoContext } from "@/context/TodoContextProvider";

interface validationResponse{
    message: string,
    status: 'ok' | 'not ok'
}

export default function TodoInputBox(){
    
    const [task,setTask] = useState<string>('');
    const [deadline,setDeadline] = useState<string>('');

    const {addTodo} = useTodoContext();

    function validateInput(task:string,deadline:string):validationResponse{
        if(task.trim().length === 0 || deadline.trim().length === 0){
            return {message:'Input cannot be empty',status: 'not ok'};
        }
        if(new Date(deadline).toLocaleDateString < new Date().toLocaleDateString){
            return {message: 'Deadline cannot be less than current date',status: 'not ok'}
        }
        return {message: '',status:'ok'};
    }

    function handleAddTodo():void{
        const validationResult = validateInput(task,deadline);
        if(validationResult.status === 'not ok'){
            alert(validationResult.message);
            clearInput();
            return ;
        }
        
        const newTodo:todoType = {
            id: Math.floor(Math.random()*10000),
            task,
            taskStatus: 'pending',
            createdAt: new Date(),
            deadline: new Date(deadline)
        }
        
        addTodo(newTodo);
        
        clearInput();
    }

    function clearInput():void{
        setTask('');
        setDeadline('');
    }

    return(
        <div className="w-[80%] h-auto mt-8 mb-4 py-4 border border-gray-400 rounded-md flex items-center justify-center gap-6">
            <div className="flex flex-col gap-2 w-[60%]">
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="task">Task:</label>
                    <input 
                        type="text"
                        onChange={(e)=>setTask(e.target.value)}
                        value={task}
                        placeholder="Task..."
                        name="task"
                        className="border-2 border-black p-2 rounded-md w-[80%]"
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label htmlFor="deadline">Deadline:</label>
                    <input 
                        type="date"
                        onChange={(e)=>setDeadline(e.target.value)}
                        value={deadline}
                        name="deadline"
                        className="border-2 border-black p-2 rounded-md w-[80%]"
                    />
                </div>
            </div>
            <div className="w-[25%] flex items-center justify-center">
                <button
                    onClick={handleAddTodo}
                    className="px-4 py-3 border transition-colors duration-500 border-stone-500 rounded-lg hover:bg-stone-900 hover:text-stone-100"
                >
                    Add
                </button>
            </div>
        </div>
    );
}