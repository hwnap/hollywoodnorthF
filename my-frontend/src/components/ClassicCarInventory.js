import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Alert,
  List,
  Divider,
  Paper,
  CardActions,
  Collapse,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import CategoryCreationFormDialog from "./CategoryCreationForm";
import FileCreationFormDialog from "./FileCreationForm";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import ClearIcon from "@mui/icons-material/Clear";

// Define the API endpoint URLs as variables
// const CAR_SEARCH_ENDPOINT = "http://localhost:4000/api/search";
// const FILE_SEARCH_ENDPOINT = "https://hw-backend.onrender.com/api/search";
const API_BASE_URL = "https://hwnapbackend.onrender.com/api";
// const API_BASE_URL = "http://localhost:4000/api";
const CAR_SEARCH_ENDPOINT = `${API_BASE_URL}/search`;
const CLASSIC_CARS_ENDPOINT = `${API_BASE_URL}/classic-cars`;

const RecipeReviewCard = ({ car, onRefresh }) => {
  //   console.log("Car data car id:", car);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);

  //   const handleOpenCategoryDialog = () => {
  //     setOpenCategoryDialog(true);
  //   };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  //   const handleOpenFileDialog = () => {
  //     setOpenFileDialog(true);
  //   };

  const handleCloseFileDialog = () => {
    setOpenFileDialog(false);
  };

  const handleOpenPopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedImage("");
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    // console.log("Car ID testing:", car.car._id); // Accessing the nested ID
    if (car && car.car && car.car._id) {
      localStorage.setItem("selectedCarId", car.car._id); // Storing the nested ID
    }
    setExpanded(!expanded);
  };
  const handleDeleteCar = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${CLASSIC_CARS_ENDPOINT}/${car.car._id}`);
        alert("Car deleted successfully!");
        onRefresh(); // Refresh the car list
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Failed to delete the car.");
      }
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
        alert("Category deleted successfully!");
        // You may want to refresh the categories after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete the category.");
      }
    }
  };
  const handleDeleteFile = async (fileId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (confirmDelete) {
      try {
        // Make an HTTP DELETE request to delete the file using the fileId
        await axios.delete(`${API_BASE_URL}/files/${fileId}`);
        alert("File deleted successfully!");
        // You can also refresh the file list if needed
      } catch (error) {
        console.error("Error deleting file:", error);
        alert("Failed to delete the file.");
      }
    }
  };

  const categories = Array.isArray(car.categories) ? car.categories : [];
  const files = Array.isArray(car.files) ? car.files : [];

  const isCarDataAvailable = car && car.car;

  return (
    <Card
      sx={{
        maxWidth: 400,
        marginBottom: 3,
        boxShadow: 5,
        marginLeft: 2, // Optional: Adding some shadow for better UI
      }}
    >
      {isCarDataAvailable && (
        <CardContent sx={{ paddingBottom: "16px" }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {car.car.name} {/* Car name in bold */}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {car.car.model} {/* Car model in regular font */}
          </Typography>
        </CardContent>
      )}
      <CardMedia
        component="img"
        sx={{
          height: 160,
          width: "auto",
          borderRadius: "8px",
          margin: "auto",
          display: "block",
        }}
        image={
          isCarDataAvailable && car.car.image
            ? car.car.image
            : "default_image_url"
        }
        alt={isCarDataAvailable && car.car.name ? car.car.name : "Car"}
      />

      <CardContent>
        <Typography variant="h5" component="div">
          {car.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {car.model}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="show more"
          onClick={handleExpandClick}
          sx={{ marginLeft: "auto" }}
        >
          <ExpandMoreIcon />
        </IconButton>
        <IconButton
          aria-label="delete car"
          onClick={handleDeleteCar}
          sx={{ color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {categories.length > 0 && (
            <>
              {categories.map((category) => (
                <div key={category._id}>
                  <Typography
                    paragraph
                    variant="subtitle1"
                    component="div"
                    marginBottom={1}
                    sx={{ fontWeight: "bold" }}
                  >
                    {category.name}:
                    <HighlightOffTwoToneIcon
                      onClick={() => handleDeleteCategory(category._id)}
                      style={{
                        color: "rgba(255, 0, 0, 0.5)",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    />
                  </Typography>
                  {files
                    .filter((file) => file.category === category._id)
                    .map((file) => (
                      <div key={file._id}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {file.name}:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {file.notes}
                        </Typography>
                        {file.pictureLinks.map((link, index) => (
                          <IconButton
                            key={index}
                            onClick={() => handleOpenPopup(link)}
                          >
                            <img
                              src={link}
                              alt={`File ${index + 1}`}
                              style={{ width: 30, height: 30 }}
                            />
                          </IconButton>
                        ))}
                        <IconButton
                          onClick={() => handleDeleteFile(file._id)}
                          style={{ color: "red", cursor: "pointer" }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </div>
                    ))}
                </div>
              ))}
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <CategoryCreationFormDialog
              open={openCategoryDialog}
              onClose={handleCloseCategoryDialog}
              onSuccess={() => {
                handleCloseCategoryDialog();
                onRefresh(); // Use onRefresh (fetchCarData) after category creation
              }}
            />
            <FileCreationFormDialog
              open={openFileDialog}
              onClose={handleCloseFileDialog}
              categories={categories}
              onSuccess={() => {
                handleCloseFileDialog();
                onRefresh();
                // Use onRefresh (fetchCarData) after file creation
              }}
            />
          </div>
        </CardContent>
      </Collapse>

      {/* <CategoryCreationFormDialog
        open={openCategoryDialog}
        onClose={handleCloseCategoryDialog}
        onSuccess={car.onRefresh} // Assuming onRefresh is passed as a prop
      />
      <FileCreationFormDialog
        open={openFileDialog}
        onClose={handleCloseFileDialog}
        categories={categories}
        onSuccess={car.onRefresh}
      /> */}
      {/* Popup Dialog for Image Display */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Selected File"
            style={{ maxWidth: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

const ClassicCarInventory = ({ open, onClose }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCars, setSearchCars] = useState(true);
  //   const [searchFiles, setSearchFiles] = useState(false);
  const [newCar, setNewCar] = useState({
    name: "",
    model: "",
    image: "",
  });
  const fetchCarData = useCallback(async () => {
    try {
      let results = [];

      // Fetching car data
      const carResponse = await axios.get(
        `${CAR_SEARCH_ENDPOINT}?term=${searchTerm}`
      );
      results = results.concat(carResponse.data.cars);

      // Fetching file data
      //   const fileResponse = await axios.get(
      //     `${FILE_SEARCH_ENDPOINT}?term=${searchTerm}`
      //   );
      //   results = results.concat(fileResponse.data.files);

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [searchTerm]);

  useEffect(() => {
    return () => {
      fetchCarData();
      localStorage.removeItem("selectedCarId");
    };
  }, [fetchCarData, searchTerm]);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setNewCar({ name: "", model: "", image: "" });
  };

  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
    setSearchTerm("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewCar({
      ...newCar,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCarData = {
      name: newCar.name,
      model: newCar.model,
      image: newCar.image,
      owner: "659d68f79959230402099862",
    };

    axios
      .post(CLASSIC_CARS_ENDPOINT, newCarData)
      .then((response) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error creating car:", error);
        setShowAlert(true);
      });
  };

  const handleSearch = async () => {
    try {
      let searchResults = [];

      if (searchCars) {
        const carResponse = await axios.get(
          `${CAR_SEARCH_ENDPOINT}?term=${searchTerm}`
        );
        searchResults = searchResults.concat(carResponse.data.cars);
      }

      //   if (searchFiles) {
      //     const fileResponse = await axios.get(
      //       `${FILE_SEARCH_ENDPOINT}?term=${searchTerm}`
      //     );
      //     searchResults = searchResults.concat(fileResponse.data.files);
      //   }

      setSearchResults(searchResults);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Classic Car Inventory</DialogTitle>
      <DialogContent>
        {showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Listing created successfully!
          </Alert>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="primary"
            aria-label="add"
            onClick={toggleCreateForm}
            sx={{ color: "#FD6A02" }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="search"
            onClick={toggleSearchForm}
            sx={{ color: "#FD6A02" }}
          >
            <SearchIcon />
          </IconButton>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <Paper
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={newCar.name}
                onChange={handleFormChange}
                required
                fullWidth
              />
              <TextField
                label="Model"
                name="model"
                value={newCar.model}
                onChange={handleFormChange}
                required
                fullWidth
                style={{ marginTop: "10px" }}
              />
              <TextField
                label="Image URL"
                name="image"
                value={newCar.image}
                onChange={handleFormChange}
                required
                fullWidth
                style={{ marginTop: "10px" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
                sx={{ color: "white", backgroundColor: "#FD6A02" }}
              >
                Create Listing
              </Button>
            </form>
          </Paper>
        )}

        {/* Search Form */}
        {showSearchForm && (
          <Paper
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div>
              <TextField
                label="Search Car Inventory"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                style={{ marginBottom: "10px" }}
              />

              <FormControl component="fieldset" fullWidth>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchCars}
                        onChange={() => setSearchCars(!searchCars)}
                        name="searchCars"
                        iconstyle={{ color: "black" }} // Color for the unchecked state
                        checkediconstyle={{ color: "#FD6A02" }} // Color for the checked state (orange)
                      />
                    }
                    label="Cars"
                  />

                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchFiles}
                        onChange={() => setSearchFiles(!searchFiles)}
                        name="searchFiles"
                      />
                    }
                    label="Files"
                  /> */}
                </FormGroup>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ color: "white", backgroundColor: "#FD6A02" }}
              >
                Search
              </Button>
            </div>
          </Paper>
        )}

        {searchResults.length > 0 && (
          <List>
            {searchResults.map((car, index) => (
              <div key={index}>
                <RecipeReviewCard car={car} onRefresh={fetchCarData} />
                {index < searchResults.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassicCarInventory;
