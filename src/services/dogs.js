import { api } from "./api";

async function fetchDogIds(url, filter) {
  try {
    const dogIds = await api.get(url, {
      params: filter,
    });
    return dogIds.data;
  } catch (e) {
    return e;
  }
}

async function fetchDogs(dogIds) {
  try {
    const dogs = await api.post("/dogs", dogIds);
    return dogs.data;
  } catch (e) {
    return e;
  }
}

async function fetchBreeds() {
  try {
    const dogBreeds = await api.get("/dogs/breeds");
    return dogBreeds.data;
  } catch (e) {
    return e;
  }
}

async function fetchMatch(dogIds) {
  const match = await api.post("/dogs/match", dogIds);
  return match.data;
}

async function fetchLocations(url, params) {
  try {
    const dogBreeds = await api.post(url, params);
    return dogBreeds.data;
  } catch (e) {
    return e;
  }
}

export { fetchDogIds, fetchDogs, fetchBreeds, fetchMatch };
