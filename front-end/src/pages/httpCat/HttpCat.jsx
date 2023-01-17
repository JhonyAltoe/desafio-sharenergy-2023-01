import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import HttpCodeFieldChoice from '../../components/httpCodeFieldChoice/HttpCodeFieldChoice';
import { httpCodes } from '../../helpers/httpCodes';
import { verifyIfAuthenticated } from '../../helpers/verifyIfAuthenticated';

export default function HttpCat() {
  const [imageSrc, SetImageSrc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    verifyIfAuthenticated(navigate);
  });

  return (
    <>
      <Header />
      <HttpCodeFieldChoice httpArr={httpCodes} SetImageSrc={SetImageSrc} />
      <Container sx={{ textAlign: 'center' }}>
        <img src={imageSrc || 'https://http.cat/200'} alt="cat" />
      </Container>
    </>
  );
}
