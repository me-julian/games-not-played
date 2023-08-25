import '../public/about.css'
import ActionNav from '../components/ActionNav'

function About() {
    return (
        <>
            <ActionNav actionName={'About'} />
            <main id="about">
                <section>
                    <h4>About the App</h4>
                    <p>
                        <span className="brand">Games Not Played</span> is a web
                        app intended to help you decide what game to play next.
                    </p>
                    <p>
                        The name is a reference to the poem{' '}
                        <a href="https://www.poetryfoundation.org/poems/44272/the-road-not-taken">
                            The Road Not Taken
                        </a>{' '}
                        by Robert Frost - in reference to the sometimes
                        agonizing process of decision making.
                    </p>
                </section>
                <section className="about-section">
                    <h4>About Me</h4>
                    <p>
                        I'm Julian Edwards and I'm a web developer in Austin,
                        Texas.
                    </p>
                    <p>
                        This is my final project for Inventive Academy's{' '}
                        <a href="https://learn.inventiveacademy.io/p/full-stack-immersive-bootcamp-with-node">
                            Full Stack Immersive
                        </a>{' '}
                        web development course.
                    </p>
                </section>
                <section className="about-section">
                    <p>
                        Wondering what this app was built with? Want to see the
                        source code?
                    </p>
                    <p>
                        <a href="https://github.com/julianmedwards/final-project-games-not-played">
                            View the github repo.
                        </a>
                    </p>
                </section>
            </main>
        </>
    )
}

export default About
