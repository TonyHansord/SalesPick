import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({
  type,
  searchOptions,
  setSearchResults,
  data,
  hasNoTitle,
}) {
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState(searchOptions[0]);

  const handleSearch = () => {
    const searchKey = searchOption.key;

    const results = data.filter((item) => {
      if (searchKey === 'id') {
        return item[searchKey] === parseInt(search);
      } else {
        return item[searchKey].includes(search);
      }
    });
    console.log(results);
    setSearchResults(results);
  };

  const handleSearchTypeChange = (e) => {
    console.log(e.target.value);

    const option = searchOptions.find(
      (option) => option.title === e.target.value
    );

    setSearchOption(option);
  };

  const renderSearchOptions = () => {
    return searchOptions.map((option) => {
      return (
        <option key={option.key} value={option.title}>
          {option.title}
        </option>
      );
    });
  };

  return (
    <div className="search-bar">
      {!hasNoTitle ? <h3>Search {type}</h3> : null}

      <select onChange={handleSearchTypeChange}>{renderSearchOptions()}</select>
      <input
        type={searchOption.type}
        value={search}
        placeholder={`Search ${type} by ${searchOption.title}`}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
