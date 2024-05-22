import { createContext,useContext,useEffect,useState } from "react"

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
        setTodos((prevState)=>{
            const newState = [...prevState,newTodo]
            localStorage.setItem('todos',JSON.stringify(newState));
            return newState;
        })
    }

    function deleteTodo(id:number):void{
        setTodos( (prevState) => {
            const newState = prevState.filter((todo)=>todo.id !== id);
            localStorage.setItem('todos',JSON.stringify(newState));
            return newState;
        })
    }

    function toggleStatus(id: number) {
        setTodos((prevState) => {
            const newState = prevState.map((todo) =>
                todo.id === id ? { ...todo, taskStatus: todo.taskStatus === 'done' ? 'pending' : 'done' } : todo
            );
            localStorage.setItem('todos', JSON.stringify(newState));
            return newState;
        });
    }

    useEffect(()=>{
        const storedTodos = localStorage.getItem('todos');
        if(storedTodos){
            const todoList: todoType[] = JSON.parse(storedTodos);
            setTodos(todoList);
        }
    },[])

    return(
        <TodoContext.Provider value={{todos,addTodo,deleteTodo,toggleStatus}}>
            {children}
        </TodoContext.Provider>
    );
}

export const useTodoContext = () => useContext(TodoContext);