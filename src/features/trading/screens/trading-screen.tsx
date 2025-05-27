"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import TradingViewChart from "@/features/trading/components/trading-view-chart"
import { useTradingStore } from "@/store/trading-store"

export default function TradingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)

  const placeOrder = useTradingStore((s) => s.placeOrder)
  const lastPrice = useTradingStore((s) => s.lastPrice)
  const history = useTradingStore((s) => s.history)

  const [amount, setAmount] = useState(1)
  const [duration] = useState(60) // duração fixa de 60s por ordem
  const symbol = "BTC/USDT"

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(() => {
      containerRef.current?.style.setProperty(
        "--resize-hint",
        Math.random().toString()
      )
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleOrder = (direction: "buy" | "sell") => {
    if (!lastPrice) return
    placeOrder({
      symbol,
      amount,
      direction,
      entryPrice: lastPrice,
      duration,
    })
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col md:flex-row h-full w-full gap-4 p-4 overflow-hidden"
    >
      <div className="flex-1 h-full rounded-xl bg-muted/50 p-2 overflow-hidden">
        <TradingViewChart />
      </div>

      <div className="w-full md:w-80 shrink-0 space-y-4">
        <Card className="p-4">
          <div className="flex flex-col gap-2">
            {/* Tempo fixo */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Tempo</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{duration} seg</span>
              </div>
            </div>

            {/* Valor */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Valor (U$)</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAmount((v) => Math.max(1, v - 1))}
                >
                  -
                </Button>
                <Input
                  className="w-20"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                  min={1}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAmount((v) => v + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-2 mt-6">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleOrder("buy")}
              >
                COMPRAR
              </Button>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => handleOrder("sell")}
              >
                VENDER
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="operations">Operações</TabsTrigger>
            <TabsTrigger value="orders">Ordens</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="operations">
            <div className="p-2 text-sm text-muted-foreground">
              Sem operações no momento.
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="p-2 text-sm text-muted-foreground">
              Sem ordens ativas.
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="p-2 text-sm space-y-2">
              {history.length === 0 ? (
                <div className="text-muted-foreground">Sem histórico.</div>
              ) : (
                history.map((order) => (
                  <div key={order.id} className="border-b pb-2">
                    <div className="flex justify-between">
                      <span>{order.symbol}</span>
                      <span
                        className={
                          order.result === "win"
                            ? "text-green-500"
                            : order.result === "lose"
                            ? "text-pink-500"
                            : "text-muted-foreground"
                        }
                      >
                        {order.result === "win"
                          ? "+ $"
                          : order.result === "lose"
                          ? "- $"
                          : "~ "}
                        {order.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleTimeString()} /{" "}
                      {order.duration}s / {order.direction.toUpperCase()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
