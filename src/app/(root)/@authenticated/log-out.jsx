"use client"
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/authcontext'
import React from 'react'

const Logout = () => {
    const {logout}=useAuth()
  return (
    <Button onclick={logout}>Logout</Button>
  )
}

export default Logout