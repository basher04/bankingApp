'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart({accounts}:DoughnutChartProps) {
  const data ={
    datasets:[
    {
      label: 'banks',
      data:[1250 ,2300 ,3789],
      backgroundColor:['#0747b5','#2256d8','#2f91fa']
    }
    ],
    labels:['bank 1','band 2','bank 3']
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
