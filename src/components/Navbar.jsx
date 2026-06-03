"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useAuth } from '@/context/authcontext'

const Navbar = () => {
  const {isAdmin}=useAuth()
  return (
    <nav className='flex flex-row items-center justify-between pb-5'>
      <div>
        <h1 className='block'>
            företagplanner
        </h1>
        <Link className='block' href="/">Hem</Link>
        {
          isAdmin()&&(
            <>
            <Link href="/all">All</Link>
            <Link href="/add">Add tasks</Link>
            </>
          )
        }
        </div>
    </nav>
  )
}

export default Navbar