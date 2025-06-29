"use client"

import Link from "next/link"
import * as z from "zod"

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams } from "next/navigation"
import { useUsers } from "@/context/usersContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useTasks } from "@/context/tasksContext"
import { eachDayOfInterval } from "date-fns"
const  base=z.object({
  title:z.string().nonempty({message:"skriv titel"}),
  ownerId:z.string().nonempty({message:"välj en anvädnare"}),
})
const single= base.extend({
  reocurring:z.literal("none"),
  date:z.date(),
})
const multiple= base.extend({
  reocurring:z.literal("multiple"),
  datemultiple:z.array(z.date()).min(1,"välj ett datum")
})
const range=base.extend({
  reocurring:z.literal("range"),
  dateRage:z.object({
    from:z.data(),
    to:z.date()
  })
})

const formSchema = z.discriminatedUnion("reocurring",{
  single,
  multiple,
  range
})
export const addTaskForm=()=> {
  const SearchParams=useSearchParams()
  const presetDate=SearchParams.get("date")
  const presetUserId=SearchParams.get("userId")
  const {users}=useUsers()
  const{addTask}=useTasks()
  const router=useRouter()
  const {submitted,setSubmitted}=useState(false)
  const loading=false
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      ownerId:presetUserId ?? "",
      reocurring:"none",
      date:presetDate ? parse(presetDate, "yyyy,MM,dd",new Date()) ?? new Date():new Date()
    },
  })
  const reocurringType=form.watch()
  async function onSubmit(values) {
    const base={
      title:values.title,
      ownerId:values.ownerId
    }
    try {
      setSubmitted(true)
      if (values.reocurring==="none") {
        await addTask({...base,date:values.date})
      }
      if (values.reocurring==="multiple") {
        await Promise.all(
          values.datemultiple.map(date=>addTask({...base,date: d}))
        )
        
      }
      if (values.reocurring==="range") {
        const days=eachDayOfInterval({start: values.dateRange.from,end:values.dateRange.to})
        await Promise.all(
          days.map(d=>addTask({...base,date:d}))
        )
      }
      form.reset()
      router.push("/")
    } catch (error) {
      console.log(error)
    }
    console.log(values)
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uppgift</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ownerId</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? users.find(
                            (user) => user.uid === field.value
                          )?.displayName
                        : "Select user"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            value={user.displayName.ToLowerCase()}
                            key={user.uid}
                            onSelect={() => {
                              form.setValue("language", user.uid)
                            }}
                          >
                            {user.displayName}
                            <Check
                              className={cn(
                                "ml-auto",
                                user.uid === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the user that will be shown in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          reocurringType==="none"&&
          <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
               <Calendar
                mode="single"
                selected={field.vale}
                onSelect={field.onChange}
                className="rounded-lg border"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        }
        {
          reocurringType==="multiple"&&
          <FormField
          control={form.control}
          name="datemultiple"
          render={({ field }) => (
            <FormItem>
               <Calendar
                mode="multiple"
                selected={field.vale}
                onSelect={field.onChange}
                className="rounded-lg border"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        }
        {
          reocurringType==="range"&&
          <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
               <Calendar
                mode="range"
                selected={field.vale}
                onSelect={field.onChange}
                className="rounded-lg border"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        }
        <Button disabled={loading||submitted} type="submit">{Loading ? "Skapar...":"Skapa"}</Button>
      </form>
    </Form>
  )
}