import React, { use, useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export default function SignupComponent() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }

        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center min-h-[80vh] bg-gray-50'>
            <div className='mx-auto w-full max-w-lg bg-white rounded-3xl p-10 border border-gray-200 shadow'>
                <span className="inline-block w-full max-w-[100px] mb-4 flex justify-center">
                    <Logo width="100%" />
                </span>
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800 mb-2">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-800 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center font-semibold'>{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name :"
                            placeholder="Enter your full name"
                            className="bg-white text-gray-800 focus:bg-gray-50 border border-gray-200"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email :"
                            placeholder="Enter your Email "
                            type="email"
                            className="bg-white text-gray-800 focus:bg-gray-50 border border-gray-200"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) || "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your Password"
                            className="bg-white text-gray-800 focus:bg-gray-50 border border-gray-200"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            className='w-full font-bold shadow bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200'
                        >
                        Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}


