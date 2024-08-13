import React, { useEffect, useRef } from 'react';
import fondo from "../assets/wooden_sign_2.png";
import '../styles/components/Pregunta.css';

interface RetroalimentacionProps {
    isOpen: boolean;
    title?: string;
    content: string;
    isCorrect: boolean;
    onClose: () => void;
}

const Retroalimentacion: React.FC<RetroalimentacionProps> = ({ isOpen, content, isCorrect, onClose }) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                contentRef.current?.focus();
            }, 500);
        }
    }, [isOpen]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const focusableElements = [
            closeButtonRef.current
        ].filter(Boolean) as HTMLElement[];

        const activeElement = document.activeElement as HTMLElement;

        if (event.key === 'Tab') {
            event.preventDefault(); // Prevent default tab behavior
            const currentIndex = focusableElements.indexOf(activeElement);
            let nextIndex = currentIndex + (event.shiftKey ? -1 : 1);

            if (nextIndex < 0) nextIndex = focusableElements.length - 1;
            if (nextIndex >= focusableElements.length) nextIndex = 0;

            focusableElements[nextIndex]?.focus();
        }

        if (event.key === 'Enter' && activeElement === closeButtonRef.current) {
            event.preventDefault(); // Prevent the event from propagating
            onClose();
        }
    };

    return (
        <div className="question-modal-overlay" onKeyDown={handleKeyDown} aria-labelledby="feedbackTitle" role="dialog" aria-modal="true">
            <div className="question-modal-content" style={{ backgroundImage: `url(${fondo})` }} role="document">
                <div className="question-modal-text" tabIndex={-1} ref={contentRef} aria-live="assertive">
                    <h1 id="feedbackTitle" style={{
                        color: isCorrect ? 'green' : 'red',
                        margin: '30px 0'
                    }}>{isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </h1>
                    <div className="Pregunta" tabIndex={-1}
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        {content.split(/(\n|<br>)/).map((fragmento, index) =>
                            fragmento === '\n' || fragmento === '<br>' ? (
                                <br key={index} />
                            ) : (
                                <p key={index}>{fragmento}</p>
                            )
                        )}
                    </div>
                </div>
                <div className="question-modal-close-container">
                    <button className="question-modal-close" onClick={onClose} ref={closeButtonRef} role="button">Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default Retroalimentacion;






