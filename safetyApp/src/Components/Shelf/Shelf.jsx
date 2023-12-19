import React from "react";
import ShelfCell from "../ShelfCell/ShelfCell.jsx";
import "./shelf.css";

const Shelf = () => {
  const handleDrop = (cellId, state) => {
    console.log(`Item of type ${state} dropped in cell ${cellId}`);
  };
  return (
    <div className="grid-div">
      <div className="grid-div-shelf">
        {Array.from({ length: 12 }).map((_, index) => (
          <ShelfCell key={index} cellId={index} onDropItem={handleDrop} />
        ))}
      </div>
    </div>
  );
};

export default Shelf;
