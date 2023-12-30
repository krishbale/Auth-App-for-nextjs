'use client'
import { useState } from 'react';

export default function Register() {
    const[user, setUser] = useState({
        username:"",
        password:"",
        email:""
    })
    const [message, setMessage] = useState('');
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
                    email:user.email
                }),
            });
            const data = await response.json();
            if ( response.status === 200) {
                setMessage(data.message);
            } else {
                console.error("Registration failed");
                setMessage(data.message);
            }
        }catch(e){
            console.log(e)
            setMessage("Error Submitting Request . Please try Again");
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
                    <label htmlFor="email">email</label>
                    <input
                        type="text"
                        id="email"
                        name='email'
                        placeholder='Enter your email'
                        value={user.email}
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
              
               <p>{message}</p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
