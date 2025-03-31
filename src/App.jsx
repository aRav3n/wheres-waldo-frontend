import { useEffect, useState } from "react";
import "./App.css";
import { getImageArray } from "./apiCommunication.js";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";
import Gameplay from "./Gameplay";

function App() {
  const [displayedImage, setDisplayedImage] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [userVictory, setUserVictory] = useState(false);

  useEffect(() => {
    (async () => {
      const array = await getImageArray();
      setImageArray(array);
    })();
  }, [displayedImage]);

  useEffect(() => {
    if (userVictory) {
      setDisplayedImage(null);
    }
  }, [userVictory]);

  function Display() {
    if (!displayedImage) {
      return (
        <Landing
          setDisplayedImage={setDisplayedImage}
          imageArray={imageArray}
        />
      );
    }
    return (
      <Gameplay
        displayedImage={displayedImage}
        setUserVictory={setUserVictory}
      />
    );
  }

  return (
    <>
      <Header
        displayedImage={displayedImage}
        setDisplayedImage={setDisplayedImage}
      />
      <main>
        <Display />
      </main>
      <Footer />
    </>
  );
}

export default App;
