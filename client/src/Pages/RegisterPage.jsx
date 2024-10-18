import React, { useState } from 'react'

function RegisterPage() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  async function register(ev){
    ev.preventDefault();
    const respose = await fetch("http://localhost:3000/register",{
      method: "POST",
      body: JSON.stringify({username,password}),
      headers :{'Content-Type' :'application/json'},
    })
    if(respose.status===200){
      alert("Registration Succesful")
    }else{
      alert("Registration failed")
    }
  }

  return (
    <form className='register' onSubmit={register}>
        <h1>Register</h1>
        <input type="text" name="" 
          placeholder='username' 
          value={username} 
          onChange={ev=>{setUsername(ev.target.value)}}/>
        <input type="password" name="" 
          placeholder='Password' 
          value={password} 
          onChange={ev=>{setPassword(ev.target.value)}}/>
        <button>Register</button>
    </form>
  )
}

export default RegisterPage