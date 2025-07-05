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
        <div className='w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-400 cursor-pointer group'>
            <div className='w-full flex justify-center mb-4'>
                <img src={imageurl} alt={title} className='rounded-xl max-h-48 object-cover shadow group-hover:scale-105 transition-transform duration-200'/>
            </div>
            <h2 className='text-xl font-bold text-gray-800 group-hover:text-blue-600 mb-2 truncate'>{title}</h2>
        </div>
    </Link>
  )
}

export default Postcard
