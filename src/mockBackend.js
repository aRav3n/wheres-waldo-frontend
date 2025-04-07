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
    ],
  },
];

// internal functions
function checkIfInTolerance(userCoordinate, correctCoordinate) {
  const selectionTolerance = 0.025;
  const scaleFactor = 10000;
  const min =
    Math.floor(correctCoordinate * scaleFactor - selectionTolerance * scaleFactor) / scaleFactor;
  const max =
    Math.floor(correctCoordinate * scaleFactor + selectionTolerance * scaleFactor) / scaleFactor;

  if (userCoordinate >= min && userCoordinate <= max) {
    return true;
  }
  return false;
}

let timeoutId = null;
let startTime = null;

async function getArrayOfAllGames() {
  const array = games;
  return array;
}

async function getCorrectCoordinates(id) {
  const mainArray = await getArrayOfAllGames();
  id = Number(id);
  for (let i = 0; i < mainArray.length; i++) {
    const toFindArray = mainArray[i].toFind;
    for (let j = 0; j < toFindArray.length; j++) {
      if (id === toFindArray[j].id) {
        const objectInQuestion = toFindArray[j];
        const correctCoordinates = {
          x: objectInQuestion.x,
          y: objectInQuestion.y,
        };
        return correctCoordinates;
      }
    }
  }
  return null;
}

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

function updateSingleGameForGameplay(array) {
  const findArray = array.toFind;
  for (let i = 0; i < findArray.length; i++) {
    const item = findArray[i];
    const newItem = {
      id: item.id,
      name: item.name,
      src: item.src,
    };
    findArray[i] = newItem;
  }
  array.toFind = findArray;
  return array;
}

function updateArrayForGameplay(array) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const game = array[i];
    const gameArray = updateSingleGameForGameplay(game);
    newArray.push(gameArray);
  }
  return newArray;
}

// export functions. Note: CRUD only
async function checkCoordinates(userCoordinates, itemId) {
  const correctCoordinates = await getCorrectCoordinates(itemId);
  const xGood = checkIfInTolerance(userCoordinates.x, correctCoordinates.x);
  const yGood = checkIfInTolerance(userCoordinates.y, correctCoordinates.y);
  if (xGood && yGood) {
    return true;
  }
  return false;
}

async function getAllGames() {
  const allGames = games;
  const cleanedGames = updateArrayForGameplay(allGames);
  const allGamesJson = JSON.stringify(cleanedGames);
  return allGamesJson;
}

async function getSpecificGame(gameId) {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    if (game.id === gameId) {
      const cleanedGame = updateSingleGameForGameplay(game);
      const gameJson = JSON.stringify(cleanedGame);
      return gameJson;
    }
  }
  return null;
}

async function updateScoreboard(userJson, gameIdJson) {
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

const imageJson = JSON.stringify(games);
const stopwatch = { startTimer, stopTimer };
