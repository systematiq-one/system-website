import { useState, useEffect } from "react";
import LetterGlitch from "./components/ui/letter-glitch.jsx";
import LogoLoop from "./components/ui/LogoLoop.jsx";
import "./components/ui/LogoLoop.css";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

//const techLogos = [
//  { node: <SiReact />, title: "React", href: "https://react.dev" },
//  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
//  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
//  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
//];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/mail.png", alt: "Email", href: "mailto:the@systematiq.one" },
  { src: "/logos/instagram.png", alt: "Instagram", href: "http://instagram.com/systematiq.one" },
  { src: "/logos/facebook.png", alt: "Facebook", href: "https://www.facebook.com/SystematiqGaming/" },
  { src: "/logos/github.png", alt: "GitHub", href: "https://github.com/systematiq-one" },
  { src: "/logos/hostinger.png", alt: "Hostinger", href: "https://hostinger.com?REFERRALCODE=3F6ALEXBRP11" },
  { src: "/logos/binance.png", alt: "Binance", href: "https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00NZ30YFQA" },
  { src: "/logos/mastodon.png", alt: "Mastodon", href: "https://mastodon.social/@systematiq" },
  { src: "/logos/discord.png", alt: "Discord", href: "https://discordapp.com/users/systematiq.one/" },
  { src: "/logos/twitch.png", alt: "Twitch", href: "https://www.twitch.tv/systematiq1" },
  { src: "/logos/steam.png", alt: "Steam", href: "https://steamcommunity.com/id/systematiq1" },
  { src: "/logos/playstation.png", alt: "PlayStation", href: "https://profile.playstation.com/systematiq1" },
  { src: "/logos/goodreads.png", alt: "Goodreads", href: "https://goodreads.com/systematiq" },
  { src: "/logos/youtube.png", alt: "YouTube", href: "https://www.youtube.com/@systematiq-one" },
  { src: "/logos/bluesky.png", alt: "BlueSky", href: "https://bsky.app/profile/systematiq.one" },
  { src: "/logos/telegram.png", alt: "Telegram", href: "https://t.me/systematiq" },
];

function App() {
  const [logoSize, setLogoSize] = useState({ height: 40, gap: 40 });

  useEffect(() => {
    const updateLogoSize = () => {
      const height = Math.min(40, Math.max(20, window.innerHeight * 0.06));
      const gap = Math.min(40, Math.max(20, window.innerWidth * 0.04));
      setLogoSize({ height, gap });
    };

    updateLogoSize();
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
        glitchColors={['#7287fd', '#2b377d', '#9dabfc']}
        /* glitchColors={['#5a85c7', '#89b4fa', '#b3d1fc']} */
        /* glitchColors={['#0f766e', '#14b8a6', '#5eead4']} */
      />
      
      <div className="outer-container" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="content-container" style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(114, 135, 253, 0.1)',
          /* backgroundColor: 'rgba(255, 255, 255, 0.1)', */
          borderRadius: '24px',
          padding: 0,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Top padding: 10% */}
          <div style={{ height: '10%' }}></div>

          {/* Title: 10% */}
          <div style={{ height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="title-text" style={{
              fontWeight: '300',
              letterSpacing: '0.2em',
              color: 'white',
              textAlign: 'center',
              margin: 0
            }}>
              SYSTEMATIQ
            </h1>
          </div>

          {/* Space between title and text: 5% */}
          <div style={{ height: '5%' }}></div>

          {/* Text: 35% */}
          <div className="body-text" style={{
            height: '35%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            lineHeight: '1.3'
          }}>
            {[
              'writing python code', 'using arch linux btw', 'learning data science',
              'reading any good books', 'observing crypto markets',
              'playing steam & playstation', 'enthusiast about open-source',
            ].map((t, i) => <p key={i} style={{ margin: 0 }}>{t}</p>)}
          </div>

          {/* Space between text and logos: 5% */}
          <div style={{ height: '5%' }}></div>

          {/* Logos: 17% */}
          <div style={{
            height: '17%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}>
            <LogoLoop
              logos={imageLogos}
              speed={50}
              direction="right"
              logoHeight={logoSize.height}
              gap={logoSize.gap}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="rgba(255,255,255,0)"
              ariaLabel="Links"
            />
          </div>

          {/* Space between logos and copyright: 5% */}
          <div style={{ height: '5%' }}></div>

          {/* Copyright: 3% */}
          <div style={{ height: '3%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="copyright-text" style={{
              color: 'rgba(255, 255, 255, 0.4)',
              textAlign: 'center',
              margin: 0
            }}>
              all rights reserved © 2025
            </p>
          </div>

          {/* Bottom padding: 10% */}
          <div style={{ height: '10%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
