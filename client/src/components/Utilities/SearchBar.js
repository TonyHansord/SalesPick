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
    setSearchResults(data)
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
    return searchOptions.map((option, index) => {
      return (
        <option key={index} value={option.title}>
          {option.title}
        </option>
      );
    });
  };

  return (
    <div className="search-bar">
      {!hasNoTitle ? <h3>Filter {type}</h3> : null}

      <select onChange={handleSearchTypeChange}>{renderSearchOptions()}</select>

      {searchOption.controlType === 'select' ? (
        <select onChange={(e) => setSearch(e.target.value)}>
          <option value=""></option>
          {searchOption.options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          type={searchOption.type}
          value={search}
          placeholder={`Filter ${type} by ${searchOption.title}`}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
