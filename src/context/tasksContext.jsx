"use client"

import { serverTimestamp } from "firebase/firestore"

const { createContext } = require("react")

const TaskContext=createContext()

export const TasksProvider=({children})=>{
    //reocurring: ,
    /*const addTask=async(taskdata)=>{
        const newTask={
            title: ,
            ownerId: ,
            date: ,
            order: ,
            completed:false,
            completedAt:null,
            createdAt:serverTimestamp
        }
    }*/
    const value={

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