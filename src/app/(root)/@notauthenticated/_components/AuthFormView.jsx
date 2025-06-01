"use client"
import React, { useState } from 'react'
import Loginform from './loginform'
import RegisterForm from './registerform'

export const AuthFormView = () => {
    const [showLogin, setShowlogin] = useState(null)
  return (
    <div>AuthFormView
        {
            showLogin
            ?<Loginform/>
            :<RegisterForm/>
        }
    </div>
  )
}