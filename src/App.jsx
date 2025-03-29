import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Landing from "./Landing";

function App() {
  const [displayedImage, setDisplayedImage] = useState(null);

  function Display() {
    if (!displayedImage) {
      return <Landing setDisplayedImage={setDisplayedImage} />;
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
