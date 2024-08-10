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

function Home() {
  const { setPage, character, setCharacter } = useGlobalContext();

  return (
    <div className="home-page-container">
      <div className="header">
        <img
          tabIndex={0}
          src={logoName}
          width="960px"
          height="380px"
          alt="Math Monsters"
        />

        <div className="character-info">
          {character === "PRINCESS" && (
            <img
              tabIndex={0}
              role="button"
              src={btnPrincess}
              width="194px"
              height="164px"
              onClick={() => setCharacter("KNIGHT")}
              className="select-character"
              alt="Seleccionar personaje"
            />
          )}
          {character === "KNIGHT" && (
            <img
              tabIndex={0}
              role="button"
              src={btnKnight}
              width="194px"
              height="164px"
              onClick={() => setCharacter("DINO")}
              className="select-character"
              alt="Seleccionar personaje"
            />
          )}
          {character === "DINO" && (
            <img
              tabIndex={0}
              role="button"
              src={btnDino}
              width="194px"
              height="164px"
              onClick={() => setCharacter("PRINCESS")}
              className="select-character"
              alt="Seleccionar personaje"
            />
          )}

          <img
            tabIndex={0}
            role="button"
            src={info}
            width="44px"
            height="44px"
            className="info"
            alt="Información"
          />
        </div>
      </div>
      <div className="start">
        <img
          tabIndex={0}
          role="button"
          onClick={() => setPage("GAME")}
          alt="Iniciar juego"
          src={botonIniciar}
          width="505px"
          height="127px"
        />

        {character === "PRINCESS" && (
          <img
            tabIndex={0}
            src={Princess}
            width="227px"
            height="320px"
            alt="Princesa"
          />
        )}
        {character === "KNIGHT" && (
          <img
            tabIndex={0}
            src={Knight}
            width="227px"
            height="320px"
            alt="Príncipe"
          />
        )}
        {character === "DINO" && (
          <img
            tabIndex={0}
            src={Dino}
            width="227px"
            height="320px"
            alt="Dinosaurio"
          />
        )}
      </div>
    </div>
  );
}

export default Home;
