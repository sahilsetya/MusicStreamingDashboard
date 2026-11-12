
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (!data.user || !data.token) {
        throw new Error("The registration response was missing user or token data.");
      }

      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#15151d] border border-white/10 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Join Music Dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-gray-300 text-sm">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-lg bg-[#0b0b0f] text-white border border-white/10 outline-none focus:border-purple-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-lg bg-[#0b0b0f] text-white border border-white/10 outline-none focus:border-purple-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full mt-2 p-3 rounded-lg bg-[#0b0b0f] text-white border border-white/10 outline-none focus:border-purple-500"
              placeholder="Minimum 6 characters"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-gray-400 text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
