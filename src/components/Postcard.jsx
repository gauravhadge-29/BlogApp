import React, { useState } from 'react'
import service from '../appwrite/config'
import {Link} from 'react-router-dom'

function Postcard({post}) {
  const {$id , title , featuredImage} = post
  const [imageurl,setImageurl] = useState(null)

  service.getFileView(featuredImage)
  .then((url)=>setImageurl(url))
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={imageurl} alt={title} className='rounded-xl' />
            </div>

            <h2
            className='rext-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default Postcard
