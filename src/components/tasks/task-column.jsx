"use client"

import { cn } from "@/lib/utils"
import { TaskList } from "./task-list"


const TASKS=[
    {
        id:1,
        title:"task 1"
    },
    {
        id:2,
        title:"task 2"
    },
    {
        id:3,
        title:"task 3"
    },
    {
        id:4,
        title:"task 4"
    }
    ]
export const Taskcolumn = () => {

    const handleComplete= async () => {

    }
    
  return (
    <div className={cn("bg-background max-w-96 p-10 mx-auto flex flex-col",className)}>
        {}
        {}
        <div className="flex-1">
            <TaskList tasks={TASKS} handleComplete={handleComplete}/>
        </div>
        {}    
    </div>
  )
}

