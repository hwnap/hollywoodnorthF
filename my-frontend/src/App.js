import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TireCard from './components/TireCard';
import AddTirePopup from './components/AddTirePopup';
import TireEditPopup from './components/TireEditPopup';
import TireViewPopup from './components/TireViewPopup';
import SearchPopup from './components/SearchPopup';
import SearchResultsPopup from './components/SearchResultsPopup';
import Grid from '@mui/material/Grid';

function App() {
  const [tires, setTires] = useState([]);
  const [selectedTire, setSelectedTire] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isResultsPopupOpen, setIsResultsPopupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearchParams, setLastSearchParams] = useState({});
  const [shouldRefreshSearch, setShouldRefreshSearch] = useState(false);

  useEffect(() => {
    fetchTires();
  }, []);

  const fetchTires = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/tires');
      setTires(response.data);
    } catch (error) {
      console.error('Error fetching tires:', error);
    }
  };

  const handleAddTire = async (tireData) => {
    try {
      await axios.post('http://localhost:4000/api/tires', tireData);
      fetchTires();  // Refresh the tire list
    } catch (error) {
      console.error('Error adding tire:', error);
    }
  };

  const handleEditTire = (tire) => {
    setSelectedTire(tire);
    setIsEditPopupOpen(true);
  };

  const handleSaveTire = async (editedTireData) => {
    try {
      if (!editedTireData._id) {
        console.error("Tire ID is undefined");
        return;
      }
      await axios.put(`http://localhost:4000/api/tires/${editedTireData._id}`, editedTireData);
      fetchTires();  // Refresh the tire list
      setIsEditPopupOpen(false);
      setShouldRefreshSearch(true);  // Indicate that search results should be refreshed
    } catch (error) {
      console.error('Error saving edited tire:', error);
    }
  };

  const handleViewTire = (tire) => {
    setSelectedTire(tire);
    setIsViewPopupOpen(true);
  };

  const handleSearch = async (searchParams) => {
    setLastSearchParams(searchParams);
    try {
      const response = await axios.get('http://localhost:4000/api/tires/search', { params: searchParams });
      setSearchResults(response.data);
      setIsResultsPopupOpen(true);
    } catch (error) {
      console.error('Error searching tires:', error);
    }
  };

  const refreshSearchResults = () => {
    if (shouldRefreshSearch && Object.keys(lastSearchParams).length !== 0) {
      handleSearch(lastSearchParams);
      setShouldRefreshSearch(false);
    }
  };

  return (
    <div>
      <Navbar
        onAddTire={() => setIsAddPopupOpen(true)}
        onSearchTire={() => setIsSearchPopupOpen(true)}
      />
      <AddTirePopup
        open={isAddPopupOpen}
        onClose={() => setIsAddPopupOpen(false)}
        onAddTire={handleAddTire}
      />
      <TireEditPopup
        open={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        tire={selectedTire}
        onSave={handleSaveTire}
      />
      <TireViewPopup
        open={isViewPopupOpen}
        onClose={() => setIsViewPopupOpen(false)}
        tire={selectedTire}
      />
      <SearchPopup
        open={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        onSearch={handleSearch}
      />
      <SearchResultsPopup
        open={isResultsPopupOpen}
        onClose={() => {
          setIsResultsPopupOpen(false);
          refreshSearchResults();
        }}
        searchResults={searchResults}
        onEdit={handleEditTire}
        onView={handleViewTire}
      />
      <Grid container spacing={2} style={{ padding: 20 }}>
        {tires.map((tire) => (
          <Grid item xs={12} sm={6} md={4} key={tire._id}>
            <TireCard
              tire={tire}
              onEdit={handleEditTire}
              onView={handleViewTire}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
