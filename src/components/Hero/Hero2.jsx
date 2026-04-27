import { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(-1)
  const animationProgressRef = useRef(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadFrames = async () => {
      const frames = []
      // Load all 90 frames (1-90)
      for (let i = 1; i < 91; i++) {
        const frameNum = String(i)
        frames.push(`/frames2/${frameNum}.webp`)
      }

      // Preload all images with progress tracking
      let loaded = 0
      const images = await Promise.all(
        frames.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image()
              img.onload = () => {
                loaded++
                setLoadProgress(Math.round((loaded / frames.length) * 100))
                resolve(img)
              }
              img.onerror = () => {
                loaded++
                setLoadProgress(Math.round((loaded / frames.length) * 100))
                resolve(null)
              }
              img.src = src
            })
        )
      )

      imagesRef.current = images.filter((img) => img !== null)

      if (imagesRef.current.length === 0) return

      // Setup canvas
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d', { alpha: false })

      // Set canvas dimensions to first image dimensions
      const firstImg = imagesRef.current[0]
      canvas.width = firstImg.width
      canvas.height = firstImg.height
      

      // Draw initial frame
      ctx.drawImage(firstImg, 0, 0)
      currentFrameRef.current = 0

      setIsLoaded(true)

      // Handle wheel scroll on the hero container
      const handleWheel = (e) => {
        const scrollingDown = e.deltaY > 0
        const scrollingUp = e.deltaY < 0
        const isAtStart = animationProgressRef.current <= 0
        const isAtEnd = animationProgressRef.current >= 1

        // Only lock wheel scrolling while the frame animation can still advance.
        // At the first/last frame, allow native page scroll to continue.
        const canAnimate =
          (scrollingDown && !isAtEnd) || (scrollingUp && !isAtStart)

        if (!canAnimate) {
          return
        }

        e.preventDefault()

        const scrollSensitivity = 0.00009
        animationProgressRef.current += e.deltaY * scrollSensitivity

        // Clamp progress between 0 and 1
        animationProgressRef.current = Math.max(
          0,
          Math.min(1, animationProgressRef.current)
        )

        // Map progress to frame index
        const frameIndex = Math.floor(
          animationProgressRef.current * (imagesRef.current.length - 1)
        )

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex
          if (frameIndex >= 0 && frameIndex < imagesRef.current.length) {
            ctx.drawImage(imagesRef.current[frameIndex], 0, 0)
              
            // Calculate progress through animation
            const progress = frameIndex / (imagesRef.current.length - 1)
            
            // Show different titles based on progress
            let titleText = ''
            let subtitleText = ''
            let showTitle = false
            
            if (progress < 0.35) {
              // First 35% - show COMPUTER SCIENCE
              titleText = 'COMPUTER'
              subtitleText = 'SCIENCE'
              showTitle = true
            } else if (progress >= 0.35 && progress < 0.65) {
              // 35-65% - show CSE-DS
              titleText = 'CSE'
              subtitleText = 'DS'
              showTitle = true
            } else if (progress >= 0.65) {
              // 65-100% - show BEST INSTITUTE
              titleText = 'BEST'
              subtitleText = 'INSTITUTE'
              showTitle = true
            }
            
            if (showTitle) {
              // Draw main title text in red italic
              ctx.fillStyle = '#FF6B6B'
              ctx.font = 'italic bold 85px Georgia, serif'
              ctx.textAlign = 'center'
              ctx.fillText(titleText, canvas.width / 2, canvas.height / 2 - 25)
              
              // Draw subtitle in white
              ctx.fillStyle = '#FFFFFF'
              ctx.font = 'bold 70px Georgia, serif'
              ctx.fillText(subtitleText, canvas.width / 2, canvas.height / 2 + 70)
            }
          }
        }
      }

      if (containerRef.current) {
        containerRef.current.addEventListener('wheel', handleWheel, {
          passive: false,
        })
      }

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('wheel', handleWheel)
        }
      }
    }

    loadFrames()
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-screen h-screen bg-white relative overflow-hidden flex items-center justify-center"
    >
      {!isLoaded && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-black/10 border-t-black rounded-full animate-spin mx-auto mb-8"></div>
            <p className="text-black/80 text-lg font-medium">Loading frames... {loadProgress}%</p>
          </div>
        </div>
      )}
      
      <div 
        style={{
          width: '95%',
          height: '95%',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        }}
      >
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'block',
            objectFit: 'cover'
          }}
        />
      </div>
    </div>
  )
}

export default Hero
