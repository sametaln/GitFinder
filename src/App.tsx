import Home from './pages/Home/Home';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import User from './pages/User/User';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<Object | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

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
