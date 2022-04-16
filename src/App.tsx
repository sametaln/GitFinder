import Home from './pages/Home/Home';
import Loading from './pages/Loading/Loading';
import User from './pages/User/User';
import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<Object | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [first, setFirst] = useState<Boolean>(true);
  const username = useRef<HTMLInputElement | null>(null);

  return (
    // <>
    //   {first && (
    //     <Home
    //       username={username}
    //       setUser={setUser}
    //       setLoading={setLoading}
    //       setFirst={setFirst}
    //     />
    //   )}
    //   {loading && <Loading />}
    //   {user && <User user={user} setUser={setUser} setFirst={setFirst} />}
    // </>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              username={username}
              setUser={setUser}
              setLoading={setLoading}
              setFirst={setFirst}
            />
          }
        />
        <Route path="/user" element={<User user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
