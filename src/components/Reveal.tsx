import { motion } from "motion/react"
import type { ReactNode } from "react"
import { fadeUp, stagger } from "../lib/motion"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={stagger(0.1, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

type RevealItemProps = {
  children: ReactNode
  className?: string
}

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
