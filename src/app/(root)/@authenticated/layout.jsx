"use client"
import Navbar from '@/components/Navbar'
import React from 'react'

function layout({children}) {
  return (
    <>
    <Navbar/>
    <main>
      {children}
    </main>
    </>
  )
}

export default layout