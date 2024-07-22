import Header from '@/components/Header'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'


import React from 'react'

export default async function Home() {

  const loggedIn = await getLoggedInUser()
  console.log(loggedIn)

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <Header
          type="greeting"
          title= 'Welcome,'
          user= {loggedIn?.name || 'Guest'}
          subtext= ' Access and manage your account and transactions efficiently.'
          />

          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance ={1234.23}
          />
        </header>

        recent transactions
      </div>

      <RightSidebar
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance:2345},{currentBalance:59430}]}
      />

    </section>
  )
}
