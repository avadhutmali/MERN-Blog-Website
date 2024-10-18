import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

function IndexPage() {
  const [post, setPost] = useState([])
  useEffect(()=>{
    const response = fetch('http://localhost:3000/post').then(response=>{
      response.json().then(post=>{
        setPost(post);
      });
    })
  },[])
  return (
    <div>
        {post.length>0 && post.map(
          (post,idx) =><Post key={idx} {...post}/>
        )}
    </div>
  )
}

export default IndexPage