import { Tooltip } from '@mui/material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

export const ClassModBadge = () => {
  return (
    <Tooltip title="Người đại diện của lớp">
      <LocalPoliceIcon color="warning" />
    </Tooltip>
  );
};
