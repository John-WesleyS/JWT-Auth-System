import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function TeacherLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [serverError, setServerError] = useState("");
    const onSubmit = async (data) => {
        try {
            setServerError("");
            const response = await teacherLogin(data);
            login(response);
            navigate("/teacher/dashboard");
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <h1 className="text-3xl font-bold">
                    Teacher Login
                </h1>
                <p className="mt-2 text-slate-400">
                    Login to your teacher account
                </p>
                {serverError && (
                    <div className="mt-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                        {serverError}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="teacher@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-purple-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    {/* Registration Number */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Employee ID 
                        </label>
                        <input
                            type="text"
                            placeholder="EMP-001"
                            {...register("employeeId", {
                                required: "Employee ID is required",
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-purple-500"
                        />
                        {errors.employeeId && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.employeeId.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-purple-500"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-purple-600 py-3 font-semibold hover:bg-purple-700"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account?
                    <button
                        onClick={() => navigate("/teacher/register")}
                        className="ml-1 text-purple-400 hover:text-purple-300"
                    >
                        Register
                    </button>
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-5 w-full text-sm text-slate-500 hover:text-slate-300"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}

export default TeacherLogin;