import ActionNav from '../components/ActionNav'

function About() {
    return (
        <>
            <ActionNav actionName={'About'} />
            <main>
                <p>
                    Games Not Played is a web app intended to help users decide
                    what game to play next.
                </p>
                <p>
                    This is my final project for Inventive Academy's{' '}
                    <a href="https://learn.inventiveacademy.io/p/full-stack-immersive-bootcamp-with-node">
                        Full Stack Immersive
                    </a>{' '}
                    web development course.
                </p>
                <p>
                    Want to see the source code for this app?{' '}
                    <a href="https://github.com/julianmedwards/final-project-games-not-played">
                        View the github repo.
                    </a>
                </p>
            </main>
        </>
    )
}

export default About
