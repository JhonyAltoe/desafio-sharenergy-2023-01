import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyIfAuthenticated } from '../../helpers/verifyIfAuthenticated';
import { randomUserFetch } from '../../apis/randomuser-api';
import UserCard from '../../components/userCard/UserCard';
import { CustonCircularProgress, CustonContainer, Sentinel } from './styles/userList-styles';

export default function UserList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLisOfUsers = async (pagePosition) => {
    const position = pagePosition + 1;
    const { data: d, page: p } = await randomUserFetch(position);
    setData([...data, ...d]);
    setPage(p);
  };

  useEffect(() => {
    verifyIfAuthenticated(navigate);
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some(((entry) => entry.isIntersecting))) {
        setLoading(true);
        fetchLisOfUsers(page);
      }
    });
    intersectionObserver.observe(document.querySelector('#sentinel'));
    return () => intersectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const newUsers = data.map(({
      name, email, login, dob, picture,
    }) => {
      const user = {
        uuid: login.uuid,
        picture: picture.medium,
        fullName: `${name.title} ${name.first} ${name.last}`,
        email,
        username: login.username,
        age: dob.age,
      };
      return <UserCard key={login.uuid} user={user} />;
    });

    setUsers((prevUsers) => [...prevUsers, newUsers]);
    setLoading(false);
  }, [data]);

  return (
    <>
      <h1>{page}</h1>
      <CustonContainer>
        {users}
      </CustonContainer>
      <Sentinel id="sentinel">
        {loading && <CustonCircularProgress variant="indeterminate" disableShrink />}
      </Sentinel>
    </>
  );
}
