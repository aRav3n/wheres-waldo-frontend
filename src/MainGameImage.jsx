import { useEffect, useState } from "react";
import DisplayBox from "./DisplayBox";
import {
  checkIfCorrect,
  getClickPosition,
  buildDisplayBox,
} from "./gameplayFunctions";

export default function App({ gameplayObject, itemsToFind, setFoundItemId }) {
  const [displayBoxStyle, setDisplayBoxStyle] = useState({ display: "none" });
  const [clickPosition, setClickPosition] = useState(null);
  const [imageDims, setImageDims] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    (async () => {
      if (selectedItem) {
        const correctSelection = await checkIfCorrect(
          clickPosition,
          selectedItem
        );
        if (correctSelection) {
          setFoundItemId(correctSelection);
        }
      }
    })();
  }, [selectedItem]);

  useEffect(() => {
    if (!clickPosition) {
      setDisplayBoxStyle({ display: "none" });
    } else {
      buildDisplayBox(setDisplayBoxStyle, clickPosition, imageDims);
    }
  }, [clickPosition]);

  return (
    <>
      <DisplayBox
        displayBoxStyle={displayBoxStyle}
        itemsToFind={itemsToFind}
        setClickPosition={setClickPosition}
        setSelectedItem={setSelectedItem}
      />
      <img
        src={gameplayObject.src}
        alt={gameplayObject.name}
        onClick={(e) => {
          const position = getClickPosition(e, setImageDims);
          setClickPosition(position);
        }}
      />
    </>
  );
}
