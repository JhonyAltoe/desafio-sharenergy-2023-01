import PropTypes from 'prop-types';

import {
  Avatar, Box, Card, CardContent, Typography,
} from '@mui/material';
import { BoxCard, TitleCard } from './styles/userCard-styles';

const card = (user) => (
  <CardContent>
    <Avatar
      alt={`Avatar do ${user.username}`}
      src={user.picture}
      sx={{
        width: 56, height: 56, mb: 1, mx: 'auto',
      }}
    />
    <TitleCard component="div" sx={{ mb: 1 }} textAlign="center">
      {user.fullName}
    </TitleCard>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>
      <Box color="text.secondary">Nome de usuário: </Box>
      <span>{user.username}</span>
    </Typography>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>
      <Box color="text.secondary">Email: </Box>
      <span>{user.email}</span>
    </Typography>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>
      <Box color="text.secondary">Idade: </Box>
      <span>{user.age}</span>
    </Typography>
  </CardContent>
);

export default function UserCard({ user }) {
  return (
    <BoxCard elevation={6}>
      <Card variant="outlined">{card(user)}</Card>
    </BoxCard>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }),
};
