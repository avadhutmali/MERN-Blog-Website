import React from 'react'
import "./App.css"  
import Post from './components/Post'
import Header from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import { UserContestProvider } from './Pages/UserContest'
import CreatePost from './Pages/CreatePost'
import PostPage from './Pages/PostPage'
import EditPost from './Pages/EditPost'

function App() {
  return (
    <>
    <UserContestProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/post/:id' element={<PostPage/>}/>
        <Route path='/edit/:id' element={<EditPost/>}/>
      </Route>
    </Routes>
    </UserContestProvider>
    
    </>
  )
}

export default App