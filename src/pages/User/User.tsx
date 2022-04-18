import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import UserInfo from '../../components/userInfo/UserInfo';

const User = (user: any, setError: any) => {
  const userObject = user.user;
  const [repos, setRepos] = useState<any[]>([]);
  const [count, setCount] = useState(2);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    try {
      fetch(`https://api.github.com/users/${userObject.login}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
        });
    } catch (e) {
      console.error(e);
    }
  }, [userObject.login]);

  const handleClick = () => {
    if (count > repos.length) {
      setCount(repos.length + 1);
      setWarning('You have load all repositories');
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

  return (
    <div className="user-wrapper">
      {warning && count == repos.length + 1 ? (
        <div className="user-warning">
          <p>{warning}</p>
        </div>
      ) : null}
      <div className="user">
        <UserInfo userObject={userObject} repos={repos} />
        <div className="repo-container">
          <h1 className="repo-container-title">Repositories</h1>
          <Repos repos={repos.slice(0, count)} />
          <div className="repo-container-buttons">
            <button className="user-load more" onClick={handleClick}>
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
