"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useEffect, useState } from "react"

function calculateAverages(fpsData) {
  if (fpsData.length === 0) return []

  const sum = { fps32: 0, fpsint8: 0, fpsPruning: 0 }
  const count = { fps32: 0, fpsint8: 0, fpsPruning: 0 }

  fpsData.forEach(d => {
    if (d.fps32 != null) {
      sum.fps32 += d.fps32
      count.fps32++
    }
    if (d.fpsint8 != null) {
      sum.fpsint8 += d.fpsint8
      count.fpsint8++
    }
    if (d.fpsPruning != null) {
      sum.fpsPruning += d.fpsPruning
      count.fpsPruning++
    }
  })

  return [
    { mode: "FP32", avgfps: count.fps32 ? (sum.fps32 / count.fps32).toFixed(2) : 0 },
    { mode: "INT8", avgfps: count.fpsint8 ? (sum.fpsint8 / count.fpsint8).toFixed(2) : 0 },
    { mode: "Pruning", avgfps: count.fpsPruning ? (sum.fpsPruning / count.fpsPruning).toFixed(2) : 0 },
  ]
}

export function ChartLineMultiple({ title, description }) {
  const [imgSrc, setImgSrc] = useState("")
  const [fpsData, setFpsData] = useState([])
  const [ws, setWs] = useState(null)

useEffect(() => {
  const socket = new WebSocket("ws://localhost:8000/ws")
  socket.onopen = () => console.log("WS connected")

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (data.frame) {
      setImgSrc("data:image/jpeg;base64," + data.frame)
    }

    if (data.fps) {
      setFpsData((prev) => {
        const existing = prev.find((d) => d.frame_index === data.frame_index)
        const modeKey = 
          data.mode === "fp32" ? "fps32" :
          data.mode === "int8" ? "fpsint8" :
          data.mode === "prune" ? "fpsPruning" : null

        if (!modeKey) return prev

        if (existing) {
          return prev.map((d) =>
            d.frame_index === data.frame_index
              ? { ...d, [modeKey]: data.fps }
              : d
          )
        } else {
          return [
            ...prev,
            {
              frame_index: data.frame_index,
              fps32: data.mode === "fp32" ? data.fps : null,
              fpsint8: data.mode === "int8" ? data.fps : null,
              fpsPruning: data.mode === "prune" ? data.fps : null,
            },
          ]
        }
      })
    }
  }

  setWs(socket)
  return () => socket.close()
}, [])

  const startAnalysis1 = () => {
    if (ws) ws.send("start_fp32")
  }

  const startAnalysis2 = () => {
    if (ws) ws.send("start_int8")
  }

  const startAnalysis3 = () => {
    if (ws) ws.send("start_prune")
  }


  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col">
        <div className="flex space-x-4 flex-row">
          <button
            onClick={startAnalysis1}
            className="w-60 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            normal Analysis
          </button>
          <button
            onClick={startAnalysis2}
            className="w-60 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            int8 Analysis
          </button>
          <button
            onClick={startAnalysis3}
            className="w-60 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            pruning Analysis
          </button>
        </div>

        {imgSrc && <img src={imgSrc} alt="Video Frame" className="mt-4 w-250 h-120 self-center" />}

        <ChartContainer
          config={{
            fps32: {
              label: "FPS",
              color: "var(--chart-1)",
            },
            fpsint8: {
              label: "FPS_INT8",
              color: "var(--chart-2)",
            },
            fpsPruning: {
              label: "FPS_PRUNING",
              color: "var(--chart-3)",
            },
          }}
          className="h-[320px] w-full"
        >
          <LineChart
            data={fpsData}
            margin={{ left: 12, right: 12, top: 8, bottom: 8 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="frame_index"
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              dataKey="fps32"
              type="monotone"
              stroke="var(--color-fps32)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="fpsint8"
              type="monotone"
              stroke="var(--color-fpsint8)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="fpsPruning"
              type="monotone"
              stroke="var(--color-fpsPruning)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>

    <ChartBarLabelCustom fpsData={fpsData} title="Average FPS Comparison" description="Average FPS: FP32 vs INT8 vs Pruning" />
    </>
  )
}

export function ChartBarLabelCustom({ title, description, fpsData }) {
  const chartData = calculateAverages(fpsData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            avgfps: { label: "avgfps", color: "var(--chart-4)" },
            mode: { color: "var(--color-label)" },
          }}
          className="w-full h-[300px]"
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis dataKey="mode" type="category" />
            <XAxis type="number" hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="avgfps"
              fill="var(--color-avgfps)"
              radius={4}
            >
              <LabelList
                dataKey="mode"
                position="insideLeft"
                offset={8}
                className="fill-[var(--color-label)]"
                fontSize={12}
              />
              <LabelList
                dataKey="avgfps"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <ChartLineMultiple title="FPS Comparision per Frame" description="FP32 vs INT8 vs Pruning" />
    </div>
  )
}

export default Dashboard
