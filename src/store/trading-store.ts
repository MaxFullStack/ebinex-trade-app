import { create } from "zustand"

type Order = {
  id: string
  symbol: string
  amount: number
  direction: "buy" | "sell"
  entryPrice: number
  exitPrice?: number
  result?: "win" | "lose"
  createdAt: number
  duration: number
}

type TradingState = {
  history: Order[]
  lastPrice?: number
  placeOrder: (input: {
    symbol: string
    amount: number
    direction: "buy" | "sell"
    entryPrice: number
    duration: number
  }) => void
  settleOrder: (id: string, exitPrice: number) => void
  setLastPrice: (price: number) => void
}

export const useTradingStore = create<TradingState>((set, get) => ({
  history: [],
  lastPrice: undefined,

  setLastPrice: (price) => {
    set({ lastPrice: price })
  },

  placeOrder: ({ symbol, amount, direction, entryPrice, duration }) => {
    const id = crypto.randomUUID()
    const createdAt = Date.now()

    const newOrder: Order = {
      id,
      symbol,
      amount,
      direction,
      entryPrice,
      createdAt,
      duration,
    }

    set((state) => ({
      history: [newOrder, ...state.history],
    }))

    setTimeout(() => {
      const currentOrder = get().history.find((o) => o.id === id)
      if (!currentOrder) return

      const currentPrice = get().lastPrice
      if (currentPrice !== undefined) {
        get().settleOrder(id, currentPrice)
      }
    }, duration * 1000)
  },

  settleOrder: (id, exitPrice) => {
    set((state) => ({
      history: state.history.map((o) => {
        if (o.id !== id) return o

        const isWin =
          o.direction === "buy"
            ? exitPrice > o.entryPrice
            : exitPrice < o.entryPrice

        return {
          ...o,
          exitPrice,
          result: isWin ? "win" : "lose",
        }
      }),
    }))
  },
}))
