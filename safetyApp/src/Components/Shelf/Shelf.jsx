import React, { useState, useEffect, useCallback } from "react";
import ShelfCell from "../ShelfCell/ShelfCell.jsx";
import "./Shh.css";
import { Grid } from '@mui/material';

const Shelf = () => {
    const [cellContents, setCellContents] = useState([...Array(8).fill(null)]);


    const handleDrop = useCallback((cellId, item) => {
      const newCellContents = [...cellContents];
      newCellContents[cellId] = item;
      setCellContents(newCellContents);
      console.log("handle drop activated");
  }, [cellContents]);
  

    return (
        <div className="grid-div">
            <Grid container spacing={2}>
                {cellContents.map((content, index) => (
                    <Grid item xs={6} key={index}>
                        <ShelfCell
                            cellId={index}
                            content={content}
                            onDropItem={(item) => handleDrop(index, item)}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Shelf;
