"use client"
import { useAuth } from '@/context/authcontext'
import React from 'react'

const ApplicationLayout = ({authenticated,notauthenticated}) => {
  const {user}=useAuth()
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