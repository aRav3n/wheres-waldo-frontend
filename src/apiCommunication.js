/* to do:
"/game/:gameId/scores"   addUserScoreToGame

*/


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

async function getAllGames() {
  const urlExtension = "/";
  const method = "GET";
  const bodyObject = {};
  const games = await getJsonResponse(urlExtension, method, bodyObject);
  return games;
}

async function getHighScoresForGame(gameId) {
  const urlExtension = `/${Number(gameId)}/scores`;
  const method = "GET";
  const bodyObject = {};
  const scores = await getJsonResponse(urlExtension, method, bodyObject);

  return scores;
}

async function getSingleGame(id) {
  const urlExtension = `/game/${Number(id)}`;
  const method = "GET";
  const bodyObject = {};
  const game = await getJsonResponse(urlExtension, method, bodyObject);

  const gameId = game.id;
  const itemUrlExtension = `/game/${Number(gameId)}/items`;
  const items = await getJsonResponse(itemUrlExtension, method, bodyObject);
  game.toFind = items;

  return game;
}

async function postCoordinatesForChecking(coordinatesObject, itemId) {
  const urlExtension = `/items/${Number(itemId) / check}`;
  const method = "POST";
  const bodyObject = coordinatesObject;
  const boolString = await getJsonResponse(urlExtension, method, bodyObject);
  console.log({ boolString });
  const coordinateCheckBool = boolString === "true" ? true : false;
  return coordinateCheckBool;
}

async function updateScoreboard(name, gameId, token) {
  
}

export {
  getAllGames,
  getHighScoresForGame,
  getSingleGame,
  postCoordinatesForChecking,
  updateScoreboard,
};
