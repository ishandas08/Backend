
"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>signup</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
          placeholder="username"
        />
      </div>
    );
  };
}
