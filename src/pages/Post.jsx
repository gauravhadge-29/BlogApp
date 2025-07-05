import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [image,setImage] = useState(null) 
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userData?.userData);
    

    const isAuthor = post && userData ? post.userId === userData.$id : false;


    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post){
                    setPost(post);
                    appwriteService.getFileView(post.featuredImage)
                    .then((url)=>setImage(url))
                } 
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-12 bg-gray-50 min-h-[80vh] flex items-center justify-center">
            <Container>
                <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="relative w-full h-72 md:h-96 overflow-hidden">
                        <img
                            src={image}
                            alt={post.title}
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-end p-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-lg">{post.title}</h1>
                        </div>
                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-blue-500 hover:bg-blue-400" textColor="text-white" className="font-bold shadow">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500 hover:bg-red-400" textColor="text-white" className="font-bold shadow" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="p-8">
                        <div className="browser-css text-gray-800 text-lg leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}