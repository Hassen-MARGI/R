import { useState, useRef } from 'react';
import StarRating from './StarRating';
import GarbageTruckButton from './GarbageTruckButton';

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const buttonRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate first - don't animate if no rating
        if (rating === 0) {
            setError('Tap a star. Big task for your tiny brain 👶, I know.');
            return;
        }

        setError(null);
        setIsSubmitting(true);

        // Start animation only after validation passes
        if (buttonRef.current) {
            buttonRef.current.startAnimation();
        }

        const formData = new FormData();
        formData.append('entry.153265784', rating);
        formData.append('entry.153265784_sentinel', '1');
        formData.append('entry.1711202497', comment);

        try {
            await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdTreH7fy40LrEiV4cXjl9NnRNlUdmkc73qWo908143ZZEj9A/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });

            // Wait for animation to mostly complete, then refresh
            setTimeout(() => {
                window.location.reload();
            }, 6000);

        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
            // Stop animation on error
            if (buttonRef.current) {
                buttonRef.current.stopAnimation();
            }
            setIsSubmitting(false);
        }
    };

    // Dynamic message based on rating
    const getRatingMessage = () => {
        const currentRating = hoverRating || rating;
        switch (currentRating) {
            case 0:
                return "\u00A0\u00A0\u00A0";
            case 1:
                return "You're jealous";
            case 2:
                return "Could be better";
            case 3:
                return "Mid rating from a mid driver";
            case 4:
                return "Almost impressed?";
            case 5:
                return "You're blind. Seek help, or learn to drive";
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel animate-fade-in flex-col gap-md" style={{ padding: '2rem', width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Rate My Driving</h2>
                <p style={{ fontSize: '0.9rem' }}>If you hate it, maybe try staying in your lane.</p>
            </div>

            <StarRating
                rating={rating}
                hoverRating={hoverRating}
                setRating={setRating}
                setHoverRating={setHoverRating}
            />

            {getRatingMessage() && (
                <div
                    key={hoverRating || rating}
                    style={{
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        marginTop: '-0.5rem',
                        animation: 'fadeIn 0.3s ease-out'
                    }}
                >
                    {getRatingMessage()}
                </div>
            )}

            <div className="flex-col gap-xs">
                <label htmlFor="comment" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Comment (Optional)
                </label>
                <textarea
                    id="comment"
                    rows="4"
                    placeholder="Spill your tears here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            {error && (
                <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                    {error}
                </div>
            )}

            <GarbageTruckButton
                ref={buttonRef}
                onClick={handleSubmit}
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
                canAnimate={rating > 0}
            />
        </form>
    );
};

export default FeedbackForm;
