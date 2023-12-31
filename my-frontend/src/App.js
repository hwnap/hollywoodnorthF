import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import SearchPopup from './components/SearchPopup';
import SearchResultsPopup from './components/SearchResultsPopup';

function App() {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isResultsPopupOpen, setIsResultsPopupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // Define the searchResults state

  const handleSearch = async (searchParams) => {
    try {
      const response = await axios.get('http://localhost:4000/api/tires/search', { params: searchParams });
      setSearchResults(response.data);
      setIsResultsPopupOpen(true); // Open the results popup
    } catch (error) {
      console.error('Error searching tires:', error);
    }
  };

  return (
    <div>
      <Navbar
        onAddTire={() => {}}
        onSearchTire={() => setIsSearchPopupOpen(true)}
      />
      <SearchPopup
        open={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        onSearch={handleSearch}
      />
      <SearchResultsPopup
        open={isResultsPopupOpen}
        onClose={() => setIsResultsPopupOpen(false)}
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
