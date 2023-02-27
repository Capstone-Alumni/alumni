import { ListItemIcon, MenuItem } from '@mui/material';
import { Menu } from '@mui/material';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import { ListItemText } from '@mui/material';

const ActionButton = ({
  actions,
}: {
  actions: Array<{
    id: string;
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
  }>;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {actions.map(action => (
          <MenuItem
            key={action.id}
            onClick={async () => {
              await action.onClick();
              handleClose();
            }}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText>{action.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionButton;
