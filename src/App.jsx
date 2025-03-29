import { useEffect, useState } from "react";
import "./App.css";
import { getImageArray } from "./apiCommunication.js";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";

function App() {
  const [displayedImage, setDisplayedImage] = useState(null);
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    (async () => {
      const array = await getImageArray();
      setImageArray(array);
    })();
  }, []);

  function Display() {
    if (!displayedImage) {
      return <Landing setDisplayedImage={setDisplayedImage} imageArray={imageArray} />;
    }
    return <h1>Trying to display image with an id of {displayedImage}</h1>;
  }

  return (
    <>
      <Header />
      <main>
        <Display />
      </main>
      <Footer />
    </>
  );
}

export default App;
