import {
  Paper, styled,
} from '@mui/material';

export const CustonPaper = styled(Paper)(({ theme }) => ({
  width: '280px',
  padding: theme.spacing(3),
}));
