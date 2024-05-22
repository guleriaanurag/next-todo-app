'use client'

import TodoContextProvider from "@/context/TodoContextProvider";
import TodoInputBox from "@/ui/TodoInputBox";
import TodoWrapper from "@/ui/TodoWrapper";

export default function Home(){
  return(
    <div className="min-h-screen h-auto max-w-screen w-screen flex flex-col items-center justify-center gap-5">
        <TodoContextProvider>
          <TodoInputBox />
          <TodoWrapper />
        </TodoContextProvider>
    </div>
  );
}