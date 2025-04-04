import {
  addUserToScoreboard,
  checkCoordinates,
  getGames,
  getHighScoresForGame,
  getSpecificGame,
  stopwatch,
} from "./apiCommunication";

export async function addUserScore(userScoreObject, gameId) {
  const user = JSON.stringify(userScoreObject);
  const id = JSON.stringify(gameId);
  await addUserToScoreboard(user, id);
}

export function checkIfAllItemsFound(recentFoundId, arrayOfItemsToFind) {
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

export async function checkIfCorrect(coordinates, idOfItem) {
  const correctClick = await checkCoordinates(coordinates, idOfItem);

  if (correctClick) {
    return idOfItem;
  }
  return false;
}

export function getClickPosition(e, setImageDims) {
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

export async function getGame(gameId) {
  const gameJson = await getSpecificGame(gameId);
  const game = JSON.parse(gameJson);
  return game;
}

export async function getHighScores(gameId) {
  const scores = await getHighScoresForGame(gameId);
  return scores;
}

export async function getImageArray() {
  const games = await getGames();
  return games;
}

export function buildDisplayBox(setDisplayBoxStyle, clickPosition, imageDims) {
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

export function startTimer() {
  stopwatch.startTimer();
}

export function stopTimer() {
  const time = stopwatch.stopTimer();
  return time;
}
