import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import Login from './pages/login/Login';
import UserList from './pages/userList/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lista-de-usuarios" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
