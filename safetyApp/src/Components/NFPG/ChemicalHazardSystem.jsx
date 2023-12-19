import React, { useState } from "react";
import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { chemicals, hazardInformation } from "./ChemicalData.js";
import DiamondPart from "../DiamondParts/DiamondPart .jsx";


const ChemicalHazardSystem = ({ addCard }) => {
  const [chemicalData, setChemicalData] = useState({});
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const unNumber = "UN" + e.target.value.padStart(4, "0");
      const data = chemicals[unNumber];

      if (data) {
        setChemicalData(data);
      } else {
        setChemicalData({});
        alert("No data found for number " + e.target.value);
      }
    }
  };

  const handleAdd = () => {
    
    if (quantity > 0) {
      const newCardData = {
        ...chemicalData,
        quantity: quantity,
        id: chemicalData.Name,
      };
      addCard(newCardData);
      setOpen(false);
    } else {
      alert("Quantity must be greater than 0");
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: 2, gap: "20px" }}>
      <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: "bold", color: "#333" }}>
        Chemical Hazard Identification System
      </Typography>
      <TextField label="Enter UN number" variant="outlined" onKeyDown={handleSearch} sx={{ mb: 2, width: "50%" }} />
      <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "#333", fontWeight: "bold" }}>
        {chemicalData.Name || "No name available."}
      </Typography>
      <Paper sx={{ position: "relative", width: 250, height: 250, mt: 2, mb: 2 }} elevation={0}>
        <DiamondPart color="red" text={hazardInformation.FIRE_HAZARD[chemicalData.FIRE_HAZARD]} position={{ top: 0, left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
        <DiamondPart color="blue" text={hazardInformation.HEALTH_HAZARD[chemicalData.HEALTH_HAZARD]} position={{ left: 0, top: "50%", transform: "translateY(-50%) rotate(45deg)" }} />
        <DiamondPart color="yellow" text={hazardInformation.INSTABILITY[chemicalData.INSTABILITY]} position={{ right: 0, top: "50%", transform: "translateY(-50%) rotate(45deg)" }} />
        <DiamondPart color="white" text={chemicalData.SPECIFIC_HAZARD || 'N/A'} position={{ bottom: 0, left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
      </Paper>
      <Button style={{ backgroundColor: "#607ff0", color: "#FFF" }} variant="contained" onClick={() => setOpen(true)} sx={{ mx: 2 }}>
        Add to Warehouse
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">Enter Quantity</Typography>
          <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} fullWidth margin="normal" inputProps={{ min: 0, step: 1 }} />
          <Button onClick={handleAdd} variant="contained" sx={{ mt: 2 }}>Add to Warehouse</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChemicalHazardSystem;
