'use client';
import React from 'react'
import CountUp from 'react-countup'

export default function AnimatedCounter({end}:{end:number}) {
  return (
    <div className="w-full total-balance-amount flex-center gap-2">
        <CountUp 
            duration={2.75}
            decimals={2}
            decimal=","
            prefix="$"
            end={end}
        />
    </div>
  )
}
