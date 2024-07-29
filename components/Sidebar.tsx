'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

export default function Sidebar({user}:SiderbarProps) {

  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className='flex flex-col gap-4'>
        <Link href='/' className='flex mb-12 cursor-pointer items-center gap-2'>
          <Image src="/icons/logo.png" width={44} height={44} alt='Horizon logo' className='size-[34px] max-xl:size-14' />
          <h1 className='sidebar-logo'>
            Nexus
          </h1>
        </Link>
        {sidebarLinks.map((items  )=>{
          const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`) 
          
          return(
            <Link 
              href={items.route} 
              key={items.label}
              className={cn('sidebar-link',{
                'bg-bank-gradient': isActive
              })}
            >
              <div className='relative size-6'>
                <Image 
                src={items.imgURL}
                alt={items.label}
                fill
                className={cn({'brightness-[3] invert-0': isActive})}
                />
              </div>
              <p className={cn('sidebar-label',{'!text-white':isActive})}>
                {items.label}
              </p>
              
            </Link>)
        })}
        <PlaidLink user={user}/>
      </nav>
      <Footer user={user}/>
    </section>
  )
}
