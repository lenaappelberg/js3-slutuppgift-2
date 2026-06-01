"use client"
import { Task } from "./task"


export const TaskList=({tasks,handleComplete})=> {
  console.log(tasks)
  //space-y-3 w-full
  return (
    <div className="">
        {
            tasks.map((task)=>{
                <Task key={task.id} task={task} handleComplete={handleComplete}/>
            })
        }
    </div>
  )
}
