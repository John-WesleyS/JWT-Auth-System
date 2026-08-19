import { useNavigate } from "react-router-dom";

function Landing() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Navbar */}

            <nav className="flex items-center justify-between px-6 py-5 lg:px-16">

                <h1 className="text-2xl font-bold tracking-tight">
                    JWT<span className="text-blue-500">Auth</span>
                </h1>

                <div className="flex gap-3">

                    <button
                        onClick={() => navigate("/student/login")}
                        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:border-blue-500 hover:text-blue-400"
                    >
                        Student Login
                    </button>

                    <button
                        onClick={() => navigate("/teacher/login")}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
                    >
                        Teacher Login
                    </button>

                </div>

            </nav>


            {/* Hero */}

            <section className="flex min-h-[75vh] items-center justify-center px-6">

                <div className="max-w-4xl text-center">

                    

                    <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">

                        One Platform.
                        <br />

                        <span className="text-blue-500">
                            Two Powerful Roles.
                        </span>

                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                        A secure authentication and authorization platform
                        designed for students and teachers.
                    </p>


                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                        <button
                            onClick={() => navigate("/student/register")}
                            className="rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
                        >
                            Sign in as Student
                        </button>

                        <button
                            onClick={() => navigate("/teacher/register")}
                            className="rounded-xl border border-slate-700 px-7 py-3 font-semibold transition hover:border-blue-500 hover:text-blue-400"
                        >
                            Sign in as Teacher
                        </button>

                    </div>

                </div>

            </section>


            {/* Roles */}

            <section className="px-6 py-24">

                <div className="mx-auto max-w-6xl">

                    <div className="text-center">

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Choose Your Portal
                        </h2>

                        <p className="mt-4 text-slate-400">
                            Access the platform according to your role.
                        </p>

                    </div>



                </div>
                    
            </section>      

        </div>
    );
}

export default Landing;