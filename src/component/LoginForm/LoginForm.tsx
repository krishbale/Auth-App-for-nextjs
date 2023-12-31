'use client'

import { useFormState } from "react-dom";
import { login } from '@/backend/lib/action'
import Link from "next/link";
import style from './loginform.module.css'
export default function Login() {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <div>
      <h1>Login</h1>
      <form  className={style.form} action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
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
            required
          />
        </div>

        <button type="submit">Login</button>
        <br />
        {state?.error}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
     
 
    </div>
  );
}
