import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getHighScores } from "./gameplayFunctions";

export default function App({ currentGameId, resetGame }) {
  const [highScores, setHighScores] = useState(null);
  useEffect(() => {
    if (!highScores) {
      (async () => {
        const scores = await getHighScores(currentGameId);
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
          const uniqueKey = uuidv4();
          return <p key={uniqueKey}>{score.string}</p>;
        })}
      </div>
      <button type="button" onClick={resetGame}>
        Start a new game
      </button>
    </div>
  );
}
