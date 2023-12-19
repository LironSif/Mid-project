
import React from 'react';
import { useDrag } from 'react-dnd';
import { Paper } from '@mui/material';
import "./MaterialItem.css"

const MaterialItem = ({ type, label }) => {
  const [{isDragging}, dragRef] = useDrag(() => ({
    type: 'MATERIAL_ITEM',
    item: { type },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper
    onClick={()=>console.log(label)}
     

      ref={dragRef}
      elevation={3}
      style={{
        padding: 10,
        margin: 5,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: type === 'water' ? 'lightblue' : 'lightgrey',
      }}
    >
      {label}
    </Paper>
  );
};

export default MaterialItem;
