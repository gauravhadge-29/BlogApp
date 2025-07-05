import React,{useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues:{
        title: post?.title || '',
        slug : post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active'
    },
    })

    const [image,setImage] = React.useState(null)

    const navigate = useNavigate()
    const userData = useSelector(state => state.userData.userData)

    console.log("Post details : ",post)

    const url = post ? service.getFileView(post.featuredImage).then((url)=>setImage(url)) : null
    

    const submit = async(data)=>{
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
            
            if(file){
                await service.deleteFile(post.featuredImage)
                console.log("File upload successful")
            } 

            if(data) console.log(data)

            const dbPost = await service.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if(dbPost) console.log("Post updated successfully")

            if(dbPost){
              navigate(`/post/${dbPost.$id}`)
              
            }
        }

        else{
            const file = await service.uploadFile(data.image[0])

            if (!file) {
            console.log("File upload failed.");
            
            }else{
                console.log("File upload successful")
                if(userData) console.log("User Data :: " , userData.$id)
            }

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userId : userData.$id,
                })

                if(dbPost) navigate(`/post/${dbPost.$id}`)
            }

        }
    }

    const slugTransform = useCallback((value)=>{
            if (value && typeof value === 'string') {
                const slug = value.toLowerCase().replace(/ /g,'-')
                setValue('slug',slug)
                return slug
            }
            return ''
        },[])

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,
                    {shouldValidate:true}
                ))
            }
        })
        return () =>{
            subscription.unsubscribe()        
        }
    },[watch,slugTransform,setValue])

    if (!userData) {
        return <div className="bg-white text-gray-700 p-8 rounded-2xl shadow text-center mt-8 border border-gray-200">Please log in to create or edit posts.</div>;
    }
 
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mt-8">
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-8">
        <div className="w-full md:w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 bg-white text-gray-800 focus:bg-gray-50 border border-gray-200"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4 bg-white text-gray-800 focus:bg-gray-50 border border-gray-200"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-full md:w-1/3 px-2 flex flex-col gap-4">
          <label className="block text-gray-700 font-semibold mb-2">Featured Image :</label>
          <Input
            type="file"
            className="mb-2 bg-white text-gray-800 file:bg-blue-100 file:text-blue-700 file:rounded-lg file:border-none file:px-4 file:py-2 file:mr-4 file:cursor-pointer border border-gray-200"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4 flex justify-center">
              <img
                src={image}
                alt={post.title}
                className="rounded-lg max-h-40 object-cover border-2 border-blue-100 shadow"
              />
            </div>
          )}
          
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4 bg-white text-gray-800 focus:bg-gray-50 border-gray-200"
            {...register("status", { required: true })}
          />
          <Button type="submit" bgColor={post ? "bg-blue-500 hover:bg-blue-400" : "bg-blue-600 hover:bg-blue-500"} textColor="text-white" className="w-full font-bold shadow transition-all duration-200">
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
