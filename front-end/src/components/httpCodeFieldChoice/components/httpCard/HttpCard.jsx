import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function HttpCard({ httpArrItem, SetImageSrc }) {
  const card = (element) => (
    <>
      <Typography variant="h3">
        {element[0]}
      </Typography>
      <Typography fontSize={10}>
        {element[1]}
      </Typography>
    </>
  );

  return (
    <Button
      variant="contained"
      sx={{
        width: 230, m: 2, textAlign: 'center', padding: 1, display: 'block',
      }}
      elevation={10}
      onClick={() => SetImageSrc(`https://http.cat/${httpArrItem[0]}`)}
    >
      {card(httpArrItem)}
    </Button>
  );
}

HttpCard.propTypes = {
  httpArrItem: PropTypes.array.isRequired,
  SetImageSrc: PropTypes.func.isRequired,
};
