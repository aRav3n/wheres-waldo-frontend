async function getJsonResponse(urlExtension, method, bodyObject, token) {
  const apiUrl =
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_DEV_API_URL
      : import.meta.env.VITE_PROD_API_URL;

  const url = `${apiUrl}${urlExtension}`;
  const fetchObject = {
    method,
  };
  if (method !== "GET") {
    const body = JSON.stringify(bodyObject);
    fetchObject.body = body;
  }
  if (token) {
    fetchObject.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    fetchObject.headers = {
      "Content-Type": "application/json",
    };
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
  const urlExtension = `/game/${Number(gameId)}/scores`;
  const method = "GET";
  const bodyObject = {};
  const scores = await getJsonResponse(urlExtension, method, bodyObject);

  return scores;
}

async function getSingleGame(id) {
  const urlExtension = `/game/${Number(id)}`;
  const method = "GET";
  const bodyObject = {};
  const gameAndToken = await getJsonResponse(urlExtension, method, bodyObject);
  const game = gameAndToken.game;
  const token = gameAndToken.token;

  const gameId = game.id;
  const itemUrlExtension = `/game/${Number(gameId)}/items`;
  const items = await getJsonResponse(itemUrlExtension, method, bodyObject);
  game.toFind = items;

  return { game, token };
}

async function postCoordinatesForChecking(coordinatesObject, itemId) {
  const urlExtension = `/items/${Number(itemId)}/check`;
  const method = "POST";
  const bodyObject = coordinatesObject;
  const coordinateCheckBool = await getJsonResponse(
    urlExtension,
    method,
    bodyObject
  );

  return coordinateCheckBool;
}

async function updateScoreboard(name, gameId, token) {
  const urlExtension = `/game/${Number(gameId)}/scores`;
  const method = "POST";
  const bodyObject = { name };
  await getJsonResponse(urlExtension, method, bodyObject, token);
}

export {
  getAllGames,
  getHighScoresForGame,
  getSingleGame,
  postCoordinatesForChecking,
  updateScoreboard,
};
