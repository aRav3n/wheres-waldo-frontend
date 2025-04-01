import { useEffect, useState } from "react";
import "./App.css";
import { getGame, startTimer, stopTimer } from "./gameplayFunctions";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";
import Gameplay from "./Gameplay";
import VictoryPage from "./VictoryPage";

function Display({
  currentGameId,
  setCurrentGameId,
  gameplayObject,
  itemsToFind,
  userVictory,
  setUserVictory,
}) {
  if (userVictory) {
    return (
      <VictoryPage
        currentGameId={currentGameId}
        setCurrentGameId={setCurrentGameId}
        userVictory={userVictory}
        setUserVictory={setUserVictory}
      />
    );
  } else if (itemsToFind && gameplayObject) {
    startTimer();
    return (
      <Gameplay
        currentGameId={currentGameId}
        gameplayObject={gameplayObject}
        itemsToFind={itemsToFind}
        setUserVictory={setUserVictory}
      />
    );
  }
  return <Landing setCurrentGameId={setCurrentGameId} />;
}

function App() {
  const [currentGameId, setCurrentGameId] = useState(null);
  const [userVictory, setUserVictory] = useState(false);
  const [gameplayObject, setGameplayObject] = useState(null);
  const [itemsToFind, setItemsToFind] = useState(null);

  useEffect(() => {
    if (currentGameId) {
      (async () => {
        const gameObject = await getGame(currentGameId);
        setGameplayObject(gameObject);
        setItemsToFind([...gameObject.toFind]);
      })();
    } else {
      setUserVictory(false);
    }
  }, [currentGameId]);

  useEffect(() => {
    if (userVictory === true) {
      const time = stopTimer();
      const victoryObject = {
        name: null,
        time,
      };
      setUserVictory(victoryObject);
      setGameplayObject(null);
      setItemsToFind(null);
    }
  }, [userVictory]);

  return (
    <>
      <Header
        currentGameId={currentGameId}
        setCurrentGameId={setCurrentGameId}
      />
      <main>
        <Display
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          gameplayObject={gameplayObject}
          itemsToFind={itemsToFind}
          userVictory={userVictory}
          setUserVictory={setUserVictory}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
