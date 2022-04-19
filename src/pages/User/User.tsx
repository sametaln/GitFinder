import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';
import { Link } from 'react-router-dom';
import RepoLoad from '../../components/repoLoad/RepoLoad';
import UserInfo from '../../components/userInfo/UserInfo';
import axios from 'axios';

const User = (user: any, setError: any) => {
  const userObject = user.user;
  const [repos, setRepos] = useState<any[]>([]);
  const [count, setCount] = useState(2);
  const [warning, setWarning] = useState('');
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchRepos = async (username: string) => {
        const res = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        return await res.data;
      };
      setLoading(true);
      fetchRepos(userObject.login).then((data: any) => {
        setRepos(data);
        setLoading(false);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleClickMore = () => {
    if (count === repos.length) {
      setMore(false);
      setWarning('You have load all repositories');
      setCount(repos.length + 1);
      return;
    }
    setCount(count + 2);
  };

  const handleClickLess = () => {
    if (count === 3) {
      setWarning('');
      setMore(true);
      setCount(2);
      return;
    }
    setCount(count - 2);
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
      {warning && count === repos.length + 1 ? (
        <div className="user-warning" onTransitionEnd={() => setWarning('')}>
          <p>{warning}</p>
        </div>
      ) : null}
      <div className="user">
        <UserInfo userObject={userObject} repos={repos} />
        <div className="repo-container">
          <h1 className="repo-container-title">Repositories</h1>
          {loading ? <RepoLoad /> : <Repos repos={repos.slice(0, count)} />}
          <div className="repo-container-buttons">
            {more ? (
              <button className="user-load more" onClick={handleClickMore}>
                Load More
              </button>
            ) : (
              <button className="user-load less" onClick={handleClickLess}>
                Show Less
              </button>
            )}
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
