import { useCallback, useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

export function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()
  const mouse = useRef({ x: -1000, y: -1000 })
  const raf = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const gap = 32
    const cols = Math.floor(w / gap) + 1
    const rows = Math.floor(h / gap) + 1
    const radius = 1.2
    const influenceRadius = 120
    const maxDisplace = 14

    const style = getComputedStyle(canvas)
    const accentColor = style.getPropertyValue("--accent").trim() || "#0e9f6e"

    ctx.clearRect(0, 0, w, h)

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let px = c * gap
        let py = r * gap

        const dx = mouse.current.x - px
        const dy = mouse.current.y - py
        const dist = Math.sqrt(dx * dx + dy * dy)

        let dotRadius = radius
        let alpha = 0.15

        if (dist < influenceRadius && !reduce) {
          const factor = 1 - dist / influenceRadius
          const eased = factor * factor
          px -= dx * eased * (maxDisplace / influenceRadius)
          py -= dy * eased * (maxDisplace / influenceRadius)
          dotRadius = radius + eased * 1.8
          alpha = 0.15 + eased * 0.55
        }

        ctx.beginPath()
        ctx.arc(px, py, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = accentColor
        ctx.globalAlpha = alpha
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }, [reduce])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onLeave = () => {
      mouse.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)

    let running = true
    const loop = () => {
      if (!running) return
      draw()
      raf.current = requestAnimationFrame(loop)
    }

    if (reduce) {
      draw()
    } else {
      loop()
    }

    const ro = new ResizeObserver(() => draw())
    ro.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(raf.current)
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      ro.disconnect()
    }
  }, [draw, reduce])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 size-full"
      aria-hidden
    />
  )
}
