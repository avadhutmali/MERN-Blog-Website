import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContest } from './UserContest';

function LoginPage() {
  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');
  const[redirect,setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContest)

  const login=async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/login',{
      method :"POST",
      body: JSON.stringify({username,password}),
      headers :{'Content-Type' :'application/json'},
      credentials: "include",
    })
    if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
        setRedirect(true)
      })
      setRedirect(true)
    }else{
      alert('Wrong credentials')
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  
  return (
    <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input type="text" name="" placeholder='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="password" name="" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button>Login</button>
      
    </form>
  )
}

export default LoginPage