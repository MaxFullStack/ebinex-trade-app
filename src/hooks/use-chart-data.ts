import { useQuery } from '@tanstack/react-query'

export type ChartPoint = {
  time: string // format: 'YYYY-MM-DD'
  value: number
}

export async function fetchChartData(): Promise<ChartPoint[]> {
  const now = new Date()
  const data: ChartPoint[] = Array.from({ length: 20 }, (_, i) => {
    const date = new Date(now)
    date.setDate(now.getDate() - (20 - i))
    return {
      time: date.toISOString().slice(0, 10),
      value: 100 + Math.sin(i / 2) * 10,
    }
  })
  return new Promise((resolve) => setTimeout(() => resolve(data), 500))
}

export function useChartData() {
  return useQuery({
    queryKey: ['chart-data'],
    queryFn: fetchChartData,
    refetchInterval: 5000,
  })
}
