"use client"

import { AppSidebar } from "@/features/layout/components/app-sidebar"
import { SiteHeader } from "@/features/layout/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import TradingScreen from "@/features/trading/screens/trading-screen"

export default function Page() {
  return (
    <div className="[--header-height:theme(spacing.14)] h-screen w-screen overflow-hidden">
      <SidebarProvider className="flex flex-col h-full w-full">
        <SiteHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="overflow-hidden">
            <TradingScreen />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
