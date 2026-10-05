function Projects() {

    return (
        <main className="simple-page">

            <div className="simple-page-content">

                <span className="page-badge">
                    LAZY LOADED
                </span>

                <h1>
                    Projects
                </h1>

                <p>
                    This page is loaded only when
                    the user visits the
                    <strong> /projects </strong>
                    route.
                </p>


                <div className="info-grid">

                    <div className="info-card">

                        <span>01</span>

                        <h3>
                            Code Splitting
                        </h3>

                        <p>
                            The Projects component
                            is placed in a separate
                            JavaScript chunk.
                        </p>

                    </div>


                    <div className="info-card">

                        <span>02</span>

                        <h3>
                            Lazy Loading
                        </h3>

                        <p>
                            React downloads this
                            component when its route
                            is visited.
                        </p>

                    </div>


                    <div className="info-card">

                        <span>03</span>

                        <h3>
                            Faster Initial Load
                        </h3>

                        <p>
                            The initial bundle does
                            not need to contain this
                            page.
                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Projects;