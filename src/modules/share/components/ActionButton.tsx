import { ListItemIcon, MenuItem, Tooltip } from '@mui/material';
import { Menu } from '@mui/material';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import { ListItemText } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const ActionButton = ({
  actions,
}: {
  actions: Array<{
    id: string;
    icon?: React.ReactNode;
    text: string;
    tooltip?: string;
    onClick: () => void;
  } | null>;
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
        {actions.map(action => {
          if (!action) {
            return <></>;
          }

          return (
            <MenuItem
              key={action.id}
              onClick={async () => {
                await action.onClick();
                handleClose();
              }}
            >
              <ListItemIcon>{action.icon}</ListItemIcon>
              <ListItemText>{action.text}</ListItemText>
              {action.tooltip ? (
                <Tooltip title={action.tooltip}>
                  <InfoIcon color="info" fontSize="small" sx={{ ml: 2 }} />
                </Tooltip>
              ) : null}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default ActionButton;
