import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';

const StyledNavItem = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),

  borderRadius: theme.spacing(2),

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledNav = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const SubNav = styled(List)<{ component?: React.ElementType }>({
  width: '100%',
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export const AdminSubNav = ({
  title,
  items,
  open,
  onToggle,
}: {
  title: string;
  items: any[];
  open: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <SubNav component="nav" disablePadding>
      <Box
        sx={{
          bgcolor: open ? alpha(theme.palette.primary.light, 0.35) : null,
          py: open ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => onToggle()}
          sx={{
            px: 2,
            py: 1,
            // '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              fontSize: 16,
              fontWeight: 'medium',
              lineHeight: '20px',
              mb: 1,
            }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              // opacity: 0,
              transform: open ? 'rotate(-180deg)' : 'rotate(0)',
              transition: '0.2s',
            }}
          />
        </ListItemButton>

        <StyledNav>
          {open &&
            items.map(item => {
              const isActive = item.link && pathname?.startsWith(item.link);
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  style={{ color: 'inherit', width: '100%' }}
                  prefetch={false}
                >
                  <StyledNavItem
                    sx={{
                      backgroundColor: isActive
                        ? alpha(theme.palette.primary.dark, 0.7)
                        : undefined,
                    }}
                  >
                    <ListItemIcon>
                      <Icon height={24} icon={item.icon} />
                    </ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                  </StyledNavItem>
                </Link>
              );
            })}
        </StyledNav>
      </Box>
    </SubNav>
  );
};
