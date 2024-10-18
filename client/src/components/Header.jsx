import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { UserContest } from '../Pages/UserContest';

function Header() {
  const {userInfo,setUserInfo} = useContext(UserContest);
    useEffect(()=>{
      fetch('http://localhost:3000/profile',{
        credentials:'include',
      },[]).then(Response=>{
        Response.json().then(userInfo=>{
            setUserInfo(userInfo)
        })
      })
    },[])

  function logout(){
    fetch('http://localhost:3000/logout',{
      credentials:'include',
      method:'POST'
    })
    setUserInfo(null)
  }

  const username = userInfo?.username
  return (
    <header>
        <Link to="/" className="logo">My Blog</Link>
        <nav>
          {username && (
            <>
              <Link to='/create'>Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username &&(
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
    </header>
  )
}

export default Header