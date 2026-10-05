function RepoList({ repos }) {
  return (
    <div className="container">
      <h2>GitHub Repositories</h2>

      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        repos.map((repo) => (
          <div
            key={repo.id}
            className="repo-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{repo.name}</h3>

            <p>
              <strong>{repo.stargazers_count}</strong>
            </p>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.html_url}
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default RepoList;