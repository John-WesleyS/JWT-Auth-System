import { useForm } from "react-hook-form";
import { loginStudent } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function StudentLogin() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const { login } = useAuth();

    const onSubmit = async (data) => {

        try {

            const response = await loginStudent(data);

            login(response.data);

            console.log("Student login successful");

        } catch (error) {

            console.error(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div>

            <h1>Student Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

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

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Logging in..."
                        : "Login"}
                </button>

            </form>

        </div>
    );
}

export default StudentLogin;