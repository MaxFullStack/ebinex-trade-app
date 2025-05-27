"use client"

import * as React from "react"
import {
  Command,
  DollarSign,
  GraduationCap,
  Layers,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/features/layout/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Trade",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "Portal de Negociação", url: "#" },
        { title: "Exchange Cripto", url: "#" },
        { title: "Novas Opções", url: "#" },
      ],
    },
    {
      title: "Comprar Cripto",
      url: "#",
      icon: DollarSign,
      items: [
        { title: "Comprar com 1 Click", url: "#" },
        { title: "Depositar com Pix", url: "#" },
      ],
    },
    {
      title: "Educação",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Blog", url: "#" },
        { title: "O que é Bitcoin", url: "#" },
        { title: "O que são as Novas Opções", url: "#" },
      ],
    },
    {
      title: "Mais",
      url: "#",
      icon: Layers,
      items: [
        { title: "FAQ", url: "#" },
        { title: "Sobre Nós", url: "#" },
        { title: "Conta Demo", url: "#" },
        { title: "Regulamentos", url: "#" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Ebinex</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
