import { initializeApp,getApp,getApps } from "firebase/app"
import{getFirestore,persistentLocalCache,persistentMultipleTabManager,initializeFirestore, CACHE_SIZE_UNLIMITED} from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apikey:process.env.NEXT_PUBLIC_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_API_AUTH_DOMAIN,
    projectId:process.env.NEXT_PUBLIC_API_PROJECT_ID,
    storageBucket:process.env.NEXT_PUBLIC_API_STORAGE_BUCKET,
    messagingSenderId:process.env.NEXT_PUBLIC_API_MESSAGE_SENDER_ID,
    appId:process.env.NEXT_PUBLIC_API_APP_ID,
}

const app=getApps().length ? getApp() : initializeApp(firebaseConfig)
//const db=getFirestore(app)
let db
try {
    db= initializeFirestore(app,{
        localCache:persistentLocalCache({
            tabManager:persistentMultipleTabManager(),
            cacheSizeBytes:CACHE_SIZE_UNLIMITED
        })
    })
} catch (error) {
    console.warn("indexedDB cache deactivated",error.code)
    db=getFirestore(app)
}

const auth=getAuth(app)
const storage=getStorage(app)
export {
    db,
    auth,
    storage
}