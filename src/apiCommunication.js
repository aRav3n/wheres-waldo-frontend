import { imageJson } from "./mockBackend.js";

const selectionTolerance = 0.025;

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

async function getGameArray() {
  const jsonArray = imageJson;
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
        found: false,
      };
    }
    newArray.push(item);
  }
  return newArray;
}

async function getCorrectCoordinates(toFindId) {
  const mainArray = await getGameArray();
  toFindId = Number(toFindId);
  for (let i = 0; i < mainArray.length; i++) {
    const toFindArray = mainArray[i].toFind;
    for (let j = 0; j < toFindArray.length; j++) {
      if (toFindId === toFindArray[j].id) {
        const objectInQuestion = toFindArray[j];
        const correctCoordinates = {
          x: objectInQuestion.x,
          y: objectInQuestion.y,
        };
        return correctCoordinates;
      }
    }
  }
}

export async function getImageArray() {
  const array = await getGameArray();
  const finalArray = updateArrayForGameplay(array);

  return finalArray;
}

function checkIfInTolerance(userCoordinate, correctCoordinate) {
  const min = correctCoordinate - selectionTolerance;
  const max = correctCoordinate + selectionTolerance;
  if (userCoordinate >= min && userCoordinate <= max) {
    return true;
  }
  return false;
}

export async function checkCoordinates(userCoordinates, toFindId) {
  const correctCoordinates = await getCorrectCoordinates(toFindId);
  const xGood = checkIfInTolerance(userCoordinates.x, correctCoordinates.x);
  const yGood = checkIfInTolerance(userCoordinates.y, correctCoordinates.y);
  if (xGood && yGood) {
    return true;
  }
  return false;
}
