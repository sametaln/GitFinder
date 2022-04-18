import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import UserInfo from '../../components/userInfo/UserInfo';

const User = (user: any) => {
  const userObject = user.user;
  const [repos, setRepos] = useState<any[]>([]);
  const [count, setCount] = useState(2);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      fetch(`https://api.github.com/users/${userObject.login}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
        });
      if (userObject.message) {
        setError('User not found.');
      }
    } catch (e) {
      console.error('patladi');
    }
  }, [userObject.login]);

  const handleClick = () => {
    if (count > repos.length) {
      setCount(repos.length + 1);
      return;
    }
    setCount(count + 2);
  };

  repos.sort(
    (a: { stargazers_count: number }, b: { stargazers_count: number }) => {
      if (a.stargazers_count > b.stargazers_count) return -1;
      if (a.stargazers_count < b.stargazers_count) return 1;
      return 0;
    }
  );

  return userObject.message ? (
    <Loading error={error} />
  ) : (
    <div className="user-wrapper">
      <div className="user">
        <UserInfo userObject={userObject} repos={repos} />
        <div className="repo-container">
          <h1 className="repo-container-title">Repositories</h1>
          <Repos repos={repos.slice(0, count)} />
          <div className="repo-container-buttons">
            <button className="user-load" onClick={handleClick}>
              Load More
            </button>
            <Link className="user-load" to="/">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
