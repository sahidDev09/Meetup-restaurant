"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const toggleTheme = (event: React.MouseEvent) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    
    // Create a reveal circle effect using GSAP
    const x = event.clientX
    const y = event.clientY
    
    const circle = document.createElement("div")
    circle.style.position = "fixed"
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.width = "10px"
    circle.style.height = "10px"
    circle.style.marginTop = "-5px"
    circle.style.marginLeft = "-5px"
    circle.style.borderRadius = "50%"
    circle.style.backgroundColor = nextTheme === "dark" ? "#000000" : "#ffffff"
    circle.style.zIndex = "9999"
    circle.style.pointerEvents = "none"
    circle.style.opacity = "0"
    
    document.body.appendChild(circle)

    // GSAP Animation Sequence
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.removeChild(circle)
      }
    })

    tl.to(circle, {
      opacity: 1,
      duration: 0.1
    })
    .to(circle, {
      scale: 800, // Even larger for ultra-wide screens
      duration: 1,
      ease: "power4.inOut",
      onStart: () => {
        // Change theme exactly at the 'peak' of the sweep
        setTimeout(() => setTheme(nextTheme), 500)
      }
    })
    .to(circle, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    })
  }

  if (!isClient) return <div className="w-10 h-10" />

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-all duration-300 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 fill-indigo-600/20" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}

