import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch(`http://localhost:3000/search/${value}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Error fetching data:", response.statusText);
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
          placeholder="Search for users..."
          autoComplete="off"
        />
        <button id="search-bar-btn" onClick={onSearch}>
          SEARCH
        </button>
      </div>
      <div className="dropdown">
        {query && searchResults.length > 0 && (
          <ul>
            {searchResults
              .map((user: any) => (
                <li
                  onClick={() => setQuery(user.username)}
                  key={`${user.username}-search-result`}
                >
                  {user.username}
                </li>
              ))
              .slice(0, 10)}
          </ul>
        )}
      </div>
    </div>
  );
}
