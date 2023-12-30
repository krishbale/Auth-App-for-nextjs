"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();
  console.log("status", status);
  console.log("session", session);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  if (session && session.user) {
    return (
      <>
        <h1>{session.user && session.user.email}</h1>
        <button onClick={() => signOut()}>Sign out </button>
      </>
    );
  }

  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      signIn('credentials',{
        username:user.username,
        password:user.password,
        redirect:false
      })
    } catch (e) {
      setMessage("Server Error , Please Try Again");
    }
    return { error:"something went wrong"}
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <p>{message}</p>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => signIn("github")}>Github Sign in</button>
      <button onClick={() => signIn("google")}>Google Sign in</button>
    </div>
  );
}
