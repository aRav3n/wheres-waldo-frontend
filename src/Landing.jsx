import { useState } from "react";
import { getImageArray } from "./apiCommunication.js";

export default function App({ setDisplayedImage }) {
  const imageArray = getImageArray();

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
                setDisplayedImage(image.id);
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
