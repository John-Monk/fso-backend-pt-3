import React from 'react';

const Search = ({ handleSearch }) => {
  return (
    <>
      <label htmlFor="search">filter shown with</label>
      <input onChange={handleSearch} id="search" type="text" />
    </>
  );
};

export default Search;
