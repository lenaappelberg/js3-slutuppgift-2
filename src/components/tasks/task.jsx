

export const Task = ({task,handleComplete}) => {
  return (
    <div className="p-4 bg-background cursor-pointer" onClick={()=>handleComplete()}>
        <span>{task.title}</span>
    </div>
  )
}
