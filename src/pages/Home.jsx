
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
            <div className='flex flex-wrap'>
                <div className='p-2 w-full'>
                    <h1 className='text-wxl font-bold hover:text-gray-500'>
                        Login to read Posts
                    </h1>
                </div>
            </div>
        </Container>
    )
  }

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard post={post}/>
                        {/* <Postcard {...post}/> */}
                    </div>
                ))}
            </div>
        </Container>

    </div>
  )
}

export default Home
