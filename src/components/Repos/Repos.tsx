import './repos.scss';
import RepoItem from '../repoItem/RepoItem';
import { Key } from 'react';

const Repos = ({ repos }: { repos: any }) => {
  return (
    <div className="user-repo-container">
      {repos.map((repo: { id: Key | null | undefined }) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </div>
  );
};

export default Repos;
