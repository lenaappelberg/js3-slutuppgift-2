"use client"
import { Taskcolumn } from '@/components/tasks/task-column'
import { useUsers } from '@/context/usersContext'
import { isValid } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Alltaskslist() {
    const searchParams=useSearchParams()
    const date=searchParams.get("date")
    const parsed= date
        ? parse(date,"yyyy,MM,dd",newDate())
        : new Date()
    const selectedDate = isValid(parsed) ? parsed: new Date()
    const {users}=useUsers()
  return (
    <>
    {
        !!users.length && users.map(user=>{
            return <Taskcolumn key={user.uid} date={selectedDate} user={user} className="w-72"/>
        })
    }
    </>
  )
}

export default Alltaskslist