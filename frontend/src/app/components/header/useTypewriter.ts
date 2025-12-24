import { useState, useEffect } from "react";

export function useTypewriter(phrases: string[]) {
    const [placeholder, setPlaceholder] = useState("");
    const [typingIndex, setTypingIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && typingIndex === currentPhrase.length) {
            // Finished typing, wait then delete
            const timeout = setTimeout(() => setIsDeleting(true), 1500);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && typingIndex === 0) {
            // Finished deleting, move to next phrase
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
            return;
        }

        const timer = setTimeout(() => {
            setPlaceholder(
                currentPhrase.substring(0, typingIndex + (isDeleting ? -1 : 1))
            );
            setTypingIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [typingIndex, isDeleting, phraseIndex, phrases]);

    return placeholder;
}
