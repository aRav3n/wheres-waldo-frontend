import { useEffect, useState } from "react";
import "./App.css";
import {
  checkIfAllItemsFound,
  getGame,
  getImageArray,
} from "./gameplayFunctions";
import Footer from "./Footer";
import Header from "./Header";
import Gameplay from "./Gameplay";
import Landing from "./Landing";
import NamePage from "./Name";
import VictoryPage from "./VictoryPage";

function Display({
  currentGameId,
  setCurrentGameId,
  gameplayObject,
  itemsToFind,
  setItemsToFind,
  name,
  setName,
  resetGame,
  token,
  win,
  setWin,
}) {
  if (win) {
    return <VictoryPage currentGameId={currentGameId} resetGame={resetGame} />;
  } else if (gameplayObject) {
    return (
      <Gameplay
        currentGameId={currentGameId}
        gameplayObject={gameplayObject}
        itemsToFind={itemsToFind}
        setItemsToFind={setItemsToFind}
        name={name}
        token={token}
        setWin={setWin}
      />
    );
  } else if (currentGameId) {
    return <NamePage setName={setName} />;
  }
  return <Landing setCurrentGameId={setCurrentGameId} />;
}

export default function App() {
  const [backendAwake, setBackendAwake] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [gameplayObject, setGameplayObject] = useState(null);
  const [itemsToFind, setItemsToFind] = useState(null);
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);
  const [win, setWin] = useState(false);

  function resetGame() {
    setWin(false);
    setItemsToFind(null);
    setToken(null);
    setGameplayObject(null);
    setName(null);
    setCurrentGameId(null);
  }

  // wake up backend on app load
  useEffect(() => {
    if (!backendAwake) {
      (async () => {
        await getImageArray();
        setBackendAwake(true);
      })();
    }
  }, []);

  // if there's a player name get the game object and token (for tracking time)
  useEffect(() => {
    if (name) {
      (async () => {
        const gameAndToken = await getGame(currentGameId);
        const gameObject = gameAndToken.game;
        setGameplayObject(gameObject);
        setToken(gameAndToken.token);
        setItemsToFind([...gameObject.toFind]);
      })();
    }
  }, [name]);

  // if itemsToFind changes check to see if all items are found
  useEffect(() => {
    if (itemsToFind) {
      (async () => {
        const allItemsFound = await checkIfAllItemsFound(
          itemsToFind,
          name,
          currentGameId,
          token
        );
        if (allItemsFound) {
          setWin(true);
        }
      })();
    }
  }, [itemsToFind]);

  // if the player has won then clear the gameplay object, items to find, name, and token
  useEffect(() => {
    if (win === true) {
      setGameplayObject(null);
      setItemsToFind(null);
      setName(null);
      setToken(null);
    }
  }, [win]);

  return (
    <>
      <Header currentGameId={currentGameId} resetGame={resetGame} />
      <main>
        <Display
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          gameplayObject={gameplayObject}
          itemsToFind={itemsToFind}
          setItemsToFind={setItemsToFind}
          name={name}
          setName={setName}
          resetGame={resetGame}
          token={token}
          win={win}
          setWin={setWin}
        />
      </main>
      <Footer />
    </>
  );
}
