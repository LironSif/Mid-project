
import React from 'react';
import { useDrop } from 'react-dnd';
import { Paper } from '@mui/material';
import './ShelfCell.css'

const ShelfCell = ({ onDropItem }) => {
  const [{isOver}, dropRef] = useDrop(() => ({
    accept: 'MATERIAL_ITEM',
    drop: (item, monitor) => onDropItem(item.type),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Paper
      ref={dropRef}
      style={{backgroundColor: "transparent"}}
      className="shelfCellStyle"
    />
  );
};

export default ShelfCell;
