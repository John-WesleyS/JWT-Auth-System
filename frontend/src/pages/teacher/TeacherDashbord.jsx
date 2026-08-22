import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function TeacherDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleLogout = async () => {
        await logout();

        navigate("/teacher/login", {
            replace: true,
        });
    };
    const menuItems = [
        {
            id: "overview",
            name: "Overview",
            icon: "🏠",
        },
        {
            id: "profile",
            name: "Profile",
            icon: "👤",
        },
        {
            id: "courses",
            name: "Courses",
            icon: "📚",
        },
        {
            id: "students",
            name: "Students",
            icon: "👨‍🎓",
        },
        {
            id: "assignments",
            name: "Assignments",
            icon: "📝",
        },
        {
            id: "attendance",
            name: "Attendance",
            icon: "📊",
        },
        {
            id: "grades",
            name: "Grades",
            icon: "🎯",
        },
        {
            id: "notifications",
            name: "Notifications",
            icon: "🔔",
        },
    ];

    const handleSectionChange = (section) => {

        setActiveSection(section);
        setSidebarOpen(false);

    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Mobile Header */}

            <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4 lg:hidden">

                <h1 className="text-xl font-bold">
                    Edu<span className="text-purple-500">Auth</span>
                </h1>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-lg border border-slate-700 px-3 py-2"
                >
                    ☰
                </button>

            </header>


            <div className="flex min-h-screen">


                {/* Sidebar */}

                <aside
                    className={`
                        fixed inset-y-0 left-0 z-40 w-64
                        border-r border-slate-800
                        bg-slate-900
                        transform transition-transform duration-300
                        lg:static lg:translate-x-0
                        ${sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        }
                    `}
                >

                    <div className="flex h-20 items-center border-b border-slate-800 px-6">

                        <h1 className="text-2xl font-bold">
                            Edu<span className="text-purple-500">Auth</span>
                        </h1>

                    </div>


                    <div className="border-b border-slate-800 px-6 py-5">

                        <p className="text-xs font-semibold uppercase text-purple-400">
                            Teacher Portal
                        </p>

                        <p className="mt-1 truncate font-medium">
                            {user?.name}
                        </p>

                    </div>


                    <nav className="space-y-1 p-4">

                        {menuItems.map((item) => (

                            <button
                                key={item.id}
                                onClick={() =>
                                    handleSectionChange(item.id)
                                }
                                className={`
                                    flex w-full items-center gap-3
                                    rounded-lg px-4 py-3
                                    text-left text-sm font-medium
                                    transition
                                    ${activeSection === item.id
                                        ? "bg-purple-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }
                                `}
                            >

                                <span>
                                    {item.icon}
                                </span>

                                <span>
                                    {item.name}
                                </span>

                            </button>

                        ))}

                    </nav>


                    <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 hover:bg-red-500/10"
                        >
                            🚪
                            Logout
                        </button>

                    </div>

                </aside>


                {/* Mobile Overlay */}

                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    />
                )}


                {/* Main */}

                <main className="flex-1 overflow-y-auto">


                    {/* Header */}

                    <header className="hidden h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-8 lg:flex">

                        <h2 className="font-semibold">

                            {
                                menuItems.find(
                                    item =>
                                        item.id === activeSection
                                )?.name
                            }

                        </h2>


                        <div className="flex items-center gap-4">

                            <div className="text-right">

                                <p className="text-sm font-medium">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-slate-400">
                                    Teacher
                                </p>

                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-bold">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </div>

                        </div>

                    </header>


                    <div className="p-6 lg:p-10">


                        {/* OVERVIEW */}

                        {activeSection === "overview" && (

                            <section>

                                <p className="text-sm text-purple-400">
                                    TEACHER DASHBOARD
                                </p>

                                <h1 className="mt-2 text-3xl font-bold lg:text-4xl">
                                    Welcome, {user?.name}
                                </h1>

                                <p className="mt-2 text-slate-400">
                                    Manage your courses and students.
                                </p>


                                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                                    <StatCard
                                        title="Students"
                                        value="120"
                                        icon="👨‍🎓"
                                    />

                                    <StatCard
                                        title="Courses"
                                        value="5"
                                        icon="📚"
                                    />

                                    <StatCard
                                        title="Assignments"
                                        value="18"
                                        icon="📝"
                                    />

                                    <StatCard
                                        title="Classes"
                                        value="4"
                                        icon="🏫"
                                    />

                                </div>


                                <div className="mt-8 grid gap-6 lg:grid-cols-2">

                                    <DashboardCard
                                        title="Recent Students"
                                        icon="👨‍🎓"
                                    >
                                        <p className="text-slate-400">
                                            Student information will appear here.
                                        </p>
                                    </DashboardCard>


                                    <DashboardCard
                                        title="Recent Notifications"
                                        icon="🔔"
                                    >
                                        <p className="text-slate-400">
                                            No new notifications.
                                        </p>
                                    </DashboardCard>

                                </div>

                            </section>

                        )}


                        {/* PROFILE */}

                        {activeSection === "profile" && (

                            <section>

                                <SectionTitle
                                    title="My Profile"
                                    description="View your teacher account information."
                                />

                                <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                                    <div className="flex items-center gap-5 border-b border-slate-800 pb-6">

                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold">
                                            {user?.name?.charAt(0)?.toUpperCase()}
                                        </div>

                                        <div>

                                            <h2 className="text-xl font-bold">
                                                {user?.name}
                                            </h2>

                                            <p className="text-slate-400">
                                                Teacher
                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-6 grid gap-6 md:grid-cols-2">

                                        <InfoItem
                                            label="Full Name"
                                            value={user?.name}
                                        />

                                        <InfoItem
                                            label="Email"
                                            value={user?.email}
                                        />

                                        <InfoItem
                                            label="Role"
                                            value="Teacher"
                                        />

                                        <InfoItem
                                            label="Teacher ID"
                                            value="TCH001"
                                        />

                                        <InfoItem
                                            label="Department"
                                            value="Computer Science"
                                        />

                                        <InfoItem
                                            label="Designation"
                                            value="Assistant Professor"
                                        />

                                    </div>

                                </div>

                            </section>

                        )}


                        {/* COURSES */}

                        {activeSection === "courses" && (

                            <section>

                                <SectionTitle
                                    title="My Courses"
                                    description="Manage your courses."
                                />

                                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                    <CourseCard
                                        code="CS301"
                                        name="Database Management Systems"
                                        students="45 Students"
                                    />

                                    <CourseCard
                                        code="CS302"
                                        name="Operating Systems"
                                        students="38 Students"
                                    />

                                    <CourseCard
                                        code="CS303"
                                        name="Computer Networks"
                                        students="42 Students"
                                    />

                                </div>

                            </section>

                        )}


                        {/* STUDENTS */}

                        {activeSection === "students" && (

                            <section>

                                <SectionTitle
                                    title="Students"
                                    description="View students assigned to your courses."
                                />

                                <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">

                                    <table className="w-full min-w-[700px]">

                                        <thead className="border-b border-slate-800">

                                            <tr>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Name
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Email
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Course
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Attendance
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            <StudentRow
                                                name="John"
                                                email="john@example.com"
                                                course="DBMS"
                                                attendance="93%"
                                            />

                                            <StudentRow
                                                name="Alex"
                                                email="alex@example.com"
                                                course="OS"
                                                attendance="87%"
                                            />

                                            <StudentRow
                                                name="Sarah"
                                                email="sarah@example.com"
                                                course="CN"
                                                attendance="91%"
                                            />

                                        </tbody>

                                    </table>

                                </div>

                            </section>

                        )}


                        {/* ASSIGNMENTS */}

                        {activeSection === "assignments" && (

                            <section>

                                <SectionTitle
                                    title="Assignments"
                                    description="Create and manage assignments."
                                />

                                <div className="mt-8 grid gap-5 md:grid-cols-2">

                                    <DashboardCard
                                        title="Create Assignment"
                                        icon="➕"
                                    >
                                        <button className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold hover:bg-purple-700">
                                            Create Assignment
                                        </button>
                                    </DashboardCard>


                                    <DashboardCard
                                        title="Current Assignments"
                                        icon="📝"
                                    >
                                        <p className="text-slate-400">
                                            18 active assignments.
                                        </p>
                                    </DashboardCard>

                                </div>

                            </section>

                        )}


                        {/* ATTENDANCE */}

                        {activeSection === "attendance" && (

                            <section>

                                <SectionTitle
                                    title="Attendance"
                                    description="Manage student attendance."
                                />

                                <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                                    <div className="flex flex-col gap-4 sm:flex-row">

                                        <select className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3">

                                            <option>
                                                Database Management Systems
                                            </option>

                                            <option>
                                                Operating Systems
                                            </option>

                                            <option>
                                                Computer Networks
                                            </option>

                                        </select>

                                        <button className="rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700">
                                            Mark Attendance
                                        </button>

                                    </div>

                                </div>

                            </section>

                        )}


                        {/* GRADES */}

                        {activeSection === "grades" && (

                            <section>

                                <SectionTitle
                                    title="Grades"
                                    description="Manage student grades."
                                />

                                <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                                    <p className="text-slate-400">
                                        Select a course to view and manage
                                        student grades.
                                    </p>

                                    <button className="mt-5 rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700">
                                        Manage Grades
                                    </button>

                                </div>

                            </section>

                        )}


                        {/* NOTIFICATIONS */}

                        {activeSection === "notifications" && (

                            <section>

                                <SectionTitle
                                    title="Notifications"
                                    description="Manage announcements for students."
                                />

                                <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                                    <button className="rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-700">
                                        Create Announcement
                                    </button>

                                </div>

                            </section>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}


/* ---------------- Components ---------------- */


function StatCard({ title, value, icon }) {

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

                <p className="text-sm text-slate-400">
                    {title}
                </p>

                <span className="text-xl">
                    {icon}
                </span>

            </div>

            <h2 className="mt-3 text-3xl font-bold">
                {value}
            </h2>

        </div>
    );
}


function DashboardCard({ title, icon, children }) {

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-lg font-bold">
                {icon} {title}
            </h2>

            <div className="mt-5">
                {children}
            </div>

        </div>
    );
}


function SectionTitle({ title, description }) {

    return (
        <div>

            <h1 className="text-3xl font-bold">
                {title}
            </h1>

            <p className="mt-2 text-slate-400">
                {description}
            </p>

        </div>
    );
}


function InfoItem({ label, value }) {

    return (
        <div>

            <p className="text-sm text-slate-400">
                {label}
            </p>

            <p className="mt-1 font-medium">
                {value || "Not available"}
            </p>

        </div>
    );
}


function CourseCard({ code, name, students }) {

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm font-semibold text-purple-400">
                {code}
            </p>

            <h2 className="mt-3 text-xl font-bold">
                {name}
            </h2>

            <p className="mt-3 text-sm text-slate-400">
                {students}
            </p>

        </div>
    );
}


function StudentRow({
    name,
    email,
    course,
    attendance,
}) {

    return (
        <tr className="border-b border-slate-800">

            <td className="px-6 py-4 font-medium">
                {name}
            </td>

            <td className="px-6 py-4 text-slate-400">
                {email}
            </td>

            <td className="px-6 py-4">
                {course}
            </td>

            <td className="px-6 py-4 text-green-400">
                {attendance}
            </td>

        </tr>
    );
}


export default TeacherDashboard;