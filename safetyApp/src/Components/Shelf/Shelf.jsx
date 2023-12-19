import React, { useState } from "react";
import ShelfCell from "../ShelfCell/ShelfCell.jsx";
import "./Shh.css"

const Shelf = () => {
  // State to track each cell's content
  const [cellContents, setCellContents] = useState(Array(12).fill(null));

  const handleDrop = (cellId, item) => {

    console.log(" item:", item); 
    const newCellContents = [...cellContents];
    newCellContents[cellId] = item;
    setCellContents(newCellContents);
    console.log(item)
  };

  return (
    <div className="grid-div">
      <div className="grid-div-shelf">
        {cellContents.map((content, index) => (
          <ShelfCell
            key={index}
            cellId={index}
            content={content}
            onDropItem={(item) => handleDrop(index, item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Shelf;
