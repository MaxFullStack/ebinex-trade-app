import { useQueryClient, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useTradingStore } from "@/store/trading-store"

export type Candle = {
  time: number
  open: number
  high: number
  low: number
  close: number
}

const fetchInitialCandles = async (
  symbol: string,
  interval: string,
  limit = 100
): Promise<Candle[]> => {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}`
  )
  const rawData = await res.json()

  return rawData.map((candle: never[]) => ({
    time: candle[0] / 1000,
    open: parseFloat(candle[1]),
    high: parseFloat(candle[2]),
    low: parseFloat(candle[3]),
    close: parseFloat(candle[4]),
  }))
}

export function useBinanceChartData(symbol = "btcusdt", interval = "1m") {
  const queryClient = useQueryClient()
  const setLastPrice = useTradingStore((s) => s.setLastPrice)
  const queryKey = ["binance-chart", symbol, interval]

  const { data } = useQuery<Candle[]>({
    queryKey,
    queryFn: () => fetchInitialCandles(symbol, interval),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    )

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)

      const candle: Candle = {
        time: Math.floor(message.k.t / 1000),
        open: parseFloat(message.k.o),
        high: parseFloat(message.k.h),
        low: parseFloat(message.k.l),
        close: parseFloat(message.k.c),
      }

      queryClient.setQueryData<Candle[]>(queryKey, (prev = []) => {
        const withoutLast = prev.slice(0, -1)
        return [...withoutLast, candle]
      })

      setLastPrice(candle.close)
    }

    return () => ws.close()
  }, [symbol, interval, queryClient, setLastPrice])

  return { data }
}
