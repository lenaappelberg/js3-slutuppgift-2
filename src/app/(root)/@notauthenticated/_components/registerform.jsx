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
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

export const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email({ message: "ange ett giltig epostaddress" }),
  password: z.string().nonempty().min(6),
  confirmpassword: z.string().nonempty({ message: "snälla bekräfta lösenordet" }),
  admin: z.boolean()
}).refine(data => data.password === data.confirmpassword, {
  message: "lösenorden matchar inte",
  path: ["confirmpassword"]
})

const RegisterForm = ({ changeForm, form }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { register, loading } = useAuth()
  const [admincheck, setAdminheck] = useState(false)
  const [usercheck, setUsercheck] = useState(false)

  async function onSubmit(values) {
    try {
      const { email, password, username, admin } = values
      console.log(admin)
      let userrole=""
      if (admin) {
        userrole="admin"
      }else userrole="user"
      await register(email, password, username,userrole)
    } catch (error) {
      //const errorMessage=getErrorMessage(error.code)
      setErrorMessage(error.message)
    }

    console.log(values)
  }
  const registerForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      admin:false
    },
  })
  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
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
                  <Input type="password" placeholder="Enter Password" {...field} />
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
                <FormLabel>confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="please confirm your password" {...field} />
                </FormControl>
                <FormDescription>This is your confirmed password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={registerForm.control}
            name="admin"
            render={({field}) => (
              <FormItem>
                <FormDescription>Make an admin account </FormDescription>
                <FormControl>
                  <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  />
                  
                </FormControl>
              </FormItem>
            )}
          />
          <p>Do you have an account <span onClick={() => changeForm("login")} className="underline cursor-pointer">Log in</span></p>
          <Button disabled={loading} type="submit">register</Button>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm