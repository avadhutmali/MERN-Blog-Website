import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Navigate, useParams} from 'react-router-dom'
import Editor from './Editor'


function EditPost() {
    const {id} =useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] =useState('');
    const [content,setContent] = useState('');
    const [files,setFiles]  = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:3000/post/'+id)
            .then(response=>{
                response.json().then(postInfo=>{
                    setTitle(postInfo.title)
                    setContent(postInfo.content)
                    setSummary(postInfo.summary)
                })
            })
    },[])

    
    async function UpdatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id' , id)
        if(files?.[0]){
            data.set('file',files?.[0])
        }


        await fetch('http://localhost:3000/post',{
            method :'PUT',
            body :data,
            credentials:'include'
        });
         setRedirect(true)
        
        
    }
    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }
    
    return (
      <form action="" onSubmit={UpdatePost}>
          <input type="title" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <input type="summary" placeholder='Summary' value={summary} onChange={(e)=>setSummary(e.target.value)}/>
          <input type="file"  on onChange={(e)=>{setFiles(e.target.files)}}/>
          <Editor onChange={setContent} value={content}/>
          <button style={{marginTop:'5px'}}>Edit Post</button>
      </form>
    )
}

export default EditPost