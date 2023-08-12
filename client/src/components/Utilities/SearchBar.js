import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ type, searchOptions }) {
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState(searchOptions[0].title);
  const [searchType, setSearchType] = useState(searchOptions[0].type);

  const handleSearch = () => {
    console.log(search);
  };

  const handleSearchTypeChange = (e) => {
    setSearchOption(e.target.value);
    setSearchType(
      searchOptions.find((option) => option.title === e.target.value).type
    );
  };

  const renderSearchOptions = () => {
    return searchOptions.map((option) => {
      return (
        <option key={option.title} value={option.title}>
          {option.title}
        </option>
      );
    });
  };

  return (
    <div className="search-bar">
      <h3>Search {type}</h3>
      <select onChange={handleSearchTypeChange}>{renderSearchOptions()}</select>
      <input
        type={searchType}
        value={search}
        placeholder={`Search ${type} by ${searchOption}`}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
