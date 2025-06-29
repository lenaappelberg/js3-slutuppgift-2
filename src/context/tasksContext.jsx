"use client"

import { addDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "./authcontext"

const { createContext, useState } = require("react")

const TaskContext=createContext()

export const TasksProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const isAdmin=useAuth()
    const addTask=async(taskdata)=>{
        if (isAdmin())return
        setLoading(true)

        try {
            
        const newTask={
            ...taskdata,
            date: format(taskData.date,"yyyy-MM-dd"),
            completed:false,
            completedAt:null,
            createdAt:serverTimestamp
        }
        await addDoc(collection(db,"tasks"),newTask)
        } catch (error) {
         console.log(error)
         throw error   
        }finally{
            setLoading(false)
        }
        //reocurring: ,
    }
    const value={
        addTask,
        loading
    }
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context =useContext(Taskscontext)
    if (!context) {
        throw new Error("useUsers requires userprovider")
    }
    return context
}