import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';
import { Link, useNavigate } from 'react-router-dom';
import RepoLoad from '../../components/repoLoad/RepoLoad';
import UserInfo from '../../components/userInfo/UserInfo';
import { fetchRepos, getWithTime } from '../../utils/fetch.utils';
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
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setLoading(true);
      if (!getWithTime(userObject.login + '/repo')) {
        fetchRepos<Array<Repo>>(userObject.login).then((data: Repo[]) => {
          setRepos(data);
          setLoading(false);
        });
      } else {
        setRepos(getWithTime(userObject.login + '/repo'));
        setLoading(false);
      }
    } catch (err) {
      setError('Something wrong happened. Please try again.');
      navigate('/');
    }
  }, [userObject.login, navigate]);

  // DECIDE WHICH BUTTON TO SHOW

  useEffect(() => {
    if (count <= 2) {
      setCount(2);
      setMore(true);
    }
    if (count >= repos.length && repos.length !== 0) {
      setCount(repos.length);
      setMore(false);
    }
  }, [count, repos.length]);

  const handleClickMore = () => {
    setCount(count + 2);
  };

  const handleClickLess = () => {
    setCount(count - 2);
  };

  return (
    <div className="user-wrapper">
      {error ? (
        <div className="load-error">
          <p>{error}</p>
        </div>
      ) : null}
      <div className="user">
        <UserInfo userObject={userObject} repos={repos} />
        <div className="repo-container">
          <h1 className="repo-container-title">Repositories</h1>
          {!repos.length && !loading ? (
            <h2>There is no repository to show</h2>
          ) : null}
          {loading && repos.length ? (
            <RepoLoad />
          ) : (
            <Repos repos={repos.slice(0, count)} />
          )}
          <div className="repo-container-buttons">
            {more && repos.length ? (
              <button className="user-load more" onClick={handleClickMore}>
                Load More
              </button>
            ) : null}
            {!more && repos.length && repos.length !== 1 ? (
              <button className="user-load less" onClick={handleClickLess}>
                Show Less
              </button>
            ) : null}
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
