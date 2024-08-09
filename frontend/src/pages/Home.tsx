import { useGlobalContext } from "../GlobalContext"

import '../styles/pages/Home.css'

function Home() {
  const { setPage } = useGlobalContext()

  return (
    <div className="home-page-container">
      <div className="game-name">
        <h1 tabIndex={0}>MATHS AND MONSTERS</h1>
        <h5 tabIndex={0}>A game by: Guns & Coders</h5>
      </div>
      <button tabIndex={0} onClick={() => setPage('GAME')}>PLAY</button>
    </div>
  )
}

export default Home
