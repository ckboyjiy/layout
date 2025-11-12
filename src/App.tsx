import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSection2, setShowSection2] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // 리사이즈 후 다시 그리기
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let resizeTimer: NodeJS.Timeout

    const handleResize = () => {
      // 리사이즈 시작 시 transition 비활성화
      header.classList.add('no-transition')

      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        // 리사이즈 완료 후 transition 재활성화
        header.classList.remove('no-transition')
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let resizeTimer: NodeJS.Timeout

    const handleResize = () => {
      // 리사이즈 시작 시 transition 비활성화
      header.classList.add('no-transition')

      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        // 리사이즈 완료 후 transition 재활성화
        header.classList.remove('no-transition')
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <div className="app">
      <canvas ref={canvasRef} className="canvas" />

      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="메뉴"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <header ref={headerRef} className={`header ${isMenuOpen ? 'open' : ''}`}>
        <h1>Header</h1>
        <nav>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Menu 1</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Menu 2</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Menu 3</a>
        </nav>
      </header>

      <main className="content">
        <section className={`content-box ${showSection2 ? 'hidden' : ''}`}>
          <h2>Content Area 1</h2>
          <p>첫 번째 컨텐츠 영역입니다.</p>
          <button className="open-button" onClick={() => setShowSection2(true)}>
            Open Section 2
          </button>
        </section>
          {showSection2 && <section className={`content-box`}>
              <h2>Content Area 2</h2>
              <p>두 번째 컨텐츠 영역입니다.</p>
              <button className="close-button" onClick={() => setShowSection2(false)}>
                  Close Section 2
              </button>
          </section>}

      </main>
    </div>
  )
}

export default App
