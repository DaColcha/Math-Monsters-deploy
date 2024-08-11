import React, { useEffect, useRef } from 'react';
import fondo from "../assets/wooden_sign_2.png";
import '../styles/components/Pregunta.css';

interface FinalizarProps {
    Monedas: number;
    onClose: () => void;
}

const Finalizar: React.FC<FinalizarProps> = ({ Monedas, onClose }) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            contentRef.current?.focus();
        }, 500);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && document.activeElement === closeButtonRef.current) {
            event.preventDefault(); // Prevent the event from propagating
            onClose();
            setTimeout(() => {
                window.location.reload();
            }, 300); // Or reset the game state instead of reloading
        }
    };

    return (
        <div className="question-modal-overlay" onKeyDown={handleKeyDown} aria-labelledby="finalizarTitle" role="dialog" aria-modal="true">
            <div className="question-modal-content" style={{ backgroundImage: `url(${fondo})` }}>
                <div className="question-modal-text" tabIndex={-1} ref={contentRef}>
                    <h1 id="finalizarTitle">Juego Terminado</h1>
                    <div className="Pregunta" tabIndex={-1}>
                        <p>Monedas recolectadas: {Monedas}</p>
                    </div>
                </div>
                <div className="question-modal-close-container">
                    <button ref={closeButtonRef} className="question-modal-close" onClick={onClose}>Regresar</button>
                </div>
            </div>
        </div>
    );
}

export default Finalizar;

