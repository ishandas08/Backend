"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup API response:", response.status, response.data);

      if (response.data.success) {
        window.location.replace("/login");
      } else {
        toast.error(response.data.error || "Signup failed");
      }
    } catch (error: unknown) {
      console.error("Signup failed:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error || "Signup request failed"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      <div className="w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {loading ? "Processing..." : "Create Account"}
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign up to get started
        </p>

        <hr className="mb-6 border-gray-200" />

        <label
          htmlFor="username"
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          Username
        </label>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
          placeholder="Enter your username"
        />

        <label
          htmlFor="email"
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          Email Address
        </label>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          placeholder="Enter your email"
        />

        <label
          htmlFor="password"
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          Password
        </label>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
          placeholder="Create a password"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className="w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Processing..."
            : buttonDisabled
            ? "Enter details"
            : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:text-purple-700 hover:underline transition"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}