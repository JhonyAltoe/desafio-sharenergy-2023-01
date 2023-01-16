import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyIfAuthenticated } from '../../helpers/verifyIfAuthenticated';
import { randomUserFetch } from '../../apis/randomuser-api';
import UserCard from '../../components/userCard/UserCard';
import { CustonCircularProgress, CustonContainer, Sentinel } from './styles/userList-styles';

export default function UserList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLisOfUsers = async (page) => {
      const { data: newData } = await randomUserFetch(page);
      if (page === 0) return;
      if (data !== newData) {
        setData((prevData) => ([...prevData, ...newData]));
      }
    };

    fetchLisOfUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    verifyIfAuthenticated(navigate);
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some(((entry) => entry.isIntersecting))) {
        setLoading(true);
        setCurrentPage((prevPage) => (prevPage + 1));
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
        picture: picture.medium,
        fullName: `${name.title} ${name.first} ${name.last}`,
        email,
        username: login.username,
        age: dob.age,
      };
      return <UserCard key={login.uuid} user={user} />;
    });

    setUsers(newUsers);
    setLoading(false);
  }, [data]);

  return (
    <>
      <h1>{currentPage}</h1>
      <CustonContainer>
        {users}
      </CustonContainer>
      <Sentinel id="sentinel">
        {loading && <CustonCircularProgress variant="indeterminate" disableShrink />}
      </Sentinel>
    </>
  );
}
