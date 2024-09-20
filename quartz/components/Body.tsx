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
          {[...Array(40)].map((_, i) => { // Increase number of ferns
            const fernNumber = Math.floor(Math.random() * 4);
            const green = Math.floor(128 + Math.random() * 128); // Randomize green value
            return (
              <div key={i} style={{
                position: 'absolute',
                width: `${Math.random() * 13 + 5}%`, // Randomize size
                left: `${Math.random() * 100}%`,
                animation: `sway ${1 + Math.random() * 5}s infinite ease-in-out`,
                animationDelay: `${-Math.random() * 5}s`,
                top: `${60 + Math.random() * 30}%`,
                transform: `rotate(${Math.random() * 360}deg)`, // Random rotation
                opacity: 0.1 + Math.random() * 0.9, // Randomize opacity
              }}>
                <img 
                  src={`/static/fern_${fernNumber}.svg`} 
                  alt="Fern" 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    filter: `invert(1) saturate(100%) hue-rotate(${green}deg) brightness(0.15)`,
                  }} 
                />
              </div>
            );
          })}
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
