import { useEffect, useState } from "react";
import MainGameImage from "./MainGameImage";
import { checkIfAllItemsFound } from "./gameplayFunctions";

function DisplayItemsToFind({ array, foundItemId }) {
  function Overlay({ found }) {
    if (found) {
      return <div className="overlay">X</div>;
    }
    return <></>;
  }

  return (
    <div className="itemsToFind">
      <h3>Here are the characters to find</h3>
      <div>
        {array.map((item) => {
          if (item.id === Number(foundItemId)) {
            item.found = true;
          }
          return (
            <div key={item.src}>
              <Overlay found={item.found} />
              <img src={item.src} alt={item.name} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App({ displayedImage, setUserVictory }) {
  const [foundItemId, setFoundItemId] = useState(null);
  const gameplayObject = displayedImage[0];
  const itemsToFind = gameplayObject.toFind;

  useEffect(() => {
    if (foundItemId) {
      const allItemsFound = checkIfAllItemsFound(foundItemId, itemsToFind);
      setFoundItemId(null);
      if (allItemsFound) {
        setUserVictory(true);
      }
    }
  }, [foundItemId]);

  return (
    <div id="gameplay">
      <DisplayItemsToFind array={itemsToFind} foundItemId={foundItemId} />
      <MainGameImage
        gameplayObject={gameplayObject}
        itemsToFind={itemsToFind}
        setFoundItemId={setFoundItemId}
      />
    </div>
  );
}

export default App;
