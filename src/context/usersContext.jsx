"use client"

import { onSnapshot, query } from "firebase/firestore"
import { useAuth } from "./authcontext"
import { db } from "@/lib/firebase"

const { createContext, useState, useEffect } = require("react")

const UsersContext=createContext()

export const UsersProvider=({children})=>{
    const [users,setUsers]=useState([])
    const [loading,setLoading]=useState(false)
    const {isAdmin}=useAuth()
    useEffect(()=>{
        if (!isAdmin)return

        const q=query(collection(db,"users"))
        const unsub = onSnapshot(q, querySnapshot=>{
            const  usersData=[]

            querySnapshot.forEach(doc=>{
                usersData.push(doc.data)
            })
            setUsers(usersData)
        })
        return()=>unsub()
    },[isAdmin])

    const value={
        users,
        loading
    }
    return(
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsers = () => {
    const context =useContext(Userscontext)
    if (!context) {
        throw new Error("useUsers requires userprovider")
    }
    return context
}