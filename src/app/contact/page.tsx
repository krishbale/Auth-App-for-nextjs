'use client'
import React, { useState } from 'react'

const Page = () => {
  const[user, setUser] = useState({
    username:"",
    email:"",
    phone:"",
    message:""
})
function handleChange(e:any) {
  const name = e.target.name;
  const value = e.target.value;

  setUser((prevUser) => ({...prevUser, [name] : value}));
}
const [status, setStatus] = useState('');
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try{
          const response = await fetch('/api/contact', {
              method:'POST',
              headers:{"Content_Type":"application/json"},
              body: JSON.stringify({
                  username:user.username,
                  email:user.email,
                  phone:user.phone,
                  message:user.message
              })
          })
          // Set the status based on the response from the API route
          if (response.status === 200) {
              setUser({
                  username: "",
                  email: "",
                  phone: "",
                  message: ""
              })
              setStatus("success");
          } else {
              setStatus("failed");
          }

    }catch(e){
        setStatus("failed");
        console.log(e)
   
    }
  }
  return (
    <div>
      <h1>Hello world</h1>
      <form  onSubmit={handleSubmit}>
            <div >
                <label htmlFor="username" >
                    Enter your name
                    <input 
                     type="text"
                     name="username"
                     id="username"
                     placeholder="Enter your name"
                    value={user.username}
                    onChange={handleChange}
                    required
                    />
                </label>
            </div>

            <div >
                <label htmlFor="email" >
                    Email
                    <input type="text" name="email" id="email"
                           placeholder="Enter your email"
                           value={user.email}
                           onChange={handleChange}
                           required
                           autoComplete="off"
                    />
                </label>
            </div>

            <div >
                <label htmlFor="phone">
                    Phone Number
                    <input type="number" name="phone" id="phone"
                           placeholder="Enter your phone"
                           value={user.phone}
                           onChange={handleChange}
                           required
                            autoComplete="off"
                    />
                </label>
            </div>

            <div >
                <label htmlFor="message" >
                    Message
                    <textarea  name="message" id="message" rows={5}
                           placeholder="Enter your Message"
                               value={user.message}
                               onChange={handleChange}
                               required
                                autoComplete="off"
                    />
                </label>
            </div>

            <div>
                {status === 'success' && <p >Thank you for your message!</p>}
                {status === 'failed' && <p >There was an error submitting your message. Please try again.</p>}

                <button type="submit" >Send Message</button>
            </div>
        </form>
    </div>
  )
}

export default Page