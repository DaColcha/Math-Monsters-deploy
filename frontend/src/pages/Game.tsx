import { useEffect, useState, useRef } from "react";
import Chest from "../components/Chest";
import Pregunta from "../components/Pregunta";
import Retroalimentacion from "../components/Retroalimentacion";
import Finalizar from "../components/Finalizar";  
import { ChestType, QuestionType } from "../types";
import { useGlobalContext } from "../GlobalContext";
import MonsterImg from "../assets/monster.svg";
import '../styles/pages/Game.css';
import Coins from "../assets/coin.svg";
import preguntas from "../data/Preguntas";

function Game() {
    const [totalMonedas, setTotalMonedas] = useState<number>(0);
    const [cofres, setCofres] = useState<ChestType[]>([]);
    const [cofreSeleccionado, setCofreSeleccionado] = useState<ChestType | null>(null);
    const [resultado, setResultado] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);
    const [showGameOver, setShowGameOver] = useState<boolean>(false);
    const [feedbackContent, setFeedbackContent] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
    const { setPage, personajeImage, character, setRetorno } = useGlobalContext();

    const chestSelectionRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const resetGame = () => {
            const monedas = [10, 10, 10, 20, 20, 50, 50, 100, 100];
            const tipos = [true, false, false, true, false, true, false, true, false];
            const arrayAuxiliarCofres: ChestType[] = [];

            for (let i = 0; i < 9; i++) {
                const indiceAleatorio = Math.floor(Math.random() * monedas.length);
                const esMonstruo = tipos[indiceAleatorio];
                arrayAuxiliarCofres.push({
                    chestNumber: i + 1,
                    isMonster: esMonstruo,
                    coins: esMonstruo ? 0 : monedas[indiceAleatorio],
                    isOpen: false
                });
            }
            setCofres(arrayAuxiliarCofres);
            setTotalMonedas(0);
            setCofreSeleccionado(null);
            setResultado('');
            setShowGameOver(false);
        };

        resetGame();
    }, []);

    const handleChestSelection = (selectedChest: ChestType) => {
        if (selectedChest.isOpen || showPopup || showFeedback || showGameOver) return;

        const newCofres = cofres.map(cofre => 
            cofre.chestNumber === selectedChest.chestNumber ? {...cofre, isOpen: true} : cofre
        );
        setCofres(newCofres);
        setCofreSeleccionado(selectedChest);

        setTotalMonedas(prevMonedas => prevMonedas + selectedChest.coins);

        const resultadoMsg = selectedChest.isMonster
            ? `El cofre ${selectedChest.chestNumber} contenía un monstruo.`
            : `El cofre ${selectedChest.chestNumber} contenía ${selectedChest.coins} monedas.`;
        setResultado(resultadoMsg);

        if (selectedChest.isMonster) {
            const randomQuestion = preguntas[Math.floor(Math.random() * preguntas.length)];
            setCurrentQuestion(randomQuestion);
            setShowPopup(true);
        } else {
            checkAllChestsOpened(newCofres); // Verificar si todos los cofres están abiertos
        }
    };

    const checkAllChestsOpened = (updatedCofres: ChestType[]) => {
        const allOpened = updatedCofres.every(cofre => cofre.isOpen);
        if (allOpened) {
            setTimeout(() => {
                setShowGameOver(true);
            }, 500); // Añadir un pequeño retraso para una transición más suave
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [cofres, showPopup, showFeedback, showGameOver]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key >= '1' && event.key <= '9' && !showPopup && !showFeedback && !showGameOver) {
            const index = parseInt(event.key) - 1;
            handleChestSelection(cofres[index]);
        }
    };

    const handleAnswerSubmit = (content: string, isCorrect: boolean) => {
        setShowPopup(false);
        setFeedbackContent(content);
        setIsCorrect(isCorrect);
        if (!isCorrect) {
            setTotalMonedas(0);
            setResultado('Has perdido todas las monedas.');
        }
        setShowFeedback(true);
    };

    const handleFeedbackClose = () => {
        setShowFeedback(false);
        if (!showGameOver) {
            chestSelectionRef.current?.focus(); // Regresar el foco al encabezado si no se han abierto todos los cofres
        }

        checkAllChestsOpened(cofres); // Verificar si todos los cofres están abiertos
    };

    setRetorno(true);

    return (
        <div className="game-container">
            <button tabIndex={0} className="go-back" onClick={() => setPage('HOME')} disabled={showPopup || showFeedback || showGameOver}>⬅ Volver a inicio</button>
            <div className={`chest-selection ${showPopup || showFeedback || showGameOver ? 'disabled' : ''}`}>
                <h1 ref={chestSelectionRef} tabIndex={0}>Elige un cofre</h1>
                <div className="chests-container">
                    {cofres.map((cofre, index) => (
                         <Chest
                            key={index}
                            chestNumber={cofre.chestNumber}
                            isMonster={cofre.isMonster}
                            coins={cofre.coins}
                            isOpen={cofre.isOpen}
                            selectChest={() => handleChestSelection(cofre)}
                        />
                    ))}
                </div>
            </div>
            <div className={`game-info-container ${showPopup || showFeedback || showGameOver ? 'disabled' : ''}`}>
                <div className="selected-chest">
                    <p tabIndex={0}>Cofre seleccionado</p>
                    <img
                        tabIndex={0}
                        src={cofreSeleccionado?.isMonster ? MonsterImg : Coins}
                        alt={cofreSeleccionado ? `Imagen del cofre número ${cofreSeleccionado.chestNumber} ${cofreSeleccionado.isMonster ? 'con un monstruo' : 'con monedas'}` : 'Selecciona un cofre'}
                    />
                    <p tabIndex={0}>{cofreSeleccionado ? `Cofre número ${cofreSeleccionado.chestNumber}` : 'Ningún cofre seleccionado'}</p>
                </div>
                <img tabIndex={0} src={personajeImage} alt={`Tu personaje, ${character}`} className="character" />
                <p tabIndex={0} className="coins-earned">{totalMonedas} monedas ganadas</p>
                <div aria-live="polite" className="chest-result visually-hidden" tabIndex={-1}>
                    {resultado && <p>{resultado}</p>}
                </div>
            </div>
            {showPopup && currentQuestion && (
                <Pregunta
                    isOpen={showPopup}
                    question={currentQuestion}
                    onClose={() => setShowPopup(false)}
                    onFeedbackOpen={handleAnswerSubmit}
                />
            )}
            {showFeedback && (
                <Retroalimentacion
                    isOpen={showFeedback}
                    title="Retroalimentación"
                    content={feedbackContent}
                    isCorrect={isCorrect}
                    onClose={handleFeedbackClose}
                />
            )}
            {showGameOver && (
              <Finalizar Monedas={totalMonedas} onClose={() => setPage('HOME')} />
            )}
        </div>
    );
}

export default Game;

