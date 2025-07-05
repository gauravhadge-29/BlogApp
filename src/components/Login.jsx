import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData?.userData);

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    
                }
                
            }
        } catch (error) {
            setError(error.message)
        }
    }

    // Redirect to home page after successful login
    React.useEffect(() => {
        if (userData) {
            navigate("/");
        }
    }, [userData, navigate]);   

    return (
        <div className='flex items-center justify-center min-h-[80vh] bg-gray-50'>
            <div className='mx-auto w-full max-w-lg bg-white rounded-3xl p-10 border border-gray-200 shadow'>
                <div className='mb-4 flex justify-center'>
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800 mb-2">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-500">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-800 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className='text-red-500 mt-8 text-center font-semibold'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Email :"
                        placeholder="Enter your Email "
                        type = "email"
                        className="bg-white text-gray-800 focus:bg-gray-50 border border-gray-200"
                        {...register("email", {
                            required : true,
                            validate : {
                                matchPattern: (value)=> /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) || "Email address must be a valid address"
                            }
                        })}
                        />
                        <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your Password"
                        className="bg-white text-gray-800 focus:bg-gray-50 border border-gray-200"
                        {...register("password",{
                            required:true
                        })}
                        />
                        <Button
                        type="submit"
                        className='w-full font-bold shadow bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200'
                        >Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
