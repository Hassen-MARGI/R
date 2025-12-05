import { useState, useEffect } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import SocialLinks from './components/SocialLinks'
import ThemeToggle from './components/ThemeToggle'
import LightRays from './components/LightRays'

function App() {
  // Theme State - initialize from DOM (already set by inline script)
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  // Mark as hydrated and sync theme
  useEffect(() => {
    // Small delay ensures all CSS is loaded and painted before reveal
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Update DOM when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    // Check for View Transition API support
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath : clipPath.reverse(),
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: isDark ? "::view-transition-new(root)" : "::view-transition-old(root)",
        }
      );
    });
  };

  return (
    <>
      {theme === 'dark' && (
        <div className="rays-wrapper">
          <LightRays
            raysOrigin="top-center"
            raysColor="#3b82f6"
            raysSpeed={0.5}
          />
        </div>
      )}

      {/* Fixed UI Elements */}
      <div className="fixed-theme-toggle animate-fade-in delay-200">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <div className="fixed-socials animate-fade-in delay-200">
        <SocialLinks />
      </div>

      {/* Main Flow */}
      <div className="app-container">
        <div className="app-content flex-col flex-center">

          <header className="animate-fade-in" style={{ marginBottom: '1.5rem', textAlign: 'center', width: '100%', position: 'relative', zIndex: 10 }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '0.5rem',
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
            }}>
              🚗
            </div>
            <h1>How Was My Driving?</h1>
          </header>

          <main style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }} className="animate-fade-in delay-100">
            <FeedbackForm />
          </main>



        </div>
      </div>
    </>
  )
}

export default App
