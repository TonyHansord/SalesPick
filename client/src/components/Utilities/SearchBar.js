import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ type, searchOptions }) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log(search);
  };

  const renderSearchOptions = () => {
    return searchOptions.map((option) => {
      return <option value={option}>{option}</option>;
    });
  };

  return (
    <div className="search-bar">
      <select>{renderSearchOptions()}</select>
      <input
        type="text"
        value={search}
        placeholder={`Search ${type}`}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
