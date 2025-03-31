export default function App({ displayedImage, setDisplayedImage }) {
  function ButtonDuringGameplay() {
    if (displayedImage) {
      return (
        <button
          type="button"
          onClick={() => {
            setDisplayedImage(null);
          }}
        >
          New Game
        </button>
      );
    }
    return <div>Select a game to start playing!</div>;
  }

  return (
    <header>
      <ButtonDuringGameplay />
    </header>
  );
}
