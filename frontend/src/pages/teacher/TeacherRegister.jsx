import { useForm } from "react-hook-form";
import { registerTeacher } from "../../services/auth.service";

function TeacherRegister() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {

        data.subjects = data.subjects
            .split(",")
            .map(subject => subject.trim())
            .filter(subject => subject !== "");

        try {

            const response = await registerTeacher(data);

            console.log(
                "Teacher registration successful:",
                response.data
            );

        } catch (error) {

            console.error(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div>

            <h1>Teacher Registration</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}

                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                        },
                    })}
                />

                {errors.name && (
                    <p>{errors.name.message}</p>
                )}


                {/* Email */}

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />

                {errors.email && (
                    <p>{errors.email.message}</p>
                )}


                {/* Password */}

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />

                {errors.password && (
                    <p>{errors.password.message}</p>
                )}


                {/* Employee ID */}

                <input
                    type="text"
                    placeholder="Employee ID"
                    {...register("employeeId", {
                        required: "Employee ID is required",
                    })}
                />

                {errors.employeeId && (
                    <p>{errors.employeeId.message}</p>
                )}


                {/* Department */}

                <input
                    type="text"
                    placeholder="Department"
                    {...register("department", {
                        required: "Department is required",
                    })}
                />

                {errors.department && (
                    <p>{errors.department.message}</p>
                )}


                {/* Subjects */}

                <input
                    type="text"
                    placeholder="Subjects (comma separated)"
                    {...register("subjects", {
                        required: "At least one subject is required",
                    })}
                />

                {errors.subjects && (
                    <p>{errors.subjects.message}</p>
                )}


                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Creating Account..."
                        : "Create Teacher Account"}
                </button>

            </form>

        </div>
    );
}

export default TeacherRegister;