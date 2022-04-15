import Home from './pages/Home/Home';
import Loading from './pages/Loading/Loading';
import User from './pages/User/User';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [user, setUser] = useState<Object | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [first, setFirst] = useState<Boolean>(true);
  const username = useRef<HTMLInputElement | null>(null);

  return (
    <>
      {first && (
        <Home
          username={username}
          setUser={setUser}
          setLoading={setLoading}
          setFirst={setFirst}
        />
      )}
      {loading && <Loading />}
      {user && <User user={user} />}
    </>
  );
}

export default App;
