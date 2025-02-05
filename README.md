# Fetch Rewards Dog Adoption Portal

## Overview
This is a frontend application built with React for a dog adoption portal, developed as part of a technical test for Fetch Rewards. The application allows users to browse dogs, apply filters, sort results, mark favorites, and find a match. Authentication is included for user session management.

---

## Tech Stack
- **React.js** - UI development
- **React Router** - Client-side routing
- **Context API & useReducer** - State management
- **MUI (Material UI)** - UI components
- **Custom API services** - Fetching data from backend
- **CSS Modules** - Scoped styling

---

## Project Structure

```
/src
│── components       # UI components
│── context          # Global state management (Auth, Dogs)
│── services         # API calls
│── pages            # Page-level components
│── layouts          # Layout components
│── main.jsx         # Entry point of the app
│── App.jsx          # Root component
```

---

## Key Features

### 1. **Authentication (AuthContext.jsx)**
Manages user authentication state.
- `login(name, email)`: Logs in the user and stores session data.
- `logout()`: Logs out user and clears session.
- `useEffect()`: Checks session validity and logs out if expired.

### 2. **Dog Management (DogsContext.jsx)**
Handles fetching, filtering, and storing dog data.
- `fetchDogs()`: Fetches dog listings.
- `fetchBreeds()`: Fetches breed options.
- `fetchMatch()`: Finds a matched dog from favorites.
- `useReducer()`: Manages dog-related state (favorites, filters, errors).
- `useEffect()`: Fetches initial data if authenticated.

### 3. **Sidebar (SideBar.jsx)**
Provides sorting and filtering options.
- **SortBox**: Sorts dog listings.
- **BreedFilter**: Filters by breed.
- **AgeFilter**: Filters by age.
- **Collapse Button**: Expands/minimizes sidebar.

### 4. **Dog List (DogList.jsx)**
Displays a paginated list of dogs.
- Uses `fetchAllDogs()` for data.
- Maps over `allDogsList` to render cards.

### 5. **Favorite Dogs (Favorites.jsx)**
Displays favorited dogs.
- `useEffect()`: Retrieves stored favorites.
- `favoriteToggled action`: Adds/removes dogs from favorites.

### 6. **API Service (dogs.js)**
Handles API requests to fetch data.
- `fetchDogIds(url, filters)`: Fetches dog IDs.
- `fetchDogs(ids)`: Fetches dog details.
- `fetchBreeds()`: Fetches available breeds.
- `fetchMatch(favoriteIds)`: Finds a match.

---

## User Flow
1. User **logs in**.
2. `AuthContext` verifies session.
3. `DogsContext` loads dog listings.
4. User applies **filters & sorting**.
5. User **favorites** dogs.
6. User requests a **match**.
7. If session expires, user is **logged out** automatically.

---

## Running the Project
### Install dependencies
```sh
npm install
```

### Start the development server
```sh
npm run dev
```

---

## Notes & Future Improvements
✅ Ensure proper handling of authentication state before making API calls.
✅ Improve UI/UX with animations.
✅ Add unit tests for reducers and API functions.

---

