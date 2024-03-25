import ActionNav from '../components/ActionNav'
import '../public/css/routes/about.css'

function About() {
    return (
        <>
            <ActionNav actionName={'About'} containerSize="md" />
            <main id="about">
                <section>
                    <p>
                        Wondering what this app was built with? Want to see the
                        source code, hosting solution or continuous delivery
                        pipeline?
                    </p>
                    <p>
                        <a
                            className="accent"
                            href="https://github.com/me-julian/games-not-played"
                        >
                            <button>View the Github Repo and Wiki!</button>
                        </a>
                    </p>
                </section>
                <section>
                    <h4>About the App</h4>
                    <p>
                        Games Not Played is intended to help you decide what
                        game to play next.
                    </p>
                    <p>
                        The name is a reference to the poem{' '}
                        <a
                            className="accent"
                            href="https://www.poetryfoundation.org/poems/44272/the-road-not-taken"
                        >
                            The Road Not Taken
                        </a>{' '}
                        by Robert Frost.
                    </p>
                </section>
                <section>
                    <h4>About Me</h4>
                    <p>
                        I'm Julian Edwards and I'm a web developer in Austin,
                        Texas.
                    </p>
                    <p>
                        This is my final project for Inventive Academy's{' '}
                        <a
                            className="accent"
                            href="https://learn.inventiveacademy.io/p/full-stack-immersive-bootcamp-with-node"
                        >
                            Full Stack Immersive
                        </a>{' '}
                        web development course.
                    </p>
                </section>
            </main>
        </>
    )
}

export default About
