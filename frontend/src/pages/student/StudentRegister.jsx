import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { studentRegister } from "../../services/auth.service";
import { useState } from "react";

function StudentRegister() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const password = watch("password");

    const onSubmit = async (data) => {

        try {

            setServerError("");

            await studentRegister({
                name: data.name,
                email: data.email,
                password: data.password,
                rollNumber: data.rollNumber,
                department: data.department,
                year: data.year,
            });

            navigate("/");

        } catch (error) {

            setServerError(
                error.response?.data?.message ||
                "Registration failed"
            );

        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">

                <h1 className="text-3xl font-bold">
                    Student Registration
                </h1>

                <p className="mt-2 text-slate-400">
                    Create your student account
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

                    {/* Name */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="John Wesley"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}

                    </div>


                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="student@example.com"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}

                    </div>


                    {/* Roll Number */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Roll Number
                        </label>

                        <input
                            type="text"
                            placeholder="STU-001"
                            {...register("rollNumber", {
                                required: "Roll number is required",
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.rollNumber && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.rollNumber.message}
                            </p>
                        )}

                    </div>


                    {/* Department */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Department
                        </label>

                        <input
                            type="text"
                            placeholder="Computer Science"
                            {...register("department", {
                                required: "Department is required",
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.department && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.department.message}
                            </p>
                        )}

                    </div>


                    {/* Year */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Year
                        </label>

                        <input
                            type="number"
                            placeholder="2026"
                            {...register("year", {
                                required: "Year is required",
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.year && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.year.message}
                            </p>
                        )}

                    </div>


                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Password
                        </label>

                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.password.message}
                            </p>
                        )}

                    </div>


                    {/* Confirm Password */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: value =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                    </div>


                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
                    >
                        Create Account
                    </button>

                </form>


                <p className="mt-6 text-center text-sm text-slate-400">

                    Already have an account?

                    <button
                        onClick={() => navigate("/student/login")}
                        className="ml-1 text-blue-400"
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    );
}

export default StudentRegister;