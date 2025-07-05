import React,{useState,useEffect} from 'react'
import service from '../appwrite/config'
import {Container, Postcard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    useEffect(()=>{
        service.getPosts([])
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch(()=>{
          setError("Error in fetching posts.")
        })
    },[])
    
    if (error) {
      return (
        <Container>
          <div className='flex flex-wrap min-h-[60vh] items-center justify-center bg-gray-50 rounded-2xl shadow-sm mt-8'>
            <div className='p-8 w-full text-center'>
              <h1 className='text-3xl font-bold text-gray-800 mb-4'>Something went wrong</h1>
              <p className='text-lg text-gray-500'>{error}</p>
            </div>
          </div>
        </Container>
      )
    }

    if (posts.length === 0) {
      return (
        <Container>
          <div className='flex flex-wrap min-h-[60vh] items-center justify-center bg-gray-50 rounded-2xl shadow-sm mt-8'>
            <div className='p-8 w-full text-center'>
              <h1 className='text-3xl font-bold text-gray-800 mb-4'>No Posts Yet</h1>
              <p className='text-lg text-gray-500'>Be the first to share your story!</p>
            </div>
          </div>
        </Container>
      )
    }

    return (
      <div className='w-full py-8 bg-gray-50 min-h-[80vh]'>
        <Container>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {posts.map((post)=>(
              <Postcard key={post.$id} post={post}/>
            ))}
          </div>
        </Container>
      </div>
    ) 
}

export default AllPosts
