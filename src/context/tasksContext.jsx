"use client"

import { addDoc, collection, DocumentReference, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { useAuth } from "./authcontext"
import { db } from "@/lib/firebase"
import { format } from "date-fns"

const { createContext, useState, useContext, useEffect } = require("react")

const TaskContext=createContext()

export const TasksProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const {isAdmin,authloaded,user}=useAuth()
    const [tasks, setTasks] = useState([])
    useEffect(() => {
      if (!user||authloaded)return
      setLoading(true)
      let q
      if (isAdmin()) {
        q=query(collection(db,"tasks"),orderBy("date"))
      }else{
        q=query(collection(db,"tasks"),orderBy("date"),where("ownerId","==",user.uid))
      }
      const unsub = onSnapshot(q,querySnap=>{
        const data=[]
        querySnap.forEach(doc=>{data.push({
             id:doc.id,
            ...doc.data()
        })})
        //const updatedtasks=querySnap.map(doc=>({
           
        //}))
        console.log(data)
        setTasks(data)
        console.log(tasks)
        setLoading(false)
      })
      return () => unsub()
    }, [isAdmin])
    const completetask= async (taskId)=>{
        setLoading(true)
        try {
            const taskref=doc(db,"tasks",taskId)
            await updateDoc(taskref,{
                completed:true
            })
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }
    const getnextorder=()=>{}
    const addTask=async(taskdata)=>{
        if (!isAdmin)return
        setLoading(true)

        try {
            console.log("admin")
        const newTask={
            ...taskdata,
            date: format(taskdata.date,"yyyy-MM-dd"),
            completed:false,
            completedAt:null,
            createdAt:serverTimestamp()
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
        loading,
        completetask
    }
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context =useContext(TaskContext)
    if (!context) {
        throw new Error("useUsers requires userprovider")
    }
    return context
}