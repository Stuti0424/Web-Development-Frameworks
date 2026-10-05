/*function Projects() {
    return (
        <section className="page-card">
            <p className="eyebrow">Projects</p>
            <h2>Featured work</h2>
            <div className="project-grid">
                <article className="project-card">
                    <h3>Portfolio Website</h3>
                    <p>A personal site designed to present projects and contact information.</p>
                </article>
                
            </div>
        </section>
    );
}

export default Projects;*/

/*PR3 import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import RepoList from "./RepoList";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRepos = () => {
    setLoading(true);
    setError(null);

    fetch("https://api.github.com/users/Stuti0424/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories.");
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  // Filter repositories based on search input
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        retry={fetchRepos}
      />
    );
  }

  return (
    <div className="container">
      <h1>My GitHub Projects</h1>

      <input
        type="text"
        placeholder="Search repository..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <RepoList repos={filteredRepos} />
    </div>
  );
}

export default Projects;*/