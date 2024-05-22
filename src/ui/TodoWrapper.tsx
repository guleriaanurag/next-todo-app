import Todo from "@/components/Todo";
import { useTodoContext } from "@/context/TodoContextProvider";

export default function TodoWrapper(){
    const {todos} = useTodoContext();

    return(
        <div className="w-[80%] h-auto px-4 flex flex-col items-center justify-center gap-6">
            {todos.map((todo)=>(
                <Todo todo={todo} key={todo.id}/>
            ))}
        </div>
    );
}