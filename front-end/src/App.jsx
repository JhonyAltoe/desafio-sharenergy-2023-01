import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import Login from './pages/login/Login';
import UserList from './pages/userList/UserList';
import HttpCat from './pages/httpCat/HttpCat';
// import RandomGog from './pages/randomDog/RandomDog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lista-de-usuarios" element={<UserList />} />
        <Route path="/http-cats" element={<HttpCat />} />
        {/* <Route path="/random-dog" element={<RandomGog />} /> */}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
