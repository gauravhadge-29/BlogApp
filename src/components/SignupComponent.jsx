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
                if (userData) dispatch(login(userData))
                navigate('/')
            }

        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex flex-col items-center jsutify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black-10`}>
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                        label="Full Name :"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true
                        })}
                    />
                    <Input
                        label="Email :"
                        placeholder="Enter your Email "
                        type="email"
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
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button
                        type="submit"
                        className='w-full'
                    >
                    Create Account</Button>
                </div>
            </form>
        </div>
    )
}


