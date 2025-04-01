export default function App({ currentGameId, setCurrentGameId }) {
  function ButtonDuringGameplay() {
    if (currentGameId) {
      return (
        <button
          type="button"
          onClick={() => {
            setCurrentGameId(null);
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
