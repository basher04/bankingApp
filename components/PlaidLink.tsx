import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { StyledString } from 'next/dist/build/swc'
import { useRouter } from 'next/navigation'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import Image from 'next/image'

export default function PlaidLink({user , variant}:PlaidLinkProps) {

    const router = useRouter()
    const [token, setToken] = useState("")

    useEffect(()=>{
        const getLinkToken = async () => {
            const data = await createLinkToken(user) 
            setToken(data?.linkToken)
        }
        getLinkToken()
    },[user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>( async (public_token:string)=>{
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })
        router.push('/')
    },[user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    }
    const { open, ready } = usePlaidLink(config);


  return (
    <>
    {variant === 'primary'? (
        <Button 
        onClick={()=>open()}
        disabled={!ready}
        className='plaidlink-primary'
        >
            Connect bank
        </Button>
    ):variant === 'ghost'?(
        <Button onClick={()=>open()} className='plaidLink-ghost' variant="ghost">
            <Image 
            src='/icons/connect-bank.svg'
            alt='connect bank'
            width={24}
            height={24}
            />
            <p className='hidden xl-block text-[16px] font-semibold text-black-2'>
                Connect bank
            </p>
        </Button>
    ):variant === 'link'?(
        <Button onClick={()=>open()} className='plaidLink-ghost' variant="ghost">
            <Image
                src='/icons/plus.svg'
                width={20}
                height={20}
                alt='plus'
                />
            <p className=' xl-block text-[16px] font-semibold text-black-2'>
                add bank
            </p>
        </Button>
    ):(
        <Button onClick={()=>open()} className='sidebar-link'>
            <Image 
            src='/icons/connect-bank.svg'
            alt='connect bank'
            width={24}
            height={24}
            />
            <p className='text-[16px] font-semibold text-black-2'>
                Connect bank
            </p>
            
        </Button>
    )}
    </>
)
}
