"use client"

import { useEffect, useRef } from "react"
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  CandlestickSeries,
} from "lightweight-charts"
import { useBinanceChartData } from "@/hooks/use-binance-chart-data"

export default function TradingViewChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const { data } = useBinanceChartData("btcusdt", "1m")

  useEffect(() => {
    if (!chartRef.current) return

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        background: { color: "#1e1e2f" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#2c2e3e" },
        horzLines: { color: "#2c2e3e" },
      },
      timeScale: { timeVisible: true },
      crosshair: { mode: 0 },
    })

    const candlestickOptions = {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    }

    const series = chart.addSeries(CandlestickSeries, candlestickOptions)
    chart.timeScale().fitContent()

    chartInstance.current = chart
    seriesRef.current = series

    // Resize observer instead of window resize
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current && chartInstance.current) {
        chartInstance.current.resize(
          chartRef.current.clientWidth,
          chartRef.current.clientHeight
        )
      }
    })

    resizeObserver.observe(chartRef.current)

    return () => {
      chart.remove()
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!data || !seriesRef.current) return
    seriesRef.current.setData(data as CandlestickData[])
  }, [data])

  return <div ref={chartRef} className="w-full h-full" />
}
