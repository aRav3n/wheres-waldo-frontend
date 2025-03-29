import { imageJson } from "./mockBackend.js";

export async function getJsonResponse(urlExtension, method, bodyObject) {
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

export function getImageArray() {
  const jsonArray = imageJson;
  const array = JSON.parse(jsonArray);
  return array;
}

