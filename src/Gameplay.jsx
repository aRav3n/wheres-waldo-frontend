import { useEffect, useState } from "react";
import MainGameImage from "./MainGameImage";

function DisplayItemsToFind({ array, foundItemId }) {
  function Overlay({ found }) {
    if (found) {
      console.log("Overlay in place");
      return <div className="overlay">X</div>;
    }
    return <></>;
  }

  return (
    <div className="itemsToFind">
      <h3>Here are the characters to find</h3>
      <div>
        {array.map((item) => {
          let found = false;
          if (item.id === Number(foundItemId)) {
            found = true;
          }
          return (
            <div key={item.src}>
              <Overlay found={found} />
              <img src={item.src} alt={item.name} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App({ displayedImage, setDisplayedImage }) {
  const [foundItemId, setFoundItemId] = useState(null);
  const gameplayObject = displayedImage[0];
  const itemsToFind = gameplayObject.toFind;

  useEffect(() => {
    if (foundItemId) {
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
