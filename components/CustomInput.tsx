import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { z } from "zod"
import { Control, FieldPath } from 'react-hook-form'
import { AuthformSchema } from '@/lib/utils'


const formSchema = AuthformSchema('sign-up')


interface customInputProps {
    control:  Control <z.infer<typeof formSchema>> ;
    name: FieldPath <z.infer<typeof formSchema>>;
    label:string ;
    placeholder:string
}

export default function CustomInput({control ,name , label , placeholder }:customInputProps) {


  return (
    <>
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                            placeholder={placeholder}
                            className='input-class'
                            type={name === "password"? 'password' : 'text'}
                            {...field}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2'/>
                    </div>
                </div>
            )}
        />
    </>
  )
}
