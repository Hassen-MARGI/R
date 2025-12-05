import { useState, useEffect } from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="glass-panel"
            aria-label="Toggle Dark Mode"
            style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                borderRadius: '50%',
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                border: '1px solid var(--glass-border)',
                zIndex: 100 // Ensure it's on top
            }}
        >
            <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                {/* Sun Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: theme === 'light' ? 0 : 1,
                        transform: theme === 'light' ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                        color: '#fbbf24' // warm yellow
                    }}
                >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>

                {/* Moon Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: theme === 'dark' ? 0 : 1,
                        transform: theme === 'dark' ? 'rotate(-90deg) scale(0)' : 'rotate(0deg) scale(1)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                        color: '#3b82f6' // cool blue
                    }}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </div>
        </button>
    );
};

export default ThemeToggle;
