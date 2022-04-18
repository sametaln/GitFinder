import Home from './pages/Home/Home';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import User from './pages/User/User';
import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<Object | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [first, setFirst] = useState<Boolean>(true);
  const username = useRef<HTMLInputElement | null>(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              username={username}
              setUser={setUser}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute user={user}>
              <User user={user} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
