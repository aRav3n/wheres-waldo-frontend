export default function App({ currentGameId, resetGame }) {
  function ButtonDuringGameplay() {
    if (currentGameId) {
      return (
        <button type="button" onClick={resetGame}>
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
