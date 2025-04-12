"use client"

import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function LineChart() {
  const [chartData, setChartData] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  // Generate random data for the chart
  useEffect(() => {
    setMounted(true)
    const generateData = () => {
      const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`)
      const data = Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 20)

      return {
        labels,
        datasets: [
          {
            label: "Usage %",
            data,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      }
    }

    setChartData(generateData())
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgb(15, 23, 42)",
        titleColor: "rgb(255, 255, 255)",
        bodyColor: "rgb(148, 163, 184)",
        borderColor: "rgb(51, 65, 85)",
        borderWidth: 1,
        padding: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: {
            size: 9,
          },
          maxRotation: 0,
          callback: function (val: any, index: number) {
            return index % 4 === 0 ? this.getLabelForValue(val) : ""
          },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: "rgb(51, 65, 85)",
          drawBorder: false,
        },
        ticks: {
          color: "rgb(148, 163, 184)",
          font: {
            size: 9,
          },
          stepSize: 25,
        },
      },
    },
  }

  if (!mounted || !chartData) {
    return <div className="h-full w-full flex items-center justify-center text-slate-500">Loading chart...</div>
  }

  return (
    <div className="h-full w-full">
      <Line data={chartData} options={options as any} />
    </div>
  )
}
