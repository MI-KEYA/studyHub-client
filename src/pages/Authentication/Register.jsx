import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import StudyHubLogo from '../shared/StudyHubLogo/StudyHubLogo';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SocialLogin from './SocialLogin';

const Register = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser } = useContext(AuthContext)

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-6rem)]">
            <Link to='/' className="text-white font-semibold p-4">← Home</Link>
            <div className='flex justify-center items-center flex-grow'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-blue-100 rounded-lg shadow-2xl p-10 '>
                    <h2 className='primary-color mb-10 text-2xl font-bold text-center'>Create an Account</h2>
                    <div className='grid grid-cols-1 gap-5'>
                        {/* name field */}
                        <div>
                            <label htmlFor='name' className=' text-gray-700 font-semibold mb-2'>Enter Your Name</label>
                            <input
                                type="text"
                                id='name'
                                placeholder='Enter Name'
                                className='w-full shadow-lg p-3 rounded-lg'
                                {...register('name', { required: "Name is required" })}
                            />
                            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
                        </div>

                        {/* email field */}
                        <div>
                            <label htmlFor='email' className=' text-gray-700 font-semibold mb-2'>Enter Your Email</label>
                            <input
                                type="text"
                                id='email'
                                placeholder='Enter Email'
                                className='w-full shadow-lg p-3 rounded-lg '
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor='password' className=' text-gray-700 font-semibold mb-2'>Enter Your Password</label>
                            <input
                                type="password"
                                id='password'
                                placeholder='Enter Password'
                                className='w-full shadow-lg p-3 rounded-lg'
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                        </div>

                        {/* submit Button */}
                        <div>
                            <button
                                type='submit'
                                className=' btn w-full rounded-lg font-bold text-white transition-all duration-300 bg-[#112a44] hover:bg-blue-900'
                            >
                                Register
                            </button>
                        </div>
                    </div>
                    {/* text */}
                    <p className='text-sm text-center mt-5'>
                        Already Have an Account? <Link to='/login' className='text-blue-900 underline font-bold'>Login</Link>
                    </p>
                    <SocialLogin />
                </form>
            </div >
        </div>
    );
};

export default Register;