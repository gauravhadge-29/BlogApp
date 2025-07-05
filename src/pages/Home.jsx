import React,{useEffect,useState} from 'react'
import service from '../appwrite/config'
import { Container,Postcard } from '../components'

function Home() {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        service.getPosts()
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

  if(posts.length === 0){
    return (
        <Container>
            <div className='flex flex-wrap min-h-[60vh] items-center justify-center bg-gray-50 rounded-2xl shadow-sm mt-8'>
                <div className='p-8 w-full text-center'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>Welcome to Blogger</h1>
                    <p className='text-lg text-gray-500'>Login to read Posts or start sharing your own stories!</p>
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

export default Home
