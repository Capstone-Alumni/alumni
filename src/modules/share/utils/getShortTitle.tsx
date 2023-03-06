import { Tooltip } from '@mui/material';

export const getShortTitle = (title: string) => {
  if (title.length > 60) {
    const shortTitle = `${title.substring(0, 60)}...`;
    return (
      <Tooltip title={title}>
        <>{shortTitle}</>
      </Tooltip>
    );
  }
  return title;
};
