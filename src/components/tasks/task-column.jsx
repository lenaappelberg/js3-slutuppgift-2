"use client"

import { cn } from "@/lib/utils"
import { TaskList } from "./task-list"
import { useSearchParams } from "next/navigation"
import { useTasks } from "@/context/tasksContext"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"


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
export const Taskcolumn = (date,user,className) => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
      const gettasks = async () => {
        const data=[]
        const querySnapshot= await getDocs(collection(db,"tasks"))
        querySnapshot.forEach(doc=>{data.push({
             id:doc.id,
            ...doc.data()
        })})
        console.log(data)
        setTasks(data)
        console.log(tasks)
      }
    
      gettasks()
    }, [])
    
    const {completetask}=useTasks()
    //let className {cn("bg-background max-w-96 p-10 mx-auto flex flex-col",className)}
    const handleComplete= async (task) => {
        completetask(task.id)
    }
    
  return (
    <div className="">
        <div className="flex-1">
            <TaskList tasks={TASKS} handleComplete={handleComplete}/>
        </div>
    </div>
  )
}

