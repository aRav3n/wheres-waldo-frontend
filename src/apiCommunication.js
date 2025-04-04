import {
  checkCoordinates,
  getAllGames as getAllGamesFromBackend,
  getSpecificGame,
} from "./mockBackend.js";

// functions to get JSON from the API
async function getJsonResponse(urlExtension, method, bodyObject) {
  const apiUrl =
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_DEV_API_URL
      : import.meta.env.VITE_PROD_API_URL;

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
  const gamesJson = await getAllGamesFromBackend();
  return gamesJson;
}

// export functions
async function getAllGames() {
  const jsonArray = await getAllGamesJson();
  const array = JSON.parse(jsonArray);
  return array;
}

async function getHighScoresForGame(gameId) {
  const gameJson = await getSingleGameJson(gameId);
  const game = JSON.parse(gameJson);
  if (game) {
    const highScores = game.highScores;
    return highScores;
  }
  return null;
}

async function getSingleGame(id) {
  const gameJson = await getSingleGameJson(id);
  const game = JSON.parse(gameJson);
  return game;
}

async function postCoordinatesForChecking(coordinatesObject, itemId) {
  const coordinateCheckBool = await checkCoordinates(coordinatesObject, itemId);
  return coordinateCheckBool;
}

// async function updateScoreboard(name, gameId, token) {}

export {
  getAllGames,
  getHighScoresForGame,
  getSingleGame,
  postCoordinatesForChecking,
};

// need to update these to local functions to work with API
export {
  // this will be replaced with the currently commented function below that uses jwt to calculate elapsed time
  updateScoreboard,
  // this will be rendered unnecessary due to above
  stopwatch,
} from "./mockBackend.js";
