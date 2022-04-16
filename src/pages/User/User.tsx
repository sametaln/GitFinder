import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';

const User = (user: any) => {
  const [repos, setRepos] = useState<any[]>([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${user.user.login}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      });
  }, []);

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div className="user-wrapper">
      <div className="user-info">
        <img
          className="user-avatar"
          src={user.user.avatar_url}
          alt="User avatar"
        />
        <h2 className="user-name">{user.user.login}</h2>
        <div className="user-stats">
          <div className="user-stats-repos">{repos?.length}</div>
          <div className="user-stats-following">
            {user.user.following < 1000
              ? user.user.following
              : `${(user.user.following / 1000).toFixed(1)}k`}
          </div>
          <div className="user-stats-follower">
            {user.user.followers < 1000
              ? user.user.followers
              : `${(user.user.followers / 1000).toFixed(1)}k`}
          </div>
        </div>
      </div>
      <Repos repos={repos} />
      <button className="user-load" onClick={handleClick}>
        Load More
      </button>
    </div>
  );
};

export default User;
