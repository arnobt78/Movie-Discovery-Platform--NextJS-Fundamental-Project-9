# Movie Discovery Platform – Next.js, React, TypeScript, TMDB API, TailwindCSS, Framer Motion Fundamental Project 9

A full-fledged React web application built for discovering, exploring, and learning about movies using The Movie Database (TMDB) API. This project leverages modern React practices, component-level state management, TailwindCSS for styling, and Flowbite for UI components. It is designed as a practical, real-world example of how to build a dynamic, API-driven SPA (Single Page Application) with React, and is ideal for both learning and teaching purposes.

- **Live-Demo:** [https://latest-movie.vercel.app/](https://latest-movie.vercel.app/)

<img width="1200" alt="Screenshot 2024-08-28 at 02 15 28" src="https://github.com/user-attachments/assets/78b99dd4-128c-4873-846d-09fa9925b30a"> <img width="1200" alt="Screenshot 2024-08-28 at 02 16 09" src="https://github.com/user-attachments/assets/02a5af59-2b26-4a56-97a3-b62099492a4b"> <img width="1200" alt="Screenshot 2024-08-28 at 02 16 36" src="https://github.com/user-attachments/assets/c3046cbe-497e-40fe-8d74-2e30c02f1a92">

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Technologies Used](#technologies-used)
5. [Setup and Installation](#setup-and-installation)
6. [API and Environment Variables](#api-and-environment-variables)
7. [Scripts and Usage](#scripts-and-usage)
8. [Routing and Components](#routing-and-components)
9. [Learning and Examples](#learning-and-examples)
10. [Conclusion](#conclusion)

---

## Project Overview

Cinemate MoviePedia provides users with a movie encyclopedia experience. Users can search for movies, view trending and popular films, see detailed movie information (cast, ratings, images), and enjoy a clean, responsive UI. The project is also structured to be educational, showcasing React best practices, modular code organization, and seamless API integration.

---

## Features

- **Trending & Popular Movies:** Browse real-time trending and popular movies via The Movie Database (TMDB) API.
- **Search Functionality:** Instantly search movies by title.
- **Movie Details:** View detailed information for each movie, including overview, genres, cast, ratings, and images.
- **Responsive Design:** Fully mobile-friendly and responsive using TailwindCSS and Flowbite UI components.
- **Component-based Architecture:** Easy to understand, extend, and maintain.
- **API Integration:** Learn how to fetch and display real data from external APIs in React.
- **Environment Variables:** Securely manage API keys with `.env` files.
- **Modern React Practices:** Utilizes functional components, React hooks, and React Router for SPA navigation.

---

## Project Structure

The main structure of the project is as follows:

```
Cinemate-MoviePedia--React/
│
├── public/                  # Static assets, index.html
├── src/                     # Source code
│   ├── components/          # Reusable React components (e.g., MovieCard, Navbar)
│   ├── pages/               # Application pages (e.g., Home, MovieDetails)
│   ├── api/                 # API utilities for TMDB requests
│   ├── App.js               # Main React component and routing setup
│   ├── index.js             # Entry point for React
│   └── ...                  # Other feature or utility folders/files
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # TailwindCSS configuration
├── netlify.toml             # Netlify deployment config
├── .gitignore
└── README.md                # Project documentation
```

> _Note: Some folders like `api/`, `components/`, and `pages/` are assumed standard for React+API projects. Adjust to match your actual implementation as needed._

---

## Technologies Used

- **React** (with Hooks) – component-based UI
- **React Router DOM** – SPA routing
- **TailwindCSS** – utility-first CSS framework
- **Flowbite** – UI components built on Tailwind
- **TMDB API** – movie data provider
- **Node.js / npm** – runtime and dependency management

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/arnobt78/Cinemate-MoviePedia--React.git
cd Cinemate-MoviePedia--React
```

---

### 2. Install Node.js

Please ensure Node.js is installed. Download from [https://nodejs.org/en/](https://nodejs.org/en/).

---

### 3. Install Dependencies

Install all required packages listed in `package.json`:

```bash
npm install
```

---

### 4. Install TailwindCSS

[Official TailwindCSS Installation Guide](https://tailwindcss.com/docs/installation)

---

### 5. Install Flowbite (TailwindCSS UI Framework)

[Official Flowbite Quickstart](https://flowbite.com/docs/getting-started/quickstart/)

---

### 6. Install React Router

```bash
npm install react-router-dom
```

[React Router Documentation](https://reactrouter.com/en/main)

---

## API and Environment Variables

### 1. Get a TMDB API Key

- Register or log in at [https://www.themoviedb.org/](https://www.themoviedb.org/)
- Generate your API key here: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### 2. Configure the `.env` file

In your project root, add:

```
REACT_APP_API_KEY=your-tmdb-api-key-here
```

> Never commit your actual API key to a public repo!

### 3. TMDB API Resources

- [TMDB Official Docs](https://developer.themoviedb.org/docs)
- [Image URL Construction](https://developer.themoviedb.org/docs/image-basics)

---

## Scripts and Usage

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

### `npm test`

Launches the test runner in interactive watch mode.\
See about [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

---

### `npm run build`

Builds the app for production to the `build` folder.\
See about [deployment](https://facebook.github.io/create-react-app/docs/deployment).

---

### `npm run eject`

**Note:** This is a one-way operation. Once you `eject`, you can’t go back!

---

## Routing and Components

The application uses React Router to handle navigation between pages:

Example (in `App.js`):

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
```

---

### Example Components

**MovieCard.js**

```jsx
function MovieCard({ movie }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <h3 className="mt-2 font-bold">{movie.title}</h3>
      <p>Rating: {movie.vote_average}</p>
      {/* Link to details, genres, etc. */}
    </div>
  );
}
```

---

**API Fetch Example (api/tmdb.js)**

```js
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
}
```

---

## Learning and Examples

- **Component-based development:** Learn to break down your UI into modular, testable components.
- **API integration with Fetch/Axios:** Understand how to request and process external API data.
- **SPA Routing:** Seamless navigation between movie lists and individual movie detail pages.
- **Environment variables:** Securely manage sensitive keys.
- **TailwindCSS & Flowbite:** Rapidly build and style modern UIs.
- **Deployment:** Example config for Netlify deployment with `netlify.toml`.

---

## Conclusion

Cinemate MoviePedia is a modern, educational project designed to help you master React, RESTful APIs, and rapid UI development with TailwindCSS. Use this project as a base for your own movie apps, as a teaching resource, or as a learning playground for advanced React concepts.

---

## Keywords

`React`, `SPA`, `Movie App`, `TMDB`, `API Integration`, `TailwindCSS`, `Flowbite`, `Hooks`, `React Router`, `Component-based`, `Responsive Web App`, `Netlify Deployment`, `Environment Variables`, `Educational Project`, `Teaching Resource`

---

## Happy Coding! 🎬🍿

Thank you for exploring Cinemate MoviePedia. Contributions and feedback are welcome!

---
