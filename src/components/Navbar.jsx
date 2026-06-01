import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
        <p>
            företagplanner
        </p>
        <Button>
          <Link href="/">Hem</Link>
        </Button>
        <Button>
        <Link href="/add">Lägg till uppgift</Link>
        </Button>
    </nav>
  )
}

export default Navbar