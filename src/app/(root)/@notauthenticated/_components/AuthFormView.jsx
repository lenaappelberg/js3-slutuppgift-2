"use client"
import React, { useState } from 'react'
import Loginform, { loginFormSchema } from './loginform'
import RegisterForm, { formSchema } from './registerform'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";

export const AuthFormView = () => {
    const [showLogin, setShowlogin] = useState(true)
    const changeForm=(formName)=>{
      if (formName==="login") {
        setShowlogin(true)
      }else if (formName ==="register") {
        setShowlogin(false)
      }
    }

    const LoginForm=useForm({
        resolver:zodResolver(loginFormSchema),
        defaultValues:{
          email:"",
          password:""
        },})
        const registerForm=useForm({
            resolver:zodResolver(formSchema),
            defaultValues:{
              username:"",
              email:"",
              password:"",
              confirmpassword:"",
            },
            
          })
  return (
    <div>
        {
            showLogin
            ?<Loginform changeForm={changeForm} form={loginFormSchema}/>
            :<RegisterForm changeForm={changeForm} form={formSchema}/>
        }
    </div>
  )
}