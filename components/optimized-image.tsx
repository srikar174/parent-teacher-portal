"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, width, height, className, priority = false }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Use intersection observer for lazy loading
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        },
        { rootMargin: "200px" }, // Start loading when image is 200px from viewport
      )

      const currentElement = document.getElementById(`image-${src.replace(/\W/g, "")}`)
      if (currentElement) {
        observer.observe(currentElement)
      }

      return () => {
        if (currentElement) {
          observer.unobserve(currentElement)
        }
      }
    } else {
      setIsInView(true)
    }
  }, [src, priority])

  return (
    <div
      id={`image-${src.replace(/\W/g, "")}`}
      className={cn("overflow-hidden relative", className)}
      style={{ width, height }}
    >
      {(isInView || priority) && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`}
        />
      )}
      {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />}
    </div>
  )
}

