'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart({accounts}:DoughnutChartProps) {

  const accountNames = accounts.map((a)=>a.name) 
  const balances = accounts.map((a)=>a.currentBalance)

  const data ={
    datasets:[
    {
      label: 'banks',
      data:balances,
      backgroundColor:['#0747b5','#2256d8','#2f91fa']
    }
    ],
    labels:accountNames 
  }
  return <Doughnut 
  data={data}
  options={{
    cutout:'60%',
    plugins:{
      legend:{
        display: false
      }
    }
  }}
  />
}
