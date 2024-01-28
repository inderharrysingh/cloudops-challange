
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"

import { LOGIN_URL } from "../../lib/config"


const FormSchema = z.object({
    email: z.string().email("Not valid mail"),
    password: z.string().min(6, {
        message: "Password must be at least 2 characters.",
    }),
})

export function LoginSection() {


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })

        console.log(data)
        const response = await axios.post(LOGIN_URL, {
            email: data.email,
            password: data.password
        })

        console.log(response)

    }



    return (
        <div className="w-full h-full flex items-center justify-center">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-28 w-2/3 space-y-6  flex flex-col    ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="text-left">
                                <FormLabel className="">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type you username " {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="text-left">
                                <FormLabel className="">Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type your password" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="ml-auto">

                        <Button type="submit">Submit</Button>
                    </div>
                    <div className="">

                        <a href="/register" >New User ? Register Here </a>
                    </div>
                </form>
            </Form>
        </div>
    )
}
