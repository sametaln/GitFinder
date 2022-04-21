import './repos.scss';
import RepoItem from '../repoItem/RepoItem';
import { Key } from 'react';
import { Repo } from '../../pages/UserPage/UserPage';

const Repos = ({ repos }: { repos: Repo[] }) => {
  return (
    <div className="user-repo-container">
      {repos.map((repo: { id: Key | null | undefined }) => (
        <RepoItem repo={repo as Repo} key={repo.id} />
      ))}
    </div>
  );
};

export default Repos;
