import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import {
  fetchDogIds,
  fetchDogs,
  fetchBreeds,
  fetchMatch,
} from "../services/dogs";
import { useAuth } from "./AuthContext";

const DogsContext = createContext();

const dogsDataInitialState = {
  allDogsList: [],
  nextUrl: "",
  prevUrl: "",
  dogBreeds: [],
  dogLocations: [],
  error: null,
  totalDogs: 0,
  favoriteDogs: [],
  match: {},
};

const filtersDataInitialState = {
  breeds: [],
  zipCodes: [],
  ageMin: 0,
  ageMax: "",
};

function dogsDataReducer(state, action) {
  switch (action.type) {
    case "breedsReceived":
      return { ...state, dogBreeds: action.payload };
    case "totalDogsDataReceived":
      return { ...state, totalDogs: action.payload };
    case "setNextUrl":
      return { ...state, nextUrl: action.payload };
    case "setPrevUrl":
      return { ...state, prevUrl: action.payload };
    case "dogsListReceived":
      return { ...state, allDogsList: action.payload };
    case "favoriteToggled":
      return {
        ...state,
        favoriteDogs: state.favoriteDogs.includes(action.payload)
          ? state.favoriteDogs.filter((dog) => dog.id !== action.payload.id)
          : [...state.favoriteDogs, action.payload],
      };
    case "dogMatched":
      return {
        ...state,
        match: state.favoriteDogs.find((dog) => dog.id === action.payload),
      };
    case "error":
      alert(action.payload);
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function filtersDataReducer(state, action) {
  switch (action.type) {
    case "breedsFilterChanged":
      return {
        ...state,
        breeds: state.breeds.includes(action.payload)
          ? state.breeds.filter((breed) => breed !== action.payload)
          : [...state.breeds, action.payload],
      };
    case "ageFilterChanged":
      return { ...state, ageMax: action.payload };
    case "resetFilters":
      return { ...filtersDataInitialState };
    default:
      return state;
  }
}

function DogsProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const isFirstRender = useRef(true);
  const [filtersData, filtersDispatch] = useReducer(
    filtersDataReducer,
    filtersDataInitialState
  );
  const [
    {
      allDogsList,
      nextUrl,
      prevUrl,
      dogBreeds,
      error,
      totalDogs,
      favoriteDogs,
      match,
    },
    dogsDispatch,
  ] = useReducer(dogsDataReducer, dogsDataInitialState);

  const SEARCH_BASE_URL = "/dogs/search";

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchDogs() {
      if (!isAuthenticated) return;
      try {
        await fetchAllDogs();
        const res = await fetchBreeds();
        dogsDispatch({ type: "breedsReceived", payload: res });
      } catch (error) {
        dogsDispatch({
          type: "error",
          payload: error,
        });
      }
    }
    fetchDogs();
  }, [isAuthenticated]);

  async function fetchAllDogs(step = "default") {
    setLoading(true);
    const stepUrls = {
      default: `${SEARCH_BASE_URL}?sort=breed:${sortOrder}`,
      next: nextUrl,
      prev: prevUrl,
    };

    const fetchUrl = stepUrls[step] || stepUrls.default;
    if (!fetchUrl) return;
    try {
      const dogsData = await fetchDogIds(fetchUrl, filtersData);
      dogsDispatch({ type: "totalDogsDataReceived", payload: dogsData.total });
      if (dogsData.next) {
        dogsDispatch({ type: "setNextUrl", payload: dogsData.next || "" });
      }
      if (dogsData.prev) {
        dogsDispatch({ type: "setPrevUrl", payload: dogsData.prev || "" });
      }

      const dogs = await fetchDogs(dogsData.resultIds);
      dogsDispatch({ type: "dogsListReceived", payload: dogs });
    } catch (error) {
      dogsDispatch({
        type: "error",
        payload: error,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      fetchAllDogs();
    }
  }, [filtersData, sortOrder]);

  async function getMatchedDog() {
    setLoading(true);
    const dogIds = favoriteDogs.map((dog) => dog.id);
    const match = await fetchMatch(dogIds);
    dogsDispatch({ type: "dogMatched", payload: match.match });
    setLoading(false);
  }

  return (
    <DogsContext.Provider
      value={{
        allDogsList,
        fetchAllDogs,
        dogBreeds,
        loading,
        error,
        filtersDispatch,
        sortOrder,
        setSortOrder,
        totalDogs,
        filtersData,
        favoriteDogs,
        dogsDispatch,
        getMatchedDog,
        match,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
}

function useDogs() {
  const context = useContext(DogsContext);
  if (context === undefined)
    throw new Error("context being accessed outside the DogsProvider");
  return context;
}

export { DogsProvider, useDogs };
