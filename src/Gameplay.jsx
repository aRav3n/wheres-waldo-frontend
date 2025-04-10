import { useEffect, useState } from "react";
import MainGameImage from "./MainGameImage";
import { checkIfAllItemsFound } from "./gameplayFunctions";

function DisplayItemsToFind({ itemsToFind, setItemsToFind, foundItemId }) {
  const localItems = [...itemsToFind];
  function Overlay({ found }) {
    if (found) {
      return <div className="overlay">X</div>;
    }
    return;
  }

  useEffect(() => {
    if (foundItemId) {
      const updatedItems = itemsToFind.map((item) =>
        item.id === Number(foundItemId) ? { ...item, found: true } : item
      );
      setItemsToFind(updatedItems);
    }
  }, [foundItemId]);

  if (itemsToFind) {
    return (
      <div className="itemsToFind">
        <h3>Here are the characters to find</h3>
        <div>
          {localItems.map((item) => {
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
}

function App({
  currentGameId,
  gameplayObject,
  itemsToFind,
  setItemsToFind,
  name,
  token,
  setWin,
}) {
  const [foundItemId, setFoundItemId] = useState(null);

  return (
    <div id="gameplay">
      <DisplayItemsToFind
        itemsToFind={itemsToFind}
        setItemsToFind={setItemsToFind}
        foundItemId={foundItemId}
      />
      <MainGameImage
        currentGameId={currentGameId}
        gameplayObject={gameplayObject}
        foundItemId={foundItemId}
        setFoundItemId={setFoundItemId}
        itemsToFind={itemsToFind}
      />
    </div>
  );
}

export default App;
