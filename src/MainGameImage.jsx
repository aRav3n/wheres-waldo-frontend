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

  function hideDisplayBox() {
    setDisplayBoxStyle({ display: "none" });
  }

  function handleImageClick(e) {
    if (!clickPosition) {
      const position = getClickPosition(e, setImageDims);
      setClickPosition(position);
    } else {
      hideDisplayBox();
    }
  }

  // if there's a selected item check for correct click then reset clickPosition
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
        setClickPosition(null);
      }
    })();
  }, [selectedItem]);

  // hide displayBox if clickPosition has been wiped, otherwise build the displayBox
  useEffect(() => {
    if (!clickPosition) {
      hideDisplayBox();
    } else {
      /* used to get the click position when adding new characters or games
      console.log(clickPosition);
      */

      buildDisplayBox(setDisplayBoxStyle, clickPosition, imageDims);
    }
  }, [clickPosition]);

  return (
    <>
      <DisplayBox
        displayBoxStyle={displayBoxStyle}
        hideDisplayBox={hideDisplayBox}
        itemsToFind={itemsToFind}
        setClickPosition={setClickPosition}
        setSelectedItem={setSelectedItem}
      />
      <img
        src={gameplayObject.src}
        alt={gameplayObject.name}
        onClick={(e) => {
          handleImageClick(e);
        }}
      />
    </>
  );
}
