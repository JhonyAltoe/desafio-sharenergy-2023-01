import {
  Container, styled,
} from '@mui/material';

export const CustonContainer = styled(Container)(({ theme }) => ({
  height: '250px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  overflowY: 'scroll',
  border: '2px gray solid',
  marginBottom: theme.spacing(3),
}));
