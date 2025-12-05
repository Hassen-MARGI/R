const StarRating = ({ rating, hoverRating, setRating, setHoverRating }) => {
    const isActive = (star) => (hoverRating || rating) >= star;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1rem 0',
            gap: '0.25rem',
        }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onTouchStart={() => setHoverRating(star)}
                    onTouchEnd={() => setHoverRating(0)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: isActive(star) ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        style={{
                            fill: isActive(star) ? '#fbbf24' : 'transparent',
                            stroke: isActive(star) ? '#fbbf24' : 'var(--text-muted)',
                            strokeWidth: 2,
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            transition: 'fill 0.15s ease, stroke 0.15s ease',
                        }}
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {/* Separate glow layer to avoid filter clipping issues */}
                    {isActive(star) && (
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            style={{
                                position: 'absolute',
                                fill: '#fbbf24',
                                opacity: 0.4,
                                filter: 'blur(8px)',
                                pointerEvents: 'none',
                            }}
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    )}
                </button>
            ))}
        </div>
    );
};

export default StarRating;
