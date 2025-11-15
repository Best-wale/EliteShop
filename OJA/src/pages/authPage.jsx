import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
function AuthPage() {
  useEffect(() => {
      document.title = "EliteShop - login/signup";
    }, []);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  if (mode === "signup" && form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    setLoading(false);
    return;
  }

  try {
    if (mode === "login") {
      // JWT login
      const res = await fetch(`${apiUrl}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.access) {
        setSuccess("Login successful!");
        setError("");
        // Store token (localStorage or context)
        localStorage.setItem("access_token", data.access);
        console.log("Access Token:", data.access);
        // Optionally redirect
        navigate("/");
      } else {
        setError(data.detail || "Invalid credentials.");
        setSuccess("");
      }
    } else {
      // Signup
      const res = await fetch(`${apiUrl}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          first_name: form.firstname,
          last_name: form.lastname
        }),
      });
      const data = await res.json();
      
      if (res.ok && data.access) {
        localStorage.setItem("access_token", data.access);
        console.log("Access Token:", data.access);

        setSuccess("Signup successful! You can now log in.");
        navigate('/')
        setError("");
        setForm({
          username: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        //setMode("login");
      } else {
        setError(data.detail || "Signup failed.");
        setSuccess("");
      }
    }
  } catch (err) {
    setError("Network error.");
    setSuccess("");
  }
  setLoading(false);
};

  const isDisabled =
    loading ||
    !form.username ||
    !form.password ||
    (mode === "signup" && (!form.email || !form.confirmPassword));

  // Dummy OAuth handlers
  const handleOAuth = provider => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Logged in with ${provider}!`);
      setError("");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-accent px-5 ">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-screen-lg flex overflow-hidden relative">
        {/* Return Icon */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-primary/10 transition-colors"
          title="Go back"
        >
          <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Left side: illustration or branding */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary text-white w-1/2 p-8">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" strokeWidth="4" />
              <path strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M16 24l6 6 10-10" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">EliteShop</h2>
          <p className="text-lg">Your trusted e-commerce admin portal</p>
        </div>
        {/* Right side: form */}
        <div className="flex-1 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {mode === "login"
                ? "Login to your admin dashboard"
                : "Sign up to manage your shop"}
            </p>
          </div>
         { /* OAuth Buttons */}
                <div className="flex flex-col gap-3 mb-6 text-black dark:text-white">
                <button
                  type="button"
                  onClick={() => handleOAuth("Google")}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={loading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <g>
                    <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.2-7.6 20.7-17.5H44.5z" />
                    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z" />
                    <path fill="#FBBC05" d="M24 45c5.8 0 10.7-1.9 14.6-5.2l-6.8-5.6C29.9 36.7 27.1 37.5 24 37.5c-5.7 0-10.5-3.7-12.2-8.8l-7 5.4C7.2 41.2 14.9 45 24 45z" />
                    <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-4.7 0-8.6-3.8-8.6-8.5s3.9-8.5 8.6-8.5c2.1 0 4 .7 5.5 2.1l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z" />
                  </g>
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth("GitHub")}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={loading}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.99 0 1.99.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
                  </svg>
                  Continue with GitHub
                </button>
                </div>
                <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="mx-4 text-gray-400 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                </div>
                <form className="space-y-5 text-black dark:text-white" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                </div>
                {mode === "signup" && (
                  <>
                <div>
                  <label className="block text-sm font-medium mb-2">Firstname</label>
                  <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  placeholder="Enter your firstname"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Lastname</label>
                  <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  placeholder="Enter your lastname"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                </div>
                
                  <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                  </div>
                  </>
                )}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                  <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-primary"
                  tabIndex={-1}
                  >
                  {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {mode === "signup" && (
                  <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                  </div>
                )}
                {error && (
                  <div className="text-red-600 text-sm font-medium">{error}</div>
                )}
                {success && (
                  <div className="text-green-600 text-sm font-medium">{success}</div>
                )}
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors ${
                  isDisabled ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Signing up..."
                  : mode === "login"
                  ? "Login"
                  : "Sign Up"}
                </button>
                </form>
                <div className="mt-6 text-center">
                <button
                  className="text-primary hover:underline font-medium"
                  onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
                setSuccess("");
              }}
            >
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;