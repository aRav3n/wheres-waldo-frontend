import { getSpecificGame, imageJson } from "./mockBackend.js";

const apiUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_PROD_API_URL;

const selectionTolerance = 0.025;

// functions to get JSON from the API
async function getJsonResponse(urlExtension, method, bodyObject) {
  const url = `${apiUrl}${urlExtension}`;
  const fetchObject = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method !== "GET") {
    const body = JSON.stringify(bodyObject);
    fetchObject.body = body;
  }

  try {
    const response = await fetch(url, fetchObject);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error sending data:", error);
  }
}

async function getSingleGameJson(gameId) {
  const gameJson = await getSpecificGame(gameId);
  return gameJson;
}

async function getAllGamesJson() {
  const gamesJson = imageJson;
  return gamesJson;
}

// local use functions
async function getArrayOfAllGames() {
  const jsonArray = await getAllGamesJson();
  const array = JSON.parse(jsonArray);

  return array;
}

function updateArrayForGameplay(mainArray) {
  const newArray = [];
  for (let i = 0; i < mainArray.length; i++) {
    const item = mainArray[i];
    const findArray = item.toFind;
    for (let j = 0; j < findArray.length; j++) {
      const item = findArray[j];
      const newItem = {
        id: item.id,
        name: item.name,
        src: item.src,
      };
      findArray[j] = newItem;
    }
    newArray.push(item);
  }

  return newArray;
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

function checkIfInTolerance(userCoordinate, correctCoordinate) {
  const min = correctCoordinate - selectionTolerance;
  const max = correctCoordinate + selectionTolerance;
  if (userCoordinate >= min && userCoordinate <= max) {
    return true;
  }
  return false;
}

// export functions
async function getHighScoresForGame(gameId) {
  const gameJson = await getSingleGameJson(gameId);
  const game = JSON.parse(gameJson);
  if (game) {
    const highScores = game.highScores;
    return highScores;
  }
  return null;
}

async function getGames() {
  const array = await getArrayOfAllGames();
  const finalArray = updateArrayForGameplay(array);
  return finalArray;
}

async function checkCoordinates(userCoordinates, itemId) {
  const correctCoordinates = await getCorrectCoordinates(itemId);
  const xGood = checkIfInTolerance(userCoordinates.x, correctCoordinates.x);
  const yGood = checkIfInTolerance(userCoordinates.y, correctCoordinates.y);
  if (xGood && yGood) {
    return true;
  }
  return false;
}

export { checkCoordinates, getGames, getHighScoresForGame };

// need to update these to local functions to work with API
export {
  addUserToScoreboard,
  getSpecificGame,
  stopwatch,
} from "./mockBackend.js";
