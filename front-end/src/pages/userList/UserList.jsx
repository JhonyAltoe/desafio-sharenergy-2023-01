import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyIfAuthenticated } from '../../helpers/verifyIfAuthenticated';
import { randomUserFetch } from '../../apis/randomuser-api';
import UserCard from '../../components/userCard/UserCard';
import { CustonCircularProgress, CustonContainer, Sentinel } from './styles/userList-styles';
import SearchField from './components/searchField/SearchField';
import Header from '../../components/header/Header';

export default function UserList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const navigate = useNavigate();

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
    const fetchLisOfUsers = async (page) => {
      const { data: newData } = await randomUserFetch(page);
      if (page === 0) return;
      if (data !== newData) {
        setData((prevData) => ([...prevData, ...newData]));
      }
    };

    fetchLisOfUsers(currentPage);
  }, [currentPage]);

  const filterUsersAndReturn = (searchParam) => data.filter(({ name, email, login }) => {
    if (!searchParam) return true;
    const string = `${name.title} ${name.first} ${name.last} ${email} ${login.username}`;
    return string.toLocaleLowerCase().match(searchParam.toLocaleLowerCase());
  });

  useEffect(() => {
    const filteredData = filterUsersAndReturn(search);
    const newUsers = filteredData.map(({
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
  }, [data, search]);

  const handlerSearch = (searchParam) => setSearch(searchParam);

  return (
    <>
      <Header />
      <SearchField handlerSearch={handlerSearch} />
      <CustonContainer>
        {users}
      </CustonContainer>
      <Sentinel id="sentinel">
        {loading && <CustonCircularProgress variant="indeterminate" disableShrink />}
      </Sentinel>
    </>
  );
}
