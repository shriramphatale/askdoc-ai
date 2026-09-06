import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData);
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-[450px] p-4">
      <div>
        <h1 className="text-xl font-bold text-[#E5E5E5]">
            Login to your account
        </h1>

        <p className="text-sm text-[#A1A1A1]">
            Enter your email below to login to your account
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={ handleSubmit }>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#E5E5E5] tracking-wide">
            Email
          </label>

          <input
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            required
            onChange={(e) => 
              setFormData({ ...formData, email: e.target.value })
            }
            className="h-10 w-full border border-[#373737] bg-[#151515] px-3 py-2 text-sm text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:border-[#FAFAFA] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#E5E5E5] tracking-wide">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={ formData.password }
              required
              onChange={ (e) => 
                setFormData({ ...formData, password: e.target.value })
              }
              className="h-10 w-full border border-[#373737] bg-[#151515] px-3 py-2 text-sm text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:border-[#FAFAFA] focus:outline-none pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#E5E5E5] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>

          <button type="submit" className="h-10 w-full bg-[#FAFAFA] text-[#151515] mt-2">
            Login
          </button>

          <p className="text-sm text-[#A1A1A1] text-center mt-1">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#E5E5E5] hover:text-[#FAFAFA] underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;