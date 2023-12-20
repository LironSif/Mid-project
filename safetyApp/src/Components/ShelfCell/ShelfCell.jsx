import React from 'react';
import { useDrop } from 'react-dnd';
import { Paper, Typography, Box } from '@mui/material';
import GasIcon from "@mui/icons-material/Cloud";
import LiquidIcon from "@mui/icons-material/Opacity";
import SolidIcon from "@mui/icons-material/Drafts";
import './ShelfCell.css';

const ShelfCell = React.memo(({ cellId, content, onDropItem }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'MATERIAL_ITEM',
        drop: (item) => onDropItem(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const getItemIcon = (state) => {
      switch (state) {
        case 'Gas':
          return <GasIcon style={{ color: "green", fontSize: '2rem' }} />;
        case 'Liquid':
          return <LiquidIcon style={{ color: "blue", fontSize: '2rem' }} />;
        case 'Solid':
          return <SolidIcon style={{ color: "black", fontSize: '2rem' }} />;
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
                    {getItemIcon(content.state)}
                    <Typography variant="subtitle1" sx={{ color: 'purple', fontWeight: 'bold' }}>
                        {content.type}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
});

export default ShelfCell;
