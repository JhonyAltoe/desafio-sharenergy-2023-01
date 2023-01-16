import { Button } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CustonContainer, CustonTextField } from './styles/searchField-styles';

export default function SearchField({ handlerSearch }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <CustonContainer>
      <CustonTextField
        label="Digite sua pesquisa"
        type="search"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
      />
      <Button variant="contained" size="large" onClick={() => handlerSearch(searchValue)}>Pesquisar</Button>
    </CustonContainer>
  );
}

SearchField.propTypes = {
  handlerSearch: PropTypes.func.isRequired,
};
