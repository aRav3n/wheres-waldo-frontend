import { useEffect, useState } from "react";
import { getHighScores } from "./gameplayFunctions";

export default function App({ currentGameId, resetGame }) {
  const [highScores, setHighScores] = useState(null);
  useEffect(() => {
    if (!highScores) {
      (async () => {
        const scores = await getHighScores(currentGameId);
        console.log("scores:", scores);
        setHighScores(scores);
      })();
    }
  }, []);

  if (!highScores) {
    return <h1>High scores loading...</h1>;
  }

  return (
    <div>
      <div>
        {highScores.map((score) => {
          return <p key={score.string}>{score.string}</p>;
        })}
      </div>
      <button type="button" onClick={resetGame}>
        Start a new game
      </button>
    </div>
  );
}
