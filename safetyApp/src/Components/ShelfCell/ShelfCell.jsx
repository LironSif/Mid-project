import React from 'react';
import { useDrop } from 'react-dnd';
import { Paper, Typography, Box } from '@mui/material';
import './ShelfCell.css';
import GasIcon from "@mui/icons-material/Cloud";
import LiquidIcon from "@mui/icons-material/Opacity";
import SolidIcon from "@mui/icons-material/Drafts";

const ShelfCell = ({ cellId, content, onDropItem }) => {
  const [{isOver}, dropRef] = useDrop(() => ({
    accept: 'MATERIAL_ITEM',
    drop: (item, monitor) => {
      console.log("Dropped item:", item); 
      console.log(" content:", content); 
      onDropItem(item);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getItemIcon = (state) => {
    switch (state) {
      case 'Gas':
        return <GasIcon style={{ color: 'green' }} />;
      case 'Liquid':
        return <LiquidIcon style={{ color: 'blue' }} />;
      case 'Solid':
        return <SolidIcon style={{ color: 'black' }} />;
      default:
        return null;
    }
  };



  return (
    <Paper
      ref={dropRef}
      style={{ backgroundColor: isOver ? '#f5f5f5' : 'transparent' }}
      className="shelfCellStyle"
    >
      {content && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ color: 'black', fontWeight: 'bold' }}>name{content.label}</Typography>
          <Typography variant="caption" sx={{ color: 'black', fontWeight: 'bold' }}>Qty: {content.quantity}</Typography>
          {getItemIcon(content.state)}
        </Box>
      )}
    </Paper>
  );
};

export default ShelfCell;
