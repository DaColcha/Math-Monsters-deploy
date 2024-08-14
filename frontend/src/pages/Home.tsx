import { KeyboardEvent, useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalContext";
import logoName from "../assets/logoName.svg";
import botonIniciar from "../assets/iniciar.svg";
import Princess from "../assets/princess.svg";
import Knight from "../assets/knight.svg";
import Dino from "../assets/dino.svg";
import btnPrincess from "../assets/princess-btn.svg";
import btnKnight from "../assets/knight-btn.svg";
import btnDino from "../assets/dino-btn.svg";
import info from "../assets/info.svg";
import "../styles/pages/Home.css";
import { CustomModal } from "../components/Modal";

const Home = () => {
  const { setPage, character, setCharacter, setPersonajeImage, retorno, setRetorno } = useGlobalContext();
  const characterRef = useRef<HTMLImageElement>(null);
  const [announcement, setAnnouncement] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const startButtonRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      changeCharacter();
    }
  };

  const changeCharacter = () => {
    if (character === "PRINCESA") {
      setPersonajeImage(Knight);
      setCharacter("CABALLERO");
    } else if (character === "CABALLERO") {
      setPersonajeImage(Dino);
      setCharacter("DINOSAURIO");
    } else {
      setPersonajeImage(Princess);
      setCharacter("PRINCESA");
    }

    // Mantener el foco en el botón del personaje seleccionado
    if (characterRef.current) {
      characterRef.current.focus();
    }
  };

  const handleInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleInfoKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleInfoClick();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal sin cambiar el foco
  };

  useEffect(() => {
    if (retorno) {
      setRetorno(false);
    } else {
      setAnnouncement(`Personaje: ${character}`);
    }
  }, [character, retorno, setRetorno]);

  return (
    <div className="home-page-container">
      <div className="header">
        <img
          className="logo"
          tabIndex={0}
          src={logoName}
          alt="Math Monsters"
          aria-label="Math Monsters logo"
          role="img"
        />
        <div className="character-info">
          <img
            tabIndex={0}
            role="button"
            src={character === "PRINCESA" ? btnPrincess : character === "CABALLERO" ? btnKnight : btnDino}
            width="194px"
            height="164px"
            onClick={changeCharacter}
            onKeyDown={handleKeyDown}
            className="select-character"
            alt={`Seleccionar personaje ${character}`}
            aria-label={`Seleccionar personaje ${character}`}
            ref={characterRef}
          />
          <div
            aria-live="assertive"
            className="announcement"
            role="alert"
          >
            {announcement}
          </div>
          <img
            tabIndex={0}
            role="button"
            src={info}
            width="44px"
            height="44px"
            className="info"
            alt="Información"
            onClick={handleInfoClick}
            onKeyDown={handleInfoKeyDown}
          />
        </div>
      </div>
      <div className="start">
        <div
          tabIndex={0}
          role="button"
          onClick={() => setPage("GAME")}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setPage("GAME");
            }
          }}
          ref={startButtonRef}
          style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
          aria-label="Iniciar juego"
        >
          <img
            className="boton-iniciar"
            src={botonIniciar}
            alt="Iniciar juego"
          />
          
        </div>
        {character === "PRINCESA" && (
        <img
          className="personaje-seleccionado"
          tabIndex={0}
          src={Princess}
          alt="Princesa"
          role="img"
        />
      )}
      {character === "CABALLERO" && (
        <img
          className="personaje-seleccionado"
          tabIndex={0}
          src={Knight}
          alt="Caballero"
          role="img"
        />
      )}
      {character === "DINOSAURIO" && (
        <img
          className="personaje-seleccionado"
          tabIndex={0}
          src={Dino}
          alt="Dinosaurio"
          role="img"
        />
      )}
      </div>
      <CustomModal isOpen={isModalOpen} onCloseModal={closeModal} />
    </div>
  );
};

export default Home;
