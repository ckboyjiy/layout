import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSection2, setShowSection2] = useState(false)
  const [isPrintPreview, setIsPrintPreview] = useState(false)
  const [announceMessage, setAnnounceMessage] = useState('')

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

      // 중앙에 "지도" 텍스트 그리기
      ctx.fillStyle = '#ffffff'
      ctx.font = '48px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('지도', canvas.width / 2, canvas.height / 2)
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

    let resizeTimer: ReturnType<typeof setTimeout>;

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

  // Section 2 열기/닫기에 따른 포커스 및 알림 처리
  useEffect(() => {
    if (showSection2) {
      // Section 2 열릴 때
      if (section2Ref.current) {
        section2Ref.current.focus()
        section2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
      setAnnounceMessage('관련 기사가 열렸습니다.')
    } else {
      // Section 2 닫힐 때
      if (openButtonRef.current) {
        openButtonRef.current.focus()
        openButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
      setAnnounceMessage('관련 기사가 닫혔습니다.')
    }

    // 알림 메시지 초기화
    const timer = setTimeout(() => setAnnounceMessage(''), 1000)
    return () => clearTimeout(timer)
  }, [showSection2])

  return (
    <div className={`app ${isPrintPreview ? 'print-preview' : ''}`}>
      <canvas ref={canvasRef} className="canvas" />

      <button
        className="print-preview-button"
        onClick={() => setIsPrintPreview(!isPrintPreview)}
        title="인쇄 미리보기"
      >
        {isPrintPreview ? '✕ 닫기' : '🖨️ 인쇄 미리보기'}
      </button>

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

      <main className="content" role="main">
        <section
          className={`content-box ${showSection2 ? 'hidden' : ''}`}
          aria-label="주요 기사"
        >
          <h2>뉴스 기사: 최신 기술 동향</h2>
          <img src="https://picsum.photos/800/400?random=1" alt="인공지능 기술 발전을 나타내는 이미지" className="article-image" />
          <p>인공지능 기술이 빠르게 발전하면서 우리의 일상생활에 많은 변화가 일어나고 있습니다. 특히 자연어 처리 기술의 발전으로 인간과 컴퓨터 간의 소통이 더욱 자연스러워지고 있습니다.</p>
          <p>전문가들은 향후 5년 내에 AI 기술이 더욱 대중화될 것으로 전망하고 있습니다. 이러한 변화는 교육, 의료, 제조업 등 다양한 산업 분야에 혁신을 가져올 것으로 예상됩니다.</p>
          <img src="https://picsum.photos/800/400?random=2" alt="다양한 산업에 적용되는 기술" className="article-image" />
          <p>한편, 기술 발전에 따른 윤리적 문제와 일자리 변화에 대한 우려도 함께 제기되고 있습니다. 정부와 기업들은 이러한 변화에 대응하기 위한 정책과 교육 프로그램을 준비하고 있습니다.</p>
          <p>특히 개인정보 보호와 AI의 편향성 문제는 시급히 해결해야 할 과제로 지적되고 있습니다. 전 세계적으로 AI 윤리 가이드라인 수립을 위한 논의가 활발히 진행되고 있습니다.</p>
          <p>교육 분야에서는 AI를 활용한 맞춤형 학습 시스템이 도입되면서 학생들의 학습 효율이 크게 향상되고 있습니다. 각 학생의 수준과 학습 속도에 맞춘 개별화된 교육이 가능해졌습니다.</p>
          <button
            ref={openButtonRef}
            className="open-button"
            onClick={() => setShowSection2(true)}
            aria-expanded={showSection2}
            aria-controls="section-2"
            aria-label="관련 기사 열기"
          >
            Open Section 2
          </button>
        </section>
          {/* 스크린 리더 알림 */}
          <div
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {announceMessage}
          </div>

          {showSection2 && (
              <section
                id="section-2"
                ref={section2Ref}
                className="content-box"
                tabIndex={-1}
                aria-label="관련 기사"
              >
                <h2>관련 기사: AI와 미래 사회</h2>
                <img src="https://picsum.photos/800/400?random=3" alt="미래 사회의 AI와 인간 공존을 나타내는 이미지" className="article-image" />
                <p>미래 사회는 AI와 인간이 공존하는 시대가 될 것입니다. 이를 위해서는 기술적 발전뿐만 아니라 사회적, 윤리적 준비도 필요합니다.</p>
                <p>전문가들은 AI 리터러시 교육의 중요성을 강조하고 있습니다. 누구나 AI 기술을 이해하고 활용할 수 있는 능력을 갖추어야 합니다.</p>
                <img src="https://picsum.photos/800/400?random=4" alt="미래 사회의 모습" className="article-image" />
                <p>또한 AI 시대에 필요한 새로운 직업과 역량에 대한 연구도 활발히 진행되고 있습니다. 창의성, 비판적 사고, 협업 능력 등이 더욱 중요해질 것으로 예상됩니다.</p>
                <p>정부는 AI 기술 발전에 따른 사회적 영향을 최소화하기 위해 다양한 정책을 마련하고 있습니다. 특히 일자리 전환 지원과 재교육 프로그램에 큰 예산을 투입하고 있습니다.</p>
                <button
                  className="close-button"
                  onClick={() => setShowSection2(false)}
                  aria-label="관련 기사 닫기"
                >
                  Close Section 2
                </button>
              </section>
          )}

      </main>
    </div>
  )
}

export default App
