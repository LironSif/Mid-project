import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Paper,
  Typography,
  Slider,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FlameIcon from "@mui/icons-material/Whatshot";
import CorrosiveIcon from "@mui/icons-material/Warning";
import OxidizerIcon from "@mui/icons-material/AcUnit";
import GasIcon from "@mui/icons-material/Cloud"; 
import LiquidIcon from "@mui/icons-material/Opacity";
import SolidIcon from "@mui/icons-material/Drafts";
import MaterialItem from "../../Components/Material/MaterialItem.jsx";
import Shelf from "../../Components/Shelf/Shelf.jsx";
import { useUserData } from "../../UserDataContext.jsx";
import CircularGauge from "../../Components/Gauge/CircularGauge.jsx";
import { useTheme, useMediaQuery } from '@mui/material';


const Dashboard = () => {

  const [cards, setCards] = useState({});
  const [numberOfShelves, setNumberOfShelves] = useState(1);
  const [currentShelfIndex, setCurrentShelfIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { mockUserData, updateApiUserChemicals, updateShelfConfig } =
    useUserData();
  const chemicalsArray = mockUserData
    ? Object.values(mockUserData.chemicals)
    : [];

  const shelfCapacity = 12;
  const maxChemicals = numberOfShelves * shelfCapacity;

  const totalChemicals = chemicalsArray.length;
  const flammableCount = chemicalsArray.filter((c) => c.FLAMMABLE).length;
  const corrosiveCount = chemicalsArray.filter((c) => c.CORROSIVE).length;
  const oxidizerCount = chemicalsArray.filter((c) => c.OXIDIZER).length;

  useEffect(() => {
    if (!mockUserData) return;
    console.log("Chemicals in mockUserData:", mockUserData.chemicals); // Debugging
    setCards(mockUserData.chemicals);
  }, [mockUserData]);

  useEffect(() => {
    console.log("Modal open state changed:", isModalOpen);
  }, [isModalOpen]);

  const handleRemove = (chemicalId) => {
    // Logic to remove a chemical and update quantities accordingly
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDrop = (item) => {
    console.log("Dropped item:", item);
    setCurrentItem(item);
    console.log("setCurrentItem :", item);
    setIsModalOpen(true);
    console.log("Is Modal Open:", isModalOpen);
  };

  const handleModalSubmit = (selectedQuantity) => {
    if (selectedQuantity > currentItem.quantity) {
      alert("Not enough quantity available");
      return;
    }

    // Update the quantity in mockUserData chemicals
    let updatedChemicals = { ...mockUserData.chemicals };
    updatedChemicals[currentItem.id].quantity -= selectedQuantity;

    // Update the shelf configuration
    updateShelfConfig(
      `shelf-${currentShelfIndex}`,
      currentItem.Name,
      selectedQuantity
    );

    // Update the entire mockUserData and synchronize with the backend
    let updatedMockUserData = {
      ...mockUserData,
      chemicals: updatedChemicals,
    };

    updateApiUserChemicals(updatedMockUserData);
    setIsModalOpen(false);
    setCurrentItem(null); // Reset the currentItem
  };

  const handleShelfChange = (event, newValue) => {
    console.log("handleShelfChange func exe");
    setNumberOfShelves(newValue);
    setCurrentShelfIndex(0);
  };

  const nextShelf = () => {
    setCurrentShelfIndex((prevIndex) =>
      prevIndex < numberOfShelves - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const previousShelf = () => {
    setCurrentShelfIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const renderChemicalRules = (chemical) => {
    let rules = [];

    if (chemical.FLAMMABLE) {
      rules.push({
        text: "Flammable material in the Warehouse",
        icon: <FlameIcon style={{ color: "#FF0000" }} />,
      });
    }
    if (chemical.CORROSIVE) {
      rules.push({
        text: "Corrosive material",
        icon: <CorrosiveIcon style={{ color: "orange" }} />,
      });
    }
    if (chemical.OXIDIZER) {
      rules.push({
        text: "Oxidizer material",
        icon: <OxidizerIcon style={{ color: "blue" }} />,
      });
    }

    switch (chemical.STATE) {
      case "Gas":
        rules.push({
          text: "Material is in gaseous state",
          icon: <GasIcon style={{ color: "green" }} />,
        });
        break;
      case "Liquid":
        rules.push({
          text: "Material is in Liquid state",
          icon: <LiquidIcon style={{ color: "blue" }} />,
        });
        break;
      case "Solid":
        rules.push({
          text: "Material is in Solid state",
          icon: <SolidIcon style={{ color: "black" }} />,
        });
        break;
      default:
        break;
    }

    return rules;
  };

  const renderStorageRecommendations = (chemical) => {
    let recommendations = [];

    if (chemical.STATE === "Gas") {
      recommendations.push("Store above solids and liquids");
    } else if (chemical.STATE === "Solid") {
      recommendations.push("Store above liquids");
    }

    if (chemical.FLAMMABLE || chemical.CORROSIVE) {
      recommendations.push("Do not store next to oxidizers");
    }

    return recommendations.join(", ");
  };

  useEffect(() => {
    if (!mockUserData) return;
    console.log(mockUserData.chemicals);
  }, [mockUserData]);


  if (!mockUserData) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, mt: 8, mx: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Typography color="primary.dark" variant="h2">
            Dashboard Overview
          </Typography>
        </Box>

        {/* Gauges */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            mb: 4,
          }}
        >
          <CircularGauge
            label="Total Chemicals"
            value={totalChemicals}
            max={maxChemicals}
          />
          <CircularGauge
            label="Flammable"
            value={flammableCount}
            max={maxChemicals}
          />
          <CircularGauge
            label="Corrosive"
            value={corrosiveCount}
            max={maxChemicals}
          />
          <CircularGauge
            label="Oxidizers"
            value={oxidizerCount}
            max={maxChemicals}
          />
        </Box>

        {/* Section 2: OSH Rules for Hazardous Material */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            alignItems: "flex-start",
            mb: 10,
            mt: 10,
          }}
        >
          <Typography variant="h4">
            Hazardous Material Storage Recommendations
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              alignItems: "flex-start",
              mb: 5,
            }}
          >
            {Object.values(mockUserData.chemicals).map((chemical, i) => (
              <Card
                key={`card-${i}`}
                sx={{ width: "auto%", height: "auto", mb: 2 }}
              >
                <CardContent>
                  <Typography variant="h6">{chemical.Name}</Typography>
                  <List>
                    {renderChemicalRules(chemical).map((rule, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>{rule.icon}</ListItemIcon>
                        <ListItemText primary={rule.text} />
                      </ListItem>
                    ))}
                    <ListItem>
                      <ListItemText
                        primary={renderStorageRecommendations(chemical)}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Combined Section 3 and 4: Material Items and Shelves */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Material organizer
          </Typography>
          <Box
            sx={{ display: "flex",flexDirection: isSmallScreen ? 'column' : 'row',justifyContent: "space-between", gap: 2 }}
          >
            <div className="material-list">
              {Object.values(mockUserData.chemicals).map((el, i) => (
                <div
                  onClick={() => handleRemove(i)}
                  key={i}
                  className="mateDiv"
                >
                  <MaterialItem
                    type={el.Name}
                    label={el.Name}
                    state={el.STATE}
                    quantity={el.quantity}
                  />
                </div>
              ))}
            </div>

            {/* Shelves with Slider and Carousel */}
            <Paper
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Typography color="primary.dark" variant="h6">
                {" "}
                Number of Shelves{" "}
              </Typography>
              <Slider
                value={numberOfShelves}
                onChange={handleShelfChange}
                aria-labelledby="number-of-shelves-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                sx={{ width: "50%" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={previousShelf}
                  disabled={currentShelfIndex === 0}
                >
                  Previous
                </Button>
                <Typography color="primary.dark" variant="subtitle1">
                  Current Shelf: {currentShelfIndex + 1}
                </Typography>
                <Button
                  onClick={nextShelf}
                  disabled={currentShelfIndex === numberOfShelves - 1}
                >
                  Next
                </Button>
              </Box>
              <Shelf
                key={`shelf-${currentShelfIndex}`}
                id={`shelf-${currentShelfIndex}`}
                onDropItem={handleDrop}
              />
            </Paper>
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Dashboard;
