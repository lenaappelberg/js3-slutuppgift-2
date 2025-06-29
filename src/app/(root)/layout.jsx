"use client"
import { useAuth } from '@/context/authcontext'
import { Loader } from 'lucide-react'
import React from 'react'

const ApplicationLayout = ({authenticated,notauthenticated}) => {
  const {user,authLoaded}=useAuth()

  if (!authLoaded) {
    return(
      <div className="flex items-center justify-center h-svh">
        <Loader />
      </div>
    )
  }
  return (
    <>
    {
      user===null
      ?notauthenticated
      :authenticated
    }
    </>
  )
}

export default ApplicationLayout