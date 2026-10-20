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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />

      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
        placeholder="Username"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
        placeholder="Password"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : buttonDisabled
          ? "Enter details"
          : "Signup"}
      </button>

      <Link href="/login">Visit login page</Link>
    </div>
  );
}
