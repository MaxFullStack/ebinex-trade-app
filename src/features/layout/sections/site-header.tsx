"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { getSiteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import MainNav from "../components/main-nav"
import MobileNav from "../components/mobile-nav"

const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const siteConfig = getSiteConfig()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
      <div
        className={cn(
          isScrolled
            ? "shadow-xs fixed z-10 w-full bg-background"
            : "fixed z-10 w-full bg-muted",
          "transition-all duration-500 ease-in"
        )}
      >
        <header className="sticky top-0 z-40 w-full border-b">
          <div className="flex h-16 items-center space-x-16 px-4 sm:justify-between sm:space-x-0 md:px-12">
            <Link
              href={"/"}
              className="flex items-center space-x-2 md:mr-16"
            >
              <span className="inline-block whitespace-nowrap text-xl font-bold">
                Technical Test - Ebinex
              </span>
            </Link>

            <div className="hidden md:flex">
              <MainNav items={siteConfig.mainNav} />
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-4">
  
                <Button
                  className="flex md:hidden"
                  variant="outline"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">{"toggleMenu"}</span>
                  {mobileMenuOpen ? (
                    <Icons.x className="size-6" />
                  ) : (
                    <Icons.menu className="size-6" />
                  )}
                </Button>
              </nav>
            </div>
          </div>

          <MobileNav
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            items={siteConfig.mainNav}
          />
        </header>
      </div>
  )
}

export default SiteHeader
