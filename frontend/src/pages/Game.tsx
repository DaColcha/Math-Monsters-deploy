import { useEffect, useState } from "react";
import Chest from "../components/Chest"
import { ChestType } from "../types"
import ChestImg from '../assets/chest.svg';
import MonsterImg from '../assets/monster.svg';
import Dino from '../assets/dino.svg';

import '../styles/pages/Game.css';

function Game() {
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [chests, setChests] = useState<ChestType[]>([]);
  const [selectedChest, setSelectedChest] = useState<ChestType>({} as ChestType);

  useEffect(() => {
    const coins = [10, 20, 50, 100];
    const types = [true, false, false, true];
    let randomIndex = 0
    let isMonster = false;
    const auxiliarChestsArray: ChestType[] = [];

    for(let i = 0; i < 9; i++) {
      randomIndex = Math.floor(Math.random() * coins.length);
      isMonster = types[randomIndex];
      if(isMonster) {
        auxiliarChestsArray.push({ chestNumber: i + 1, isMonster, coins: 0 });
      } else {
        auxiliarChestsArray.push({ chestNumber: i + 1, isMonster, coins: coins[randomIndex] });
      } 
    }
    setChests(auxiliarChestsArray);
  }, []);

  const handleChestSelection = (selectedChest: ChestType) => {
    setTotalCoins(totalCoins + selectedChest.coins);
    setSelectedChest(selectedChest);
  }

  return (
    <>
      <div className="game-container">
        <div className="chests-container">
          {chests.map((chest, index) => (
            <Chest
              key={index}
              chestNumber={chest.chestNumber}
              isMonster={chest.isMonster}
              coins={chest.coins}
              getChestValue={() => { handleChestSelection(chests[index]); }}
            />
          ))}
        </div>
        <div className="game-info-container">
          <div className="chest-selection">
            <img
              src={
                selectedChest.isMonster ? MonsterImg : ChestImg
              }
              alt={`Image of chest number ${selectedChest.chestNumber}`} />
            <p>Selected Chest: {selectedChest.chestNumber}</p>
          </div>
          <img src={Dino} alt="Your character, a red dinosaur" className="character" />
          <p className="coins-earned">
            Total coins earned: {totalCoins}
          </p>
        </div>
      </div>
    </>
  )
}

export default Game
