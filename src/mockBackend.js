const games = [
  {
    id: 1,
    name: "AD 2222",
    src: "images/1/main.jpg",
    credit: "https://www.reddit.com/user/Chekavo/",
    highScores: [],
    toFind: [
      {
        id: 1,
        name: "Kenny",
        src: "images/1/kenny.jpg",
        x: 0.5955734406438632,
        y: 0.453344120819849,
      },
      /*
      {
        id: 2,
        name: "Spiderman",
        src: "images/1/spiderman.jpg",
        x: 0.6453722334004024,
        y: 0.843042071197411,
      },
      {
        id: 3,
        name: "Stewie",
        src: "images/1/stewie.jpg",
        x: 0.9446680080482898,
        y: 0.48220064724919093,
      },
      {
        id: 4,
        name: "John Wick",
        src: "images/1/john_wick.jpg",
        x: 0.5321931589537223,
        y: 0.3988673139158576,
      },
      {
        id: 5,
        name: "Link",
        src: "images/1/link.jpg",
        x: 0.23038229376257546,
        y: 0.9004854368932039,
      },
      */
    ],
  },
];

let timeoutId = null;
let startTime = null;

function startTimer() {
  if (startTime === null) {
    startTime = Date.now();
    timeoutId = setTimeout(() => {
      const elapsedMilliseconds = Date.now() - startTime;
    }, 1000);
  }
}

function stopTimer() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    const elapsedMilliseconds = Date.now() - startTime;
    const totalTime = Math.floor(elapsedMilliseconds / 1000);
    timeoutId = null;
    startTime = null;
    return totalTime;
  }
}

export async function addUserToScoreboard(userJson, gameIdJson) {
  const user = JSON.parse(userJson);
  const gameId = JSON.parse(gameIdJson);

  const name = user.name;
  const time = user.time;
  const string = `${name} completed the challenge in ${time} seconds`;

  const newObject = {
    name,
    time,
    string,
    gameId,
  };

  for (let i = 0; i < games.length; i++) {
    if (games[i].id === gameId) {
      games[i].highScores.push(newObject);
      return true;
    }
  }
  return false;
}

export async function getSpecificGame(gameId) {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    if (game.id === gameId) {
      const gameJson = JSON.stringify(game);
      return gameJson;
    }
  }
  return null;
}

export const imageJson = JSON.stringify(games);
export const stopwatch = { startTimer, stopTimer };
