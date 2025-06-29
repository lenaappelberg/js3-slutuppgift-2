"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/context/authcontext';
import { getErrorMessage } from '@/lib/getFirebaseError';

export const loginFormSchema=z.object({
  email:z.string().email({message:"ange ett giltig epostaddress"}),
  password: z.string().nonempty().min(6)
})
  
const Loginform = ({changeForm,form}) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { login, loading }=useAuth()

  async function onSubmit(values) {
    try {
      const {email,password}=values
      await login(email,password)
    } catch (error) {
      //const errorMessage=getErrorMessage(error.code)
      setErrorMessage(error.message)
    }
    
    console.log(values)
  }

  const LoginForm=useForm({
    resolver:zodResolver(form),
    defaultValues:{
      email:"",
      password:"",
    },
    
  })

  return (
    <>
    <h2 className="text-center font-bold text-2x1 mb-5">Logga in</h2>
      { errorMessage && <p>{ errorMessage }</p>}
      <Form {...LoginForm}>
        <form onSubmit={LoginForm.handleSubmit(onSubmit)}>
    <FormField
          control={LoginForm.control}
          name="email"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Your email" {...field} />
            </FormControl>
            <FormDescription>This is your email</FormDescription>
            <FormMessage />
        </FormItem>
      )}
  />
  <FormField
        control={LoginForm.control}
        name="password"
        render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Enter Password" {...field} />
          </FormControl>
          <FormDescription>This is your password.</FormDescription>
          <FormMessage />
      </FormItem>
    )}
  />
  <p>Glömt ditt lösenord? <span onClick={()=>changeForm("register")} className="underline cursor-pointer">Regstera dig</span></p>
      <Button disabled={loading} type="submit">login</Button>
    </form>
  </Form>
    </>
  )
}

export default Loginform