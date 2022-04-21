import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';
import { Link, useNavigate } from 'react-router-dom';
import RepoLoad from '../../components/repoLoad/RepoLoad';
import UserInfo from '../../components/userInfo/UserInfo';
import { fetchRepos } from '../../utils/fetch.utils';
import { User } from '../../App';

export type Repo = {
  id: string;
  name: string;
  description: string;
  login: string;
  stargazers_count: number;
  html_url: string;
};

const UserPage = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const userObject = user;
  const [repos, setRepos] = useState<Repo[]>([]);
  const [count, setCount] = useState(2);
  const [warning, setWarning] = useState('');
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setLoading(true);
      fetchRepos<Array<Repo>>(userObject.login).then((data: Repo[]) => {
        setRepos(data);
        setLoading(false);
      });
    } catch (e) {
      setError('Something wrong happened. Please try again.');
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (count === repos.length) {
      setMore(false);
      setWarning('You have load all repositories');
      setCount(repos.length + 1);
    }
  }, [count]);

  const handleClickMore = () => {
    repos.length % 2 === 0 ? setCount(count + 2) : setCount(count + 1);
  };

  const handleClickLess = () => {
    if (count === 3) {
      setMore(true);
      setWarning('');
      setCount(2);
      return;
    }
    repos.length % 2 === 0 ? setCount(count - 2) : setCount(count - 1);
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
          <p className="user-warning-text">{warning}</p>
        </div>
      ) : null}
      {error ? (
        <div className="load-error">
          <p>{error}</p>
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

export default UserPage;
