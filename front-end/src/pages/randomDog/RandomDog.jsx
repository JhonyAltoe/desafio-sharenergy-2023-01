import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Header from '../../components/header/Header';
import { randomDogFetch } from '../../apis/random-dog';

export default function RandomGog() {
  const [srcDog, setSrcDog] = useState('');

  useEffect(() => {
    const fetchDog = async () => {
      const response = await randomDogFetch();
      setSrcDog(response.data);
    };
    fetchDog();
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ textAlign: 'center' }}>
        {srcDog}
      </Container>
    </>
  );
}
