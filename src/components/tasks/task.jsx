
"use client"
export const Task = ({task,handleComplete}) => {
  console.log(task)
  return (
    <div className="p-4 bg-background cursor-pointer" onClick={()=>handleComplete(task)}>
        <span>{task.title}task</span>
    </div>
  )
}
