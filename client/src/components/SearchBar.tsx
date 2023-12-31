import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../API";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const onTextChange = async (value: string) => {
    setQuery(value);
    try {
      if (value === "") {
        setSearchResults([]);
      } else {
        const { ok, data } = await makeRequest(`/search/${value}`, "GET");

        if (ok) {
          setSearchResults(data);
        } else {
          console.error("Error fetching data:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSearch = () => {
    navigate(`/users/${query}`);
  };

  return (
    <div className="search-bar-container">
      <div className="search-inner">
        <input
          type="text"
          id="search-bar-textbox"
          value={query}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          placeholder="Search for users..."
          autoComplete="off"
        />
        <button id="search-bar-btn" onClick={onSearch}>
          SEARCH
        </button>
      </div>
      <div className="dropdown">
        {query && searchResults.length > 0 && (
          <>
            <h2>Search Results:</h2>
            {searchResults
              .map((username: string) => (
                <h3
                  onClick={() => setQuery(username)}
                  className="search-result"
                  key={`${username}-search-result`}
                >
                  {username}
                </h3>
              ))
              .slice(0, 10)}
          </>
        )}
      </div>
    </div>
  );
}
