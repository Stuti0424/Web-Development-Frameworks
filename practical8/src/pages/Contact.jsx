function Contact() {

    return (
        <main className="simple-page">

            <div className="simple-page-content">

                <span className="page-badge">
                    LAZY LOADED
                </span>

                <h1>
                    Contact
                </h1>

                <p>
                    This route is also loaded
                    dynamically using
                    <strong> React.lazy() </strong>
                    and
                    <strong> Suspense </strong>.
                </p>


                <div className="contact-card">

                    <div className="contact-item">
                        <span>📧</span>

                        <div>
                            <small>
                                EMAIL
                            </small>

                            <p>
                                24dit020@example.com
                            </p>
                        </div>
                    </div>


                    <div className="contact-item">
                        <span>💬</span>

                        <div>
                            <small>
                                SUPPORT
                            </small>

                            <p>
                                Available for
                                project discussions
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </main>
    );
}

export default Contact;