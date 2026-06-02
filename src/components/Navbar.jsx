import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between pb-5'>
      <div>
        <h1 className='block'>
            företagplanner
        </h1>
        <Link className='hidden' href="/">Hem</Link>
        <Link className='hidden' href="/add">Lägg till uppgift</Link>
        </div>
    </nav>
  )
}

export default Navbar