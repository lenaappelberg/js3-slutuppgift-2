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

const formSchema=z.object({
  username:z.string().min(2).max(50),
  email:z.string().email({message:"ange ett giltig epostaddress"}),
  password: z.string().nonempty().min(6),
  confirmpassword: z.string().nonempty({message:"snälla bekräfta lösenordet"})
}).refine(data=>data.password=== data.confirmpassword,{
  message:"lösenorden matchar inte",
  path: ["confirmPassword"]
})
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
const RegisterForm = () => {
  const [errorMessage, seterrorMessage] = useState(null)
  const registerForm=useForm({
    resolver:zodResolver(formSchema),
    defaultvalues:{
      username:"",
      email:"",
      password:"",
      confirmpassword:"",
    },
    
  })

  return (
    <div>RegisterForm
      { errorMessage && <p>{ errorMessage }</p>}
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onSubmit)}>
      <FormField
        control={registerForm.control}
        name="username"
        render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="Username" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
      </FormItem>
    )}
  />
    <FormField
          control={registerForm.control}
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
        control={registerForm.control}
        name="password"
        render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="Enter Password" {...field} />
          </FormControl>
          <FormDescription>This is your password.</FormDescription>
          <FormMessage />
      </FormItem>
    )}
  />
  <FormField
      control={registerForm.control}
      name="confirmpassword"
      render={({ field }) => (
      <FormItem>
        <FormLabel>confirmPassword</FormLabel>
        <FormControl>
          <Input placeholder="please confirm your password" {...field} />
        </FormControl>
        <FormDescription>This is your confirmedpassword</FormDescription>
        <FormMessage />
    </FormItem>
  )}
  />
      <Button type="submit">register</Button>
    </form>
  </Form>
    </div>
  )
}

export default RegisterForm