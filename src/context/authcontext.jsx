"use client"

import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { addDoc, doc, setDoc, Timestamp } from "firebase/firestore"

const { createContext, useContext, useState } = require("react")

const AuthContext=createContext()

export const AuthPovider=({ children})=>{
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(false)
    const [authLoaded,setAuthLoading]=useState(false)
    const register=async (email,password,displayName)=>{
        setLoading(true)
        try {
            const res = await createUserWithEmailAndPassword(auth,email,password)
            await updateProfile(res.user, {displayName})

            if (!res.user) {
                console.log("no user")
                return
            }
            await setDoc(doc(db,"users",res.user.uid),{
                uid:res.user.uid,
                email:res.user.email,
                username:res.user.displayName,
                role:"user",
                createdAt: Timestamp.now(),
                photoUrl:null,
                verified:false,
                color:"#9dedcc"
            })

        } catch (error) {
            console.log("error with user reg",error)
            throw error
        } finally{
            setLoading(false)
        }
    }
    const value={
        user,
        loading,
        authLoaded,
        register
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if (!context) {
        throw new Error("context not in provider");
    }
    return context
}