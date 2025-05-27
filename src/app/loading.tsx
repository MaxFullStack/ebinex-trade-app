"use client"

import { motion, useReducedMotion } from "motion/react"

const Loading = () => {
  const prefersReducedMotion = useReducedMotion()

  const Spinner = prefersReducedMotion ? (
    <div className="size-16 animate-pulse rounded-full border-2 border-muted-foreground border-t-transparent" />
  ) : (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="size-16 rounded-full border-2 border-muted-foreground border-t-transparent"
    />
  )

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-muted/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <div>{Spinner}</div>
      </div>
      <p className="mt-4 text-lg font-medium">Loading</p> 
    </div>
  )
}

export default Loading
