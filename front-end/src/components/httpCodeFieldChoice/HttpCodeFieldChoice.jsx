import PropTypes from 'prop-types';
import HttpCard from './components/httpCard/HttpCard';
import { CustonContainer } from './styles/httpCodeFieldChoice-Styles';

export default function HttpCodeFieldChoice({ httpArr, SetImageSrc }) {
  return (
    <CustonContainer>
      {httpArr.map(
        (item) => <HttpCard key={item[0]} httpArrItem={item} SetImageSrc={SetImageSrc} />,
      )}
    </CustonContainer>
  );
}

HttpCodeFieldChoice.propTypes = {
  httpArr: PropTypes.array.isRequired,
  SetImageSrc: PropTypes.func.isRequired,
};
