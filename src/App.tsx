import Home from './pages/Home/Home';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import UserPage from './pages/UserPage/UserPage';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export type User = {
  fetch_url: string;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
};

function App() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home setUser={setUser} setLoading={setLoading} loading={loading} />
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute user={user as User}>
              <UserPage user={user as User} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
