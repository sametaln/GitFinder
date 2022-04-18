import './loading.scss';

const Loading = ({ error }: { error: any }) => {
  return (
    <div className="load-info-container">
      <div className="load-info-wrapper">
        <div className="load-info-img"></div>
        <div className="load-info-name"></div>
        <div className="load-info-login"></div>
      </div>
      <div className="load-repo-container">
        <div className="load-repo-header"></div>
        <div className="load-repo-wrapper">
          <div className="load-repo-title"></div>
          <div className="load-repo-description"></div>
        </div>
        <div className="load-repo-wrapper">
          <div className="load-repo-title"></div>
          <div className="load-repo-description"></div>
        </div>
      </div>
      {error ? (
        <div className="load-error">
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Loading;
