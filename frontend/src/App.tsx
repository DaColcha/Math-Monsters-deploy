import { useGlobalContext } from "./GlobalContext";
import Game from "./pages/Game"
import Home from "./pages/Home";

function App() {
  const { page } = useGlobalContext()

  if (page === 'HOME') {
    return <Home/>
  } else if (page === 'GAME') {
    return <Game/>
  }
}

export default App
