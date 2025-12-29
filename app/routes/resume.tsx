import { Link, useParams } from "react-router"

export const meta = () => ([
    { title: 'Resumeise | Review' },
    { name: 'description', content: "Deatiled overview" },
])
const Resume = () => {
    //destructuring the id 
    const { id } = useParams();
    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className='back-button'>
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5"/>
                    <span className=" text-gray-800 text-sm font-semibol">Back to Homepage</span>
                </Link>
            </nav>

        </main>
    )
}

export default Resume