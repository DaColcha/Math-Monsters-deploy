import ChestImg from '../assets/chest.svg';
import MonsterImg from '../assets/monster.svg';
import CoinImg from '../assets/coin.svg';
import { useState } from 'react';

import '../styles/components/Chest.css';

type ChestProps = {
  chestNumber: number;
  isMonster: boolean;
  coins: number;
  getChestValue: () => void;
}

function Chest({ chestNumber, isMonster, coins, getChestValue }: ChestProps) {
  const [isOpen, setIsOpen] = useState(false);

  if(isOpen) {
    return (
      <div className="chest-container">
        <img
          className="chest-img"
          src={isMonster ? MonsterImg : CoinImg}
          alt={`Image of chest number ${chestNumber}`}
        />
        {!isMonster && <p className="chest-number">{coins} coins</p>}
        <span className="chest-number">{chestNumber}</span>
      </div>
    )
  }

  return (
    <div className="chest-container"
      onClick={
        () => {
          if(isOpen) return;

          getChestValue()
          setIsOpen(true)
        } 
    }>
      <img className="chest-img" src={ChestImg} alt={`Image of chest number ${chestNumber}`} />
      <span className="chest-number">{chestNumber}</span>
    </div>
  )
}

export default Chest
