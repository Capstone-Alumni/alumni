import { ReactNode } from 'react';
// material
import { Box, Typography } from '@mui/material';
//

// ----------------------------------------------------------------------

interface HeaderBreadcrumbsProps {
  action?: ReactNode;
  heading: string;
  moreLink?: string | string[];
}

export default function HeaderBreadcrumbs({
  action,
  heading,
  moreLink = '' || [],
}: HeaderBreadcrumbsProps) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
