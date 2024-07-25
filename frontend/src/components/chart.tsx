"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer ,ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect , useState } from "react"


const chartConfig = {
    percentage: {
    label: "percentage",
    color: "#2563eb",
  }
} satisfies ChartConfig

export function ChartComp(chartD: any) {
    const [chartData, setData] = useState<any>([]);
    useEffect(() => {
      setData(chartD.chartD)  
      console.log(chartData)
    }, [chartD])
  
    return (
    <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
    <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
        dataKey="tag"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        // angle = {90}
        tickFormatter={(value) => value.slice(0, 3  )}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {/* <Bar dataKey="percentage" fill="var(--color-percentage)" radius={4} /> */}
        <Bar dataKey="count" fill="var(--color-percentage)" radius={10} />
    </BarChart>
    </ChartContainer>

  )
}
