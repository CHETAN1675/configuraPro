import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../features/auth/authSlice";
import { loadCart } from "../services/cartService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Auth({ onSuccess }) {

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const { loading, error, userEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userEmail) dispatch(loadCart(userEmail));
  }, [userEmail, dispatch]);
  
  useEffect(() => {
  if (userEmail && onSuccess) {
    onSuccess();
  }
}, [userEmail, onSuccess]);
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLocalError("");
    setShowPassword(false);
  };

  const toggleMode = () => {
    if (loading) return;
    setIsSignup((p) => !p);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Email and password are required");
      return;
    }

    if (isSignup && password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    isSignup
      ? dispatch(signupUser({ email, password }))
      : dispatch(loginUser({ email, password }));
  };

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onSuccess}
    />

    {/* Modal */}
    <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
      {/* Header */}
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        {isSignup ? "Create Account" : "Welcome Back"}
      </h2>

      {/* Error */}
      {(localError || error) && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {localError || error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="mb-1 block text-sm text-gray-400">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm text-gray-400">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 pr-10 text-white focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        {isSignup && (
          <div>
            <label className="mb-1 block text-sm text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      {/* Toggle */}
      <p className="mt-4 text-center text-sm text-gray-400">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          onClick={toggleMode}
          disabled={loading}
          className="font-medium text-blue-500 hover:underline"
        >
          {isSignup ? "Login" : "Sign up"}
        </button>
      </p>
    </div>
  </div>
);
}
