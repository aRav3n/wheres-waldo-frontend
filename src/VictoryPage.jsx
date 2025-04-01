import { useEffect, useState } from "react";
import { addUserScore, getHighScores } from "./gameplayFunctions";

function HighScoreDisplay({ currentGameId, setUserVictory, setCurrentGameId }) {
  const [highScores, setHighScores] = useState(null);
  useEffect(() => {
    (async () => {
      const scores = await getHighScores(currentGameId);
      setHighScores(scores);
    })();
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
      <button
        type="button"
        onClick={() => {
          setCurrentGameId(null);
          setUserVictory(null);
        }}
      >
        Start a new game
      </button>
    </div>
  );
}

function VictoryForm({ currentGameId, userVictory, setUserVictory }) {
  const [name, setName] = useState("");
  function handleNameUpdate() {
    const newVictoryObject = {
      time: userVictory.time,
      name,
    };
    (async () => {
      await addUserScore(newVictoryObject, currentGameId);
    })();
    setUserVictory(newVictoryObject);
  }

  return (
    <>
      <form id="victoryForm" action="">
        <div>
          <strong>
            Well done, you completed the challenge in just {userVictory.time}{" "}
            seconds!
          </strong>
        </div>
        <label htmlFor="name">
          What is your name?
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>
        <button type="button" onClick={handleNameUpdate}>
          Submit
        </button>
      </form>
    </>
  );
}

export default function App({
  currentGameId,
  userVictory,
  setUserVictory,
  setCurrentGameId,
}) {
  if (!userVictory.name) {
    return (
      <VictoryForm
        currentGameId={currentGameId}
        userVictory={userVictory}
        setUserVictory={setUserVictory}
      />
    );
  }
  return (
    <HighScoreDisplay
      currentGameId={currentGameId}
      setCurrentGameId={setCurrentGameId}
      setUserVictory={setUserVictory}
    />
  );
}
