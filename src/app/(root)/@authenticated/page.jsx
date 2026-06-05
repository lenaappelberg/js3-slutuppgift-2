"use client"
import React from 'react'
import Logout from './log-out'
import { Taskcolumn } from '@/components/tasks/task-column'
import { isValid, parse } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/authcontext'

function authenticated() {
  const searchParams=useSearchParams()
    const date=searchParams.get("date")
    const parsed= date
        ? parse(date,"yyyy,MM,dd",newDate())
        : new Date()
        const selectedDate = isValid(parsed) ? parsed: new Date()
        const {user}=useAuth()
  return (
    <>
      <div>
        {
          user!==null&&(
            <Taskcolumn date={selectedDate} user={user} className={""}/>
          )
        } 
      </div>
      <Logout/>
    </>
  )
}

export default authenticated