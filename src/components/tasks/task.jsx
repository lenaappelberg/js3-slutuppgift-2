import { Button } from "../ui/button"

export const Task = ({task,handleComplete}) => {
  //onClick={()=>handleComplete(task)} onClick={()=>handleComplete(task)} cursor-pointer
  console.log(task)
  return (
    <div className="p-4" >
        <span>{task.title}</span>
        <span>Deadline:{task.date}</span>
        <button onClick={()=>handleComplete(task)}>complete</button>
    </div>
  )
}
