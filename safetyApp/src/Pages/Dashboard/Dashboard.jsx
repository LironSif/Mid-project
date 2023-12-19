import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MaterialItem from "../../Components/Material/MaterialItem.jsx";
import Shelf from "../../Components/Shelf/Shelf.jsx";
import "./Dashboard.css";
import {useUserData} from "../../UserDataContext.jsx"

import { Box, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const [addedChemicals, setAddedChemicals] = useState([]);
  const {mockUserData} = useUserData()

  const handleRemove = (index) => {

  };
useEffect(() => {
  if(!mockUserData) return
  console.log(mockUserData.chemicals)

}, [mockUserData])
if(!mockUserData) return
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, mt: 4, mx: 4 }}>
        {/* <Typography variant="h4" sx={{ mb: 4 }}>
          Dashboard
        </Typography> */}

        {/* Parent Flex Container */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Section 1: Material Items */}
          <Paper
            sx={{
              height: "80vh",
              width: "30vw", 
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Material Items
            </Typography>
            <div className="materiel-list">
              {/* <MaterialItem type="water" label="Bottle of Water" />
              <MaterialItem type="powder" label="Box of Powder" /> */}
              {Object.values (mockUserData.chemicals).map((el, i) => {
                console.log("element",i)
                console.log(el)
                return(
                <div
                  onClick={() => handleRemove(i)}
                  key={i}
                  className="mateDiv"
                >
                  <MaterialItem type="powder" label={el.Name} />
                </div>
              )})}
            </div>
          </Paper>

          {/* Section 2: Shelf */}
          <Paper
            sx={{
              height: "80vh",
              flexGrow: 1, 
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2
            }}
          >
            <Shelf />
          </Paper>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Dashboard;
