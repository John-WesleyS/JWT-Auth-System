import { useForm } from "react-hook-form";
import { registerStudent } from "../../services/auth.service";

function StudentRegister() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {

            const response = await registerStudent(data);

            console.log(
                "Student registration successful:",
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

            <h1>Student Registration</h1>

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


                {/* Roll Number */}

                <input
                    type="text"
                    placeholder="Roll Number"
                    {...register("rollNumber", {
                        required: "Roll number is required",
                    })}
                />

                {errors.rollNumber && (
                    <p>{errors.rollNumber.message}</p>
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


                {/* Year */}

                <input
                    type="number"
                    placeholder="Year"
                    {...register("year", {
                        required: "Year is required",
                        min: {
                            value: 1,
                            message: "Year must be between 1 and 4",
                        },
                        max: {
                            value: 4,
                            message: "Year must be between 1 and 4",
                        },
                    })}
                />

                {errors.year && (
                    <p>{errors.year.message}</p>
                )}


                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Creating Account..."
                        : "Create Student Account"}
                </button>

            </form>

        </div>
    );
}

export default StudentRegister;