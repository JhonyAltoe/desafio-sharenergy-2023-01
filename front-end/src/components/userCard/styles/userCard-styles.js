import { Typography, styled, Paper } from '@mui/material';

export const TitleCard = styled(Typography)(() => ({
  fontSize: '1.2rem',
  fontWeight: 500,
}));

export const BoxCard = styled(Paper)(({ theme }) => ({
  width: 280,
  margin: theme.spacing(1),
}));
