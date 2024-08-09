import { useEffect, useState } from "react";
import Chest from "../components/Chest"
import { ChestType } from "../types"
import ChestImg from '../assets/chest.svg';
import MonsterImg from '../assets/monster.svg';
import Dino from '../assets/dino.svg';
import { useGlobalContext } from "../GlobalContext";

import '../styles/pages/Game.css';

function Game() {
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [chests, setChests] = useState<ChestType[]>([]);
  const [selectedChest, setSelectedChest] = useState<ChestType>({} as ChestType);
  const { setPage } = useGlobalContext()

  useEffect(() => {
    const coins = [10, 10, 10, 20, 20, 50, 50, 100, 100];
    const types = [true, false, false, true, false, true, false, true, false];
    let randomIndex = 0
    let isMonster = false;
    const auxiliarChestsArray: ChestType[] = [];

    for (let i = 0; i < 9; i++) {
      randomIndex = Math.floor(Math.random() * coins.length);
      isMonster = types[randomIndex];
      if (isMonster) {
        auxiliarChestsArray.push({ chestNumber: i + 1, isMonster, coins: 0, isOpen: false });
      } else {
        auxiliarChestsArray.push({ chestNumber: i + 1, isMonster, coins: coins[randomIndex], isOpen: false });
      }
    }
    setChests(auxiliarChestsArray);
  }, []);

  const handleChestSelection = (selectedChest: ChestType) => {
    if (selectedChest.isOpen) { return }
    setTotalCoins(totalCoins + selectedChest.coins);
    setSelectedChest(selectedChest);
    selectedChest.isOpen = true
  }

  window.onkeydown = (event) => {
    switch (event.key) {
      case '1':
        handleChestSelection(chests[0])
        break
      case '2':
        handleChestSelection(chests[1])
        break
      case '3':
        handleChestSelection(chests[2])
        break
      case '4':
        handleChestSelection(chests[3])
        break
      case '5':
        handleChestSelection(chests[4])
        break
      case '6':
        handleChestSelection(chests[5])
        break
      case '7':
        handleChestSelection(chests[6])
        break
      case '8':
        handleChestSelection(chests[7])
        break
      case '9':
        handleChestSelection(chests[8])
        break
    }
  }

  return (
    <div className="game-container">
      <button tabIndex={0} className="go-back" onClick={() => setPage('HOME')}>⬅ BACK TO HOME</button>
      <div className="chest-selection">
        <h1 tabIndex={0}>Choose a chest</h1>
        <div className="chests-container">
          {chests.map((chest, index) => (
            <Chest
              key={index}
              chestNumber={chest.chestNumber}
              isMonster={chest.isMonster}
              coins={chest.coins}
              isOpen={chest.isOpen}
              selectChest={() => { handleChestSelection(chests[index]); }}
            />
          ))}
        </div>
      </div>
      <div className="game-info-container">
        <div className="selected-chest">
          <p tabIndex={0}>Selected chest</p>
          <img
            tabIndex={0}
            src={selectedChest.isMonster ? MonsterImg : ChestImg}
            alt={`Image of chest number ${selectedChest.chestNumber}`} />
          <p tabIndex={0}>{selectedChest.chestNumber}</p>
        </div>
        <img tabIndex={0} src={Dino} alt="Your character, a red dinosaur" className="character" />
        <p tabIndex={0} className="coins-earned">
          {totalCoins} coins earned
        </p>
      </div>
    </div>
  )
}

export default Game
