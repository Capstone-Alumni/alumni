'use client';
import { styled } from '@mui/material';

export const StyledIconWrapperRedShadow = styled('div')(() => ({
  cursor: 'pointer',
  minHeight: '30px',
  hight: '30px',
  minWidth: '30px',
  width: '30px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 16px 0 rgba(255, 72, 66, 0.24)',
}));

export const StyledIconWrapperMainShadow = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  minHeight: '30px',
  hight: '30px',
  minWidth: '30px',
  width: '30px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 8px 16px 0 ${theme.palette.primary.lighter}`,
}));

export const StyledBoxFlex = styled('div')(({ theme }) => ({
  gap: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
