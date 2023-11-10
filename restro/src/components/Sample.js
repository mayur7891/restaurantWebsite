import React, { useState,useEffect } from 'react'
import axios from 'axios';

const Sample = (props) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let timer;
  const handleSearch = async (query) => {
    try {
      const response = await axios.post('http://localhost:5000/api/search', { query: query });
      setSearchResults(response.data);
      props.sendDataToParent(response.data);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    } 
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // To avoid making too many requests while typing, use a delay (e.g., 300ms) before triggering the search.
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch(newQuery);
    }, 300);
  };




  return (
    <div className='search-menu'>
      <input type='text' className='search-bar' placeholder='Search by name...' value={query}
        onChange={handleChange}></input>
      <div className='search-icon'><i className="bi bi-search"></i></div>
    </div>
  )
}

export default Sample;