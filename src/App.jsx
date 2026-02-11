import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Any");
  const [safeMode, setSafeMode] = useState(true);
  const [theme, setTheme] = useState("light");
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const categories = [
    "Any",
    "Programming",
    "Misc",
    "Pun",
    "Spooky",
    "Christmas",
    "Dark",
  ];

  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("jokeCreatorRecentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (err) {
        setRecentSearches([]);
      }
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("jokeCreatorTheme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("jokeCreatorTheme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      "jokeCreatorRecentSearches",
      JSON.stringify(recentSearches),
    );
  }, [recentSearches]);

  function addRecentSearch(searchData) {
    const trimmedTopic = searchData.topic.trim();
    const search = {
      topic: trimmedTopic,
      category: searchData.category,
      safeMode: searchData.safeMode,
      id: `${trimmedTopic}-${searchData.category}-${searchData.safeMode}-${Date.now()}`,
    };

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) =>
          !(
            item.topic === search.topic &&
            item.category === search.category &&
            item.safeMode === search.safeMode
          ),
      );
      return [search, ...filtered].slice(0, 6);
    });
  }

  function applyRecentSearch(item) {
    setTopic(item.topic);
    setCategory(item.category);
    setSafeMode(item.safeMode);
    getJokeFor(item);
  }

  async function getJokeFor(item) {
    setIsLoading(true);
    setError("");

    try {
      const query = item.topic.trim();
      const params = [];
      if (query) {
        params.push(`contains=${encodeURIComponent(query)}`);
      }
      if (item.safeMode) {
        params.push("safe-mode");
      }

      const baseUrl = `https://v2.jokeapi.dev/joke/${encodeURIComponent(
        item.category,
      )}`;
      const url = params.length ? `${baseUrl}?${params.join("&")}` : baseUrl;

      const response = await axios.get(url);
      if (response.data?.error) {
        setError("No jokes found for that topic. Try another keyword.");
        setJoke(null);
      } else {
        setJoke(response.data);
        addRecentSearch(item);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setJoke(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function getJoke() {
    setIsLoading(true);
    setError("");

    try {
      const query = topic.trim();
      const params = [];
      if (query) {
        params.push(`contains=${encodeURIComponent(query)}`);
      }
      if (safeMode) {
        params.push("safe-mode");
      }

      const baseUrl = `https://v2.jokeapi.dev/joke/${encodeURIComponent(category)}`;
      const url = params.length ? `${baseUrl}?${params.join("&")}` : baseUrl;

      const response = await axios.get(url);
      if (response.data?.error) {
        setError("No jokes found for that topic. Try another keyword.");
        setJoke(null);
      } else {
        setJoke(response.data);
        addRecentSearch({ topic, category, safeMode });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setJoke(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo-container">
            <div className="logo-emoji">😂</div>
            <div className="logo-text">
              <p className="eyebrow">Joke Generator</p>
              <h1>JokeCreator</h1>
            </div>
          </div>
          <p className="subtitle">
            Type a topic and get a joke tailored to it. Keep it fun and light!
          </p>
        </header>

        <div className="card">
          <div className="input-section">
            <label className="label" htmlFor="topic-input">
              <span className="label-icon">🔍</span>
              Topic
            </label>
            <div className="input-row">
              <input
                id="topic-input"
                className="input"
                type="text"
                placeholder="e.g., coding, cats, space"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getJoke();
                  }
                }}
              />
              <button
                className="primary-button"
                onClick={getJoke}
                disabled={isLoading}
              >
                <span className="button-icon">{isLoading ? "⏳" : "🎲"}</span>
                {isLoading ? "Fetching..." : "Get Joke"}
              </button>
            </div>
          </div>
          <div className="controls">
            <div className="control-group">
              <label className="label" htmlFor="category-select">
                <span className="label-icon">📂</span>
                Category
              </label>
              <select
                id="category-select"
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="control-group">
              <label className="label" htmlFor="theme-select">
                <span className="label-icon">🎨</span>
                Theme
              </label>
              <select
                id="theme-select"
                className="select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {themes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="control-group">
              <span className="label">
                <span className="label-icon">🛡️</span>
                Safe mode
              </span>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={safeMode}
                  onChange={(e) => setSafeMode(e.target.checked)}
                />
                <span className="slider" />
              </label>
              <span className="helper small">Filters explicit jokes.</span>
            </div>
          </div>
          <p className="helper">
            Leave blank to get a surprise joke from the selected category.
          </p>

          {recentSearches.length > 0 && (
            <div className="history">
              <div className="history-header">
                <h2>
                  <span className="history-icon">🕒</span>
                  Recent searches
                </h2>
                <button
                  className="link-button"
                  type="button"
                  onClick={() => setRecentSearches([])}
                >
                  Clear all
                </button>
              </div>
              <div className="history-list">
                {recentSearches.map((item) => (
                  <button
                    key={item.id}
                    className="history-item"
                    type="button"
                    onClick={() => applyRecentSearch(item)}
                  >
                    <span className="history-topic">
                      {item.topic || "🎲 Surprise"}
                    </span>
                    <span className="history-meta">
                      {item.category} • {item.safeMode ? "🛡️ Safe" : "⚡ All"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {joke && !error && (
            <div className="joke-box">
              <div className="joke-header">
                <span className="pill">{joke.category || "Any"}</span>
                {topic.trim() && (
                  <span className="pill ghost">🔍 {topic.trim()}</span>
                )}
                {safeMode && <span className="pill ghost">🛡️ Safe</span>}
              </div>
              <div className="joke-content">
                {joke.type === "single" ? (
                  <p className="joke-text">{joke.joke}</p>
                ) : (
                  <div className="joke-text">
                    <p className="setup">{joke.setup}</p>
                    <p className="punchline">{joke.delivery}</p>
                  </div>
                )}
              </div>
              <div className="joke-footer">
                <span className="joke-id">ID: {joke.id}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
