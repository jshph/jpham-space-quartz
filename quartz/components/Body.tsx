// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return (
    <div id="quartz-body">
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '120%',
          height: '120%',
          animation: 'sway 3s infinite ease-in-out'
        }}>
          {[...Array(50)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '30%',
              height: '10%',
              left: `${Math.random() * 70}%`,
              top: `${50+ Math.random() * 30}%`,
              animation: `sway ${1 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${-Math.random() * 5}s`
            }}>
              <svg style={{
                width: '100%',
                height: '100%',
                opacity: 0.2,
                fill: `rgb(0, ${Math.random() * 50}, 0)`
              }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d={`M${10 + Math.random() * 20} ${80 + Math.random() * 10} L${20 + Math.random() * 20} ${60 + Math.random() * 10} L${30 + Math.random() * 20} ${80 + Math.random() * 10} L${40 + Math.random() * 20} ${60 + Math.random() * 10} L${50 + Math.random() * 20} ${80 + Math.random() * 10} Z`} />
                <path d={`M${50 + Math.random() * 20} ${80 + Math.random() * 10} L${60 + Math.random() * 20} ${50 + Math.random() * 10} L${70 + Math.random() * 20} ${80 + Math.random() * 10} L${80 + Math.random() * 20} ${50 + Math.random() * 10} L${90 + Math.random() * 20} ${80 + Math.random() * 10} Z`} />
              </svg>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle + `
  @keyframes sway {
    0%, 100% { transform: rotate(0deg) translateX(0); }
    25% { transform: rotate(1deg) translateX(5px); }
    50% { transform: rotate(2deg) translateX(0); }
    75% { transform: rotate(1deg) translateX(-5px); }
  }
`

export default (() => Body) satisfies QuartzComponentConstructor
