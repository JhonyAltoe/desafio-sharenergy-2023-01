import {
  Container, styled, Box, CircularProgress,
} from '@mui/material';

export const CustonContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: 0,
}));

export const Sentinel = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  height: 100,
}));

export const CustonCircularProgress = styled(CircularProgress)(() => ({
  animationDuration: '400ms',
}));
