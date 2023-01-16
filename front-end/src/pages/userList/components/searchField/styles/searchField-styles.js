import { Container, styled, TextField } from '@mui/material';

export const CustonContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const CustonTextField = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(3),
}));
