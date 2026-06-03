"use client"

import { cn } from "@/lib/utils"
import { TaskList } from "./task-list"
import { useSearchParams } from "next/navigation"
import { useTasks } from "@/context/tasksContext"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export const Taskcolumn = ({date,user,className}) => {
    //const [tasks, setTasks] = useState([])
    /*useEffect(() => {
      const gettasks = async () => {
        const data=[]
        const querySnapshot= await getDocs(collection(db,"tasks"))
        querySnapshot.forEach(doc=>{data.push({
             id:doc.id,
            ...doc.data()
        })})
        console.log(data)
        setTasks(data)
      }
    
      gettasks()
    }, [])*/
    const {completetask,gettasksbyuserfordate}=useTasks()
    const tasks=gettasksbyuserfordate(user.uid)
    console.log(tasks)
    const notcompleted=tasks.filter(task=>!task.completed)
    console.log(notcompleted)
    const handleComplete= async (task) => {
        completetask(task.id)
    }
    
  return (
    <div className={cn("bg-foreground max-w-96 p-10 mx-auto flex flex-col rounded-sm", className)}>
        <div className="flex-1">
            <TaskList tasks={notcompleted} handleComplete={handleComplete}/>
        </div>
    </div>
  )
}

