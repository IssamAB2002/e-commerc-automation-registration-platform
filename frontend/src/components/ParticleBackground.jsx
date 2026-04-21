import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let rafId = 0
    let particles = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      const dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r = Math.random() * 1.5 + 0.5
        this.alpha = Math.random() * 0.5 + 0.2
        this.hue = Math.random() > 0.7 ? '#ff6b2b' : '#00d4ff'
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset()
        }
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle =
          this.hue === '#00d4ff'
            ? `rgba(0,212,255,${this.alpha})`
            : `rgba(255,107,43,${this.alpha * 0.6})`
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < 90; i += 1) particles.push(new Particle())
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      drawLines()
      for (const p of particles) {
        p.update()
        p.draw()
      }
      rafId = window.requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener('resize', resize, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas id="bg-canvas" ref={canvasRef} />
}

