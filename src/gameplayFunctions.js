import {
  getAllGames,
  getHighScoresForGame,
  getSingleGame,
  postCoordinatesForChecking,
  updateScoreboard,
} from "./apiCommunication";

async function addUserScore(name, gameId, token) {
  await updateScoreboard(name, gameId, token);
}

function checkIfAllItemsFound(recentFoundId, arrayOfItemsToFind) {
  let allItemsFound = true;
  for (let i = 0; i < arrayOfItemsToFind.length; i++) {
    const thisItem = arrayOfItemsToFind[i];
    if (!thisItem.found && thisItem.id !== Number(recentFoundId)) {
      allItemsFound = false;
    }
    if (!allItemsFound) return allItemsFound;
  }
  return allItemsFound;
}

async function checkIfCorrect(coordinates, idOfItem) {
  const correctClick = await postCoordinatesForChecking(coordinates, idOfItem);
  if (correctClick) {
    return idOfItem;
  }
  return false;
}

function getClickPosition(e, setImageDims) {
  const rect = e.target.getBoundingClientRect();
  const clickX = Math.floor(e.clientX - rect.left);
  const clickY = Math.floor(e.clientY - rect.top);

  const imageX = e.target.offsetWidth;
  const imageY = e.target.offsetHeight;
  const newImageDims = { x: imageX, y: imageY };
  setImageDims(newImageDims);

  const x = clickX / imageX;
  const y = clickY / imageY;

  return { x, y };
}

async function getGame(gameId) {
  const game = await getSingleGame(gameId);
  return game;
}

async function getHighScores(gameId) {
  const scores = await getHighScoresForGame(gameId);
  return scores;
}

async function getImageArray() {
  const games = await getAllGames();
  return games;
}

function buildDisplayBox(setDisplayBoxStyle, clickPosition, imageDims) {
  const boxSize = Math.min(window.innerWidth * 0.5, 150);

  const idealX = clickPosition.x * imageDims.x - boxSize / 2;
  const idealY = clickPosition.y * imageDims.y - boxSize / 2;

  const x = `${Math.min(Math.max(idealX, 0), imageDims.x - boxSize)}px`;
  const y = `${Math.min(Math.max(idealY, 0), imageDims.y - boxSize)}px`;

  setDisplayBoxStyle({
    display: "block",
    width: `${boxSize}px`,
    top: y,
    left: x,
  });
}

export {
  startTimer,
  stopTimer,
  buildDisplayBox,
  getImageArray,
  getHighScores,
  getGame,
  getClickPosition,
  checkIfCorrect,
  checkIfAllItemsFound,
  addUserScore,
};
