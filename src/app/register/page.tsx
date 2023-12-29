'use client'
import { useState } from 'react';

export default function Register() {
    const[user, setUser] = useState({
        username:"",
        password:"",
        role:"user",
    })
    const [status, setStatus] = useState('');
    function handleChange(e:any) {
        const name = e.target.name;
        const value = e.target.value;
      
        setUser((prevUser) => ({...prevUser, [name] : value}));
      }

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username:user.username,
                    password:user.password,
                    role:user.role
                }),
            });
    
            if (response.ok) {
                console.log("Registration successful");
                setStatus("success");
                // Redirect or update UI accordingly
            } else {
                console.error("Registration failed");
                setStatus("failed");
                // Handle errors (e.g., display error message)
            }
        }catch(e){
            console.log(e)
            setStatus("failed");
        }
       
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name='username'
                        placeholder='Enter your username'
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
                        name='password'
                        placeholder='Enter your password'
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select id="role" name='role'  value={user.role}
                         onChange={handleChange} required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="author">Author</option>
                    </select>
                </div>
                {status === '200' && <p >Register Successfull</p>}
                {status === '404' && <p >No Please try again.</p>}
                {status === '422' && <p >There was an error submitting your message. Please try again.</p>}
                {status === '500' && <p >There was an error submitting your message. Please try again.</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
