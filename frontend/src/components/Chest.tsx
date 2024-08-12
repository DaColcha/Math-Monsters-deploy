import ChestImg from '../assets/chest.svg';
import MonsterImg from '../assets/monster.svg';
import CoinImg from '../assets/coin.svg';

import '../styles/components/Chest.css';

type ChestProps = {
  chestNumber: number;
  isMonster: boolean;
  coins: number;
  isOpen: boolean;
  selectChest: () => void;
}

function Chest({ chestNumber, isMonster, coins, selectChest, isOpen }: ChestProps) {
  if(isOpen) {
    return (
      <div className="chest-container">
        {!isMonster && <span className="chest-coins">{coins} monedas</span>}
        <img
          className="chest-img"
          src={isMonster ? MonsterImg : CoinImg}
          alt={`Imagen del cofre número ${chestNumber}`}
        />
        <span className="chest-number">
          Cofre {chestNumber}
          </span>
      </div>
    )
  }

  return (
    <div className="chest-container"
      onClick={
        () => {
          if(isOpen) return;
          selectChest()
        } 
    }>
      <img className="chest-img" src={ChestImg} alt={`Imagen del cofre número ${chestNumber}`} />
      <span className="chest-number">{chestNumber}</span>
    </div>
  )
}

export default Chest
