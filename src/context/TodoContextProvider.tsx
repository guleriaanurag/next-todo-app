import { createContext,useContext,useState } from "react"

export interface todoType{
    id: number,
    task: string,
    taskStatus: 'done' | 'pending',
    createdAt: Date,
    deadline: Date
}

interface todoContextType{
    todos: todoType[],
    addTodo: (newTodo:todoType)=>void,
    deleteTodo: (id:number)=>void,
    toggleStatus: (id:number)=>void
}

const TodoContext = createContext<todoContextType>({
    todos: [],
    addTodo: ()=>{},
    deleteTodo: ()=>{},
    toggleStatus: ()=>{}
})

export default function TodoContextProvider({children}:{children:React.ReactNode}){
    
    const [todos,setTodos] = useState<todoType[]>([]);
    
    function addTodo(newTodo: todoType):void{
        setTodos(prevState => [newTodo,...prevState])
    }

    function deleteTodo(id:number):void{
        setTodos(prevState => prevState.filter((todo)=>todo.id !== id))
    }

    function toggleStatus(id:number){
        setTodos(prevState =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, taskStatus: todo.taskStatus === 'done' ? 'pending' : 'done' } : todo
            )
        );
    }

    return(
        <TodoContext.Provider value={{todos,addTodo,deleteTodo,toggleStatus}}>
            {children}
        </TodoContext.Provider>
    );
}

export const useTodoContext = () => useContext(TodoContext);