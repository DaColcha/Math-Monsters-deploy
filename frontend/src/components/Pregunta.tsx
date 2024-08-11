import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/Pregunta.css';
import fondo from "../assets/wooden_sign_2.png";

interface QuestionType {
  pregunta: string;
  opciones: string[];
  respuesta: string;
  pasos?: string;
}

interface QuestionModalProps {
  isOpen: boolean;
  question?: QuestionType;
  onClose: () => void;
  onFeedbackOpen: (content: string, isCorrect: boolean) => void;
}

const Pregunta: React.FC<QuestionModalProps> = ({ isOpen, question, onClose, onFeedbackOpen }) => {
  const questionRef = useRef<HTMLDivElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const optionIdentifiers = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        questionRef.current?.focus();
      }, 1000);
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const focusableElements = [
      questionRef.current,
      ...Array.from(document.querySelectorAll('.question-modal-option')),
      closeButtonRef.current,
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

    if (event.key === 'Enter' && activeElement) {
      if (activeElement.classList.contains('question-modal-option')) {
        event.preventDefault(); // Prevent the event from propagating
        handleSubmit((activeElement as HTMLButtonElement).textContent || '');
      } else if (activeElement === closeButtonRef.current) {
        event.preventDefault(); // Prevent the event from propagating
        onClose();
      }
    }
  };

  const handleSubmit = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === question?.respuesta;
    const feedbackMessage = isCorrect 
      ? `${question.pasos || ''}`
      : `La respuesta correcta es: ${question?.respuesta} ${question?.pasos || ''}`;
    onFeedbackOpen(feedbackMessage, isCorrect);
    onClose(); // Close the question modal
  };

  if (!isOpen || !question) return null;

  return (
    <div className="question-modal-overlay" onKeyDown={handleKeyDown} aria-labelledby="modalTitle" role="dialog" aria-modal="true">
      <div className="question-modal-content" style={{ backgroundImage: `url(${fondo})` }}>
        <div className="question-modal-text" ref={questionRef} tabIndex={-1} aria-live="assertive">
          <h1>Pregunta</h1>
          <div className='Pregunta'>
            <p>{question?.pregunta}</p>
          </div>
        </div>
        <div className="question-modal-options-container">
          {question?.opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => handleSubmit(opcion)}
              className={`question-modal-option ${selectedAnswer === opcion ? (opcion === question?.respuesta ? 'correct' : 'incorrect') : ''}`}
              ref={index === 0 ? firstOptionRef : null}
              aria-live="polite"
              disabled={selectedAnswer !== null} // Disable options after one is selected
            >
              {`${optionIdentifiers[index]}. ${opcion}`}
            </button>
          ))}
        </div>
        <div className="question-modal-close-container">
          <button className="question-modal-close" ref={closeButtonRef} onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default Pregunta;



