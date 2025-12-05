import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const GarbageTruckButton = forwardRef(({ onClick, isSubmitting, disabled, canAnimate = true }, ref) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const buttonRef = useRef(null);
    const [animationVars, setAnimationVars] = useState({});

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
        startAnimation: () => {
            if (!isAnimating && canAnimate) {
                setIsAnimating(true);
            }
        },
        stopAnimation: () => {
            setIsAnimating(false);
        }
    }));

    // Calculate animation distances based on button width
    useEffect(() => {
        const updateAnimationVars = () => {
            if (buttonRef.current) {
                const width = buttonRef.current.offsetWidth;
                // Calculate distances relative to button width
                // Truck stop position: about 70% from right edge
                const truckStop = Math.round(width * 0.7);
                // Truck pickup position: about 45% from right edge  
                const truckPickup = Math.round(width * 0.45);
                // Truck exit: goes past left edge
                const truckExit = Math.round(width * 0.95);

                setAnimationVars({
                    '--truck-stop': `-${truckStop}px`,
                    '--truck-pickup': `-${truckPickup}px`,
                    '--truck-exit': `-${truckExit}px`,
                    // Trash bag positions relative to button width
                    '--trash-start': `${Math.round(width * 0.15)}px`,
                    '--trash-lift': `${Math.round(width * 0.25)}px`,
                    '--trash-arc': `${Math.round(width * 0.35)}px`,
                    '--trash-fall': `${Math.round(width * 0.42)}px`,
                    '--trash-inside': `${Math.round(width * 0.45)}px`,
                });
            }
        };

        updateAnimationVars();
        window.addEventListener('resize', updateAnimationVars);
        return () => window.removeEventListener('resize', updateAnimationVars);
    }, []);

    const handleClick = (e) => {
        if (disabled || isAnimating) return;

        // Don't start animation here - let parent control it after validation
        if (onClick) onClick(e);
    };

    // Reset animation when submission completes
    useEffect(() => {
        if (!isSubmitting && isAnimating) {
            // Keep animating for a bit after submission
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitting, isAnimating]);

    return (
        <button
            ref={buttonRef}
            type="submit"
            className={`garbage-truck-btn ${isAnimating ? 'animate' : ''}`}
            style={animationVars}
            onClick={handleClick}
            disabled={disabled || isAnimating}
        >
            <span className="default">
                {isSubmitting ? 'Sending...' : 'Submit Feedback'}
            </span>
            <span className="success">
                Trash collected
                <svg viewBox="0 0 12 10"> <polyline points="1.5 6 4.5 9 10.5 1"></polyline> </svg>
            </span>

            {/* Trash bag (represents the feedback) */}
            <div className="trash">
                <div className="bag"></div>
                <div className="item1"></div>
                <div className="item2"></div>
            </div>

            {/* Garbage truck */}
            <div className="truck">
                <div className="opening"></div>
                <div className="back"></div>
                <div className="front">
                    <div className="window"></div>
                </div>
                <div className="light top"></div>
                <div className="light bottom"></div>
                <div className="warning-light"></div>
            </div>

            <div className="lines"></div>
        </button>
    );
});

GarbageTruckButton.displayName = 'GarbageTruckButton';

export default GarbageTruckButton;
