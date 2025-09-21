import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm()
    const { loading, signIn } = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()
    console.log(location);

    const from = location.state?.from || '/'

    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Logged In Successfully",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(from)
            })
            .catch(error => {
                const errorMessage = error.message.replace("Firebase: ", "").replace(/\(auth.*\)/, "").trim();
                console.log(error);
                Swal.fire({
                    title: "Login Failed",
                    text: errorMessage,
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "Try Again"
                });
            })
    }
    if (loading) {
        <p>loading....</p>
    }
    return (
        <div className="flex flex-col min-h-[calc(100vh-6rem)]">
            <Link to='/' className="text-white font-semibold p-4">← Home</Link>
            <div className='flex justify-center items-center flex-grow'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-blue-100  rounded-lg shadow-2xl p-10 '>
                    <h2 className='primary-color mb-10 text-2xl font-bold text-center '>Login Your Account</h2>
                    <div className='grid grid-cols-1 gap-5'>

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
                            <button type='submit'
                                className='btn text-white w-full rounded-lg bg-[#112a44] hover:bg-blue-900'>
                                Login
                            </button>
                        </div>

                    </div>
                    {/* text */}

                    <p className='text-sm text-center'>Don't Have an Account? <Link to='/register' className='primary-color underline font-bold'>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;