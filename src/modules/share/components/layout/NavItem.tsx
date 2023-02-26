import { styled } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MuiNavItem = styled('div')(({ theme }) => ({
  // color: alpha(theme.palette.common.black, 0.65),
  fontWeight: 600,
  '&:hover': {
    // color: alpha(theme.palette.primary.main, 0.85),
    '&::before': {
      width: '2rem',
    },
  },
  '&::before': {
    transition: '300ms',
    height: '3px',
    content: '""',
    position: 'absolute',
    backgroundColor: theme.palette.primary.light,
    width: '0%',
    bottom: '12px',
  },
  '&.active': {
    // color: alpha(theme.palette.primary.main, 0.85),
    '&::before': {
      width: '3rem',
    },
  },
}));

export const NavItem = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname() ?? 'noName';

  let pathnameShorter = pathname.slice(0, pathname.indexOf('/', 1));

  if (pathnameShorter === '') {
    pathnameShorter = 'noName';
  }

  return (
    <Link href={href} style={{ color: 'inherit' }}>
      <MuiNavItem className={href?.includes(pathnameShorter) ? 'active' : ''}>
        {label}
      </MuiNavItem>
    </Link>
  );
};
