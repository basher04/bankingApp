'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { AuthformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'
import Copy from './Copy'

export default function AuthForm({type}:{type:string}) {

    const [user, setuser] = useState(null)
    const [isloding, setIsloding] = useState(false)

    const router = useRouter()

    const formSchema = AuthformSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: ""
        },
    })
    

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        
        setIsloding(true)

        try {
            if(type === 'sign-up'){
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.Address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.PostalCode!,
                    dateOfBirth: data.DateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                }
                let newUser = await signUp(userData)
                setuser(newUser)
            }
            if(type === 'sign-in'){
                const response = await signIn({
                    email:data.email,
                    password:data.password
                })
                console.log(response)

                if(response) router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsloding(false)
        }
        
        
    }  

    console.log(form)

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='flex  cursor-pointer items-center gap-1'>
                <Image src="/icons/logo.png" width={34} height={34} alt='Horizon logo' />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                    Nexus
                </h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Link Account':type === 'sign-in'?'Sign In':'Sign Up'}
                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    {user ? 'Link your account to get started' : 'Please enter your details'}
                </p>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                <PlaidLink user={user} variant="primary"/>
            </div>
        ): ( 
            <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {type === "sign-up" && (
                        <>
                            <div className='flex gap-4'>
                                <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your First Name' />
                                <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your Last Name' />
                            </div>
                            <CustomInput control={form.control} name='Address1' label='Address' placeholder='Enter your Address' />
                            <CustomInput control={form.control} name='city' label='City' placeholder='Enter your City' />
                            <div className='flex gap-4'>
                                <CustomInput control={form.control} name='state' label='State' placeholder='example: NY' />
                                <CustomInput control={form.control} name='PostalCode' label='Postal Code ' placeholder='ex:11101' />
                            </div>
                            <div className='flex gap-4'>
                                <CustomInput control={form.control} name='DateOfBirth' label='Date Of Birth' placeholder='YYYY-MM-DD' />
                                <CustomInput control={form.control} name='ssn' label='SSN ' placeholder='ex:1234' />
                            </div>
                        </>
                    )}
                    <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' />
                    <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' />
                    <div className='flex flex-col gap-4'>
                        <Button className="form-btn" type="submit" disabled={isloding}>
                            {isloding? (
                            <>
                            <Loader2 size={20} className="animate-spin"/>&nbsp; loading... 
                            </>):type === "sign-in"? 'Sign In' : 'Sign Up'}
                            
                        </Button>
                    </div>
                </form>
            </Form>
            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>
                    {type === 'sign-in'?"Don't have an account?" : "Already have an account?"}
                </p>
                <Link href={type === 'sign-in' ? '/sign-up':'/sign-in'} className='form-link'>
                    {type === 'sign-up' ? 'Sign In' : 'Sign Up'}
                </Link>
            </footer>
            <div>
                {type === 'sign-in' &&  (
                
                <div className='flex flex-col align-middle'>
                    <h2 className=' text-lg'>test acount:</h2>
                    <div>
                        <Copy font="xl" title='testEmail@gmail.com'/>
                    </div>
                    <div>
                        <Copy font="xl" title='testPassword'/>
                    </div>
                </div>
                )}
            </div>
            </>
        )} 
    </section>
  )
}
