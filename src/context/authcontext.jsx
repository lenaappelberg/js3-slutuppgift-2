"use client"

import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { addDoc, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"

const { createContext, useContext, useState, useEffect } = require("react")

const AuthContext=createContext()

export const AuthPovider=({ children})=>{
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(false)
    const [authLoaded,setAuthLoaded]=useState(false)
    const router=useRouter()
    console.log(user)

    useEffect(()=>{
        onAuthStateChanged(auth,async(firebaseUser)=>{
            if (!firebaseUser) {
                setUser(null)
                setAuthLoaded(true)
                return
            }
            const docref=doc(db,"users",firebaseUser.uid)
            //setUser(firebaseUser)
            const getUserDockWithRetry = async (retries=5,delay=300)=>{
                let docSnap=null
                for (let i = 0; i < retries; i++) {
                    
                    const docSnap=await getDoc(docref)
                    if (docSnap.exists())break
                    await new Promise(resolve=>setTimeout(resolve,delay))
                }

                return docSnap
            }
            const docSnap=await getUserDockWithRetry()
            if(docSnap&&docSnap.exists()){
                setUser(docSnap.data())
            }else{
                console.warn("användardokumentet finns inte")
                setUser(null)
            }

            setAuthLoaded(true)
        })
        return ()=>unsub()
    },[])
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
    const logout=async () => {
        router.replace("/")
        await signOut(auth)
    }
    const login =async (email,password) => {
        setLoading(true)
        try {
            console.log(email,password)
            await signInWithEmailAndPassword(auth,email,password)
        } catch (error) {
            console.log("error signing in",error)
            throw error
        } finally {
            setLoading(false)
        }
    }
    const value={
        user,
        loading,
        authLoaded,
        register,
        logout,
        login
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