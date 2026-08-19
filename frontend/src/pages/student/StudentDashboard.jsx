import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function StudentDashboard() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {

        await logout();

        navigate("/student/login", {
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
                    JWT<span className="text-blue-500">Auth</span>
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

                    {/* Logo */}

                    <div className="flex h-20 items-center border-b border-slate-800 px-6">

                        <h1 className="text-2xl font-bold">
                            JWT<span className="text-blue-500">Auth</span>
                        </h1>

                    </div>


                    {/* Role */}

                    <div className="border-b border-slate-800 px-6 py-5">

                        <p className="text-xs font-semibold uppercase text-blue-400">
                            Student Portal
                        </p>

                        <p className="mt-1 truncate font-medium">
                            {user?.name}
                        </p>

                    </div>


                    {/* Menu */}

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
                                        ? "bg-blue-600 text-white"
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


                    {/* Logout */}

                    <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                        >
                            🚪
                            Logout
                        </button>

                    </div>

                </aside>


                {/* Overlay Mobile */}

                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    />
                )}


                {/* Main */}

                <main className="flex-1 overflow-y-auto">


                    {/* Desktop Header */}

                    <header className="hidden h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-8 lg:flex">

                        <div>

                            <h2 className="text-lg font-semibold">
                                {menuItems.find(
                                    item =>
                                        item.id === activeSection
                                )?.name}
                            </h2>

                        </div>


                        <div className="flex items-center gap-4">

                            <div className="text-right">

                                <p className="text-sm font-medium">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-slate-400">
                                    Student
                                </p>

                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </div>

                        </div>

                    </header>


                    {/* Content */}

                    <div className="p-6 lg:p-10">


                        {/* OVERVIEW */}

                        {activeSection === "overview" && (

                            <section>

                                <p className="text-sm text-blue-400">
                                    STUDENT DASHBOARD
                                </p>

                                <h1 className="mt-2 text-3xl font-bold lg:text-4xl">
                                    Welcome, {user?.name}
                                </h1>

                                <p className="mt-2 text-slate-400">
                                    Here's an overview of your academic activities.
                                </p>


                                {/* Stats */}

                                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                                    <StatCard
                                        title="Courses"
                                        value="6"
                                        icon="📚"
                                    />

                                    <StatCard
                                        title="Attendance"
                                        value="92%"
                                        icon="📊"
                                    />

                                    <StatCard
                                        title="Assignments"
                                        value="12"
                                        icon="📝"
                                    />

                                    <StatCard
                                        title="GPA"
                                        value="8.9"
                                        icon="🎯"
                                    />

                                </div>


                                {/* Quick Sections */}

                                <div className="mt-8 grid gap-6 lg:grid-cols-2">

                                    <DashboardCard
                                        title="Upcoming Assignments"
                                        icon="📝"
                                    >
                                        <p className="text-slate-400">
                                            No upcoming assignments.
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
                                    description="View your account information."
                                />

                                <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                                    <div className="flex items-center gap-5 border-b border-slate-800 pb-6">

                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
                                            {user?.name?.charAt(0)?.toUpperCase()}
                                        </div>

                                        <div>

                                            <h2 className="text-xl font-bold">
                                                {user?.name}
                                            </h2>

                                            <p className="text-slate-400">
                                                Student
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
                                            value="Student"
                                        />

                                        <InfoItem
                                            label="Student ID"
                                            value="STU001"
                                        />

                                        <InfoItem
                                            label="Department"
                                            value="Computer Science"
                                        />

                                        <InfoItem
                                            label="Year"
                                            value="3rd Year"
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
                                    description="View your enrolled courses."
                                />

                                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                    <CourseCard
                                        code="CS301"
                                        name="Database Management Systems"
                                        teacher="Dr. Smith"
                                    />

                                    <CourseCard
                                        code="CS302"
                                        name="Operating Systems"
                                        teacher="Prof. Johnson"
                                    />

                                    <CourseCard
                                        code="CS303"
                                        name="Computer Networks"
                                        teacher="Dr. Williams"
                                    />

                                </div>

                            </section>

                        )}


                        {/* ASSIGNMENTS */}

                        {activeSection === "assignments" && (

                            <section>

                                <SectionTitle
                                    title="Assignments"
                                    description="Track your assignments and submissions."
                                />

                                <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">

                                    <table className="w-full min-w-[700px]">

                                        <thead className="border-b border-slate-800">

                                            <tr>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Assignment
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Course
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Due Date
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm text-slate-400">
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            <AssignmentRow
                                                title="MongoDB Queries"
                                                course="DBMS"
                                                date="Aug 25, 2026"
                                                status="Pending"
                                            />

                                            <AssignmentRow
                                                title="Process Scheduling"
                                                course="OS"
                                                date="Aug 28, 2026"
                                                status="Submitted"
                                            />

                                        </tbody>

                                    </table>

                                </div>

                            </section>

                        )}


                        {/* ATTENDANCE */}

                        {activeSection === "attendance" && (

                            <section>

                                <SectionTitle
                                    title="Attendance"
                                    description="Monitor your attendance."
                                />

                                <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">

                                    <table className="w-full">

                                        <thead className="border-b border-slate-800">

                                            <tr>

                                                <th className="px-6 py-4 text-left">
                                                    Course
                                                </th>

                                                <th className="px-6 py-4 text-left">
                                                    Present
                                                </th>

                                                <th className="px-6 py-4 text-left">
                                                    Total
                                                </th>

                                                <th className="px-6 py-4 text-left">
                                                    Percentage
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            <AttendanceRow
                                                course="DBMS"
                                                present="28"
                                                total="30"
                                                percentage="93%"
                                            />

                                            <AttendanceRow
                                                course="Operating Systems"
                                                present="25"
                                                total="30"
                                                percentage="83%"
                                            />

                                            <AttendanceRow
                                                course="Computer Networks"
                                                present="27"
                                                total="30"
                                                percentage="90%"
                                            />

                                        </tbody>

                                    </table>

                                </div>

                            </section>

                        )}


                        {/* GRADES */}

                        {activeSection === "grades" && (

                            <section>

                                <SectionTitle
                                    title="Grades"
                                    description="View your academic performance."
                                />

                                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                    <GradeCard
                                        course="DBMS"
                                        marks="91"
                                        grade="A+"
                                    />

                                    <GradeCard
                                        course="Operating Systems"
                                        marks="86"
                                        grade="A"
                                    />

                                    <GradeCard
                                        course="Computer Networks"
                                        marks="89"
                                        grade="A"
                                    />

                                </div>

                            </section>

                        )}


                        {/* NOTIFICATIONS */}

                        {activeSection === "notifications" && (

                            <section>

                                <SectionTitle
                                    title="Notifications"
                                    description="Your latest notifications."
                                />

                                <div className="mt-8 space-y-4">

                                    <Notification
                                        title="Assignment Deadline"
                                        message="Your DBMS assignment is due on August 25."
                                    />

                                    <Notification
                                        title="Grade Published"
                                        message="Your Operating Systems grade has been published."
                                    />

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


function CourseCard({ code, name, teacher }) {

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm font-semibold text-blue-400">
                {code}
            </p>

            <h2 className="mt-3 text-xl font-bold">
                {name}
            </h2>

            <p className="mt-3 text-sm text-slate-400">
                Teacher: {teacher}
            </p>

        </div>
    );
}


function AssignmentRow({ title, course, date, status }) {

    return (
        <tr className="border-b border-slate-800">

            <td className="px-6 py-4 font-medium">
                {title}
            </td>

            <td className="px-6 py-4 text-slate-400">
                {course}
            </td>

            <td className="px-6 py-4 text-slate-400">
                {date}
            </td>

            <td className="px-6 py-4">

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                    {status}
                </span>

            </td>

        </tr>
    );
}


function AttendanceRow({ course, present, total, percentage }) {

    return (
        <tr className="border-b border-slate-800">

            <td className="px-6 py-4 font-medium">
                {course}
            </td>

            <td className="px-6 py-4">
                {present}
            </td>

            <td className="px-6 py-4">
                {total}
            </td>

            <td className="px-6 py-4 text-green-400">
                {percentage}
            </td>

        </tr>
    );
}


function GradeCard({ course, marks, grade }) {

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-slate-400">
                {course}
            </p>

            <div className="mt-4 flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-400">
                        Marks
                    </p>

                    <p className="text-3xl font-bold">
                        {marks}
                    </p>

                </div>

                <div className="text-4xl font-bold text-green-400">
                    {grade}
                </div>

            </div>

        </div>
    );
}


function Notification({ title, message }) {

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <h3 className="font-semibold">
                🔔 {title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
                {message}
            </p>

        </div>
    );
}


export default StudentDashboard;