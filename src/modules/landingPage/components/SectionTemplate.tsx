'use client';

import { Box, Container, useTheme, styled } from '@mui/material';

const StyledHeaderSectionBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  position: 'relative',
  justifyContent: 'center',
  gap: '1rem',
  borderBottom: '2px solid rgb(42, 45, 52)',
  margin: '2rem 0',
  '&:before': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '-50px',
    height: '2px',
    width: '40px',
    backgroundColor: 'rgb(42, 45, 52)',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    right: '-50px',
    height: '2px',
    width: '40px',
    backgroundColor: 'rgb(42, 45, 52)',
  },
}));
const StyledFooterSectionBox = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: '2rem',
  gap: '3rem',
  width: '100%',
  alignItems: 'center',
}));

const StyledLine = styled('div')(({ theme }) => ({
  height: '2px',
  width: '100%',
  backgroundColor: 'rgb(230, 235, 245)',
}));

const SectionTemplate = ({
  svgLeft,
  svgRight,
  children,
  footer = true,
  headerContent,
  switchSvg,
}: {
  svgLeft?: string;
  svgRight?: string;
  footer?: boolean;
  headerContent: React.ReactNode;
  children: React.ReactNode;
  switchSvg?: boolean;
}) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          paddingX: theme.spacing(2),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(4),
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: theme.spacing(2),
              margin: 'auto',
            }}
          >
            <StyledHeaderSectionBox>
              {switchSvg ? (
                <>
                  <img
                    src={svgRight ? svgRight : `./heading-img-1-right.svg`}
                  />
                  {headerContent}
                  <img src={svgLeft ? svgLeft : `./heading-img-1-left.svg`} />
                </>
              ) : (
                <>
                  <img src={svgLeft ? svgLeft : `./heading-img-1-left.svg`} />
                  {headerContent}
                  <img
                    src={svgRight ? svgRight : `./heading-img-1-right.svg`}
                  />
                </>
              )}
            </StyledHeaderSectionBox>
            {children}
          </Box>
        </Container>
      </Box>
      {footer && (
        <StyledFooterSectionBox>
          <StyledLine />
        </StyledFooterSectionBox>
      )}
    </>
  );
};

export default SectionTemplate;
