import { useState, useEffect } from "react";
import { getImageArray } from "./gameplayFunctions";

export default function App({ setCurrentGameId }) {
  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    setCurrentGameId(null);
    (async () => {
      const array = await getImageArray();
      setImageArray(array);
    })();
  }, []);

  return (
    <>
      <h1>Let's play!</h1>
      <p>Select an image to start playing</p>
      <div className="imageGrid">
        {imageArray.map((image) => {
          return (
            <button
              type="button"
              className="imageButton"
              key={image.id}
              onClick={() => {
                setCurrentGameId(image.id);
              }}
            >
              <span>
                <img src={image.src} alt={`image of ${image.name}`} />
              </span>
              <h2>{image.name}</h2>
              <p>
                credit: <em>{image.credit}</em>
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
}
