"use client"

import {
  Fragment,
  useRef,
  useSyncExternalStore,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  textClassName?: string
}

// Adapted from Magic UI: the scroll track is 115vh on phones and 140vh above instead of 200vh, the colors use the site
// tokens, the server, no-JS and reduced-motion renders show the sentence at full opacity, and words
// are separated by real spaces (the original used margins, so the text read as one long word).
const subscribeNoop = () => () => {}

export const TextReveal: FC<TextRevealProps> = ({ children, className, textClassName }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end end"],
  })
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const reduce = useReducedMotion()
  const live = hydrated && !reduce

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0", live && "h-[115vh] md:h-[140vh]", className)}>
      <div className={cn(live && "sticky top-[22vh]")}>
        <p className={cn("m-0", textClassName)}>
          {live
            ? words.map((word, i) => {
                const start = i / words.length
                const end = start + 1 / words.length
                return (
                  <Fragment key={i}>
                    <Word progress={scrollYProgress} range={[start, end]}>
                      {word}
                    </Word>{" "}
                  </Fragment>
                )
              })
            : children}
        </p>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className="absolute opacity-20">
        {children}
      </span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}
