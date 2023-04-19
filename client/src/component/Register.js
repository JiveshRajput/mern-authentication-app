import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { convertToBase64 } from '../helper/convert'

export default function Register() {
    const [file, setFile] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const validations = {
        username: {
            required: { value: true, message: 'Username is Required!' },
            minLength: { value: 3, message: 'Enter min 3 characters in Username' }
        },
        email: {
            required: { value: true, message: 'Email is Required!' }
        },
        password: {
            required: { value: true, message: 'Password is required.' },
            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Password must have Minimum 8 characters, atleast 1 uppercase, 1 lowercase, 1 number and 1 special character' }
        }
    }

    async function onImageUpload(e) {
        let base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    function handleFormSubmit(data) {
        toast.success('Successfully Logged In', { position: 'top-center', duration: 2000 });
        console.log({ ...data, profile: file || '' });
        reset();
    }

    // To Show Error Toast
    useEffect(() => {
        if (errors.password) {
            toast.error(errors.password?.message, { duration: 1500 });
        }
    }, [errors.password])

    useEffect(() => {
        if (errors.username) {
            toast.error(errors.username?.message, { duration: 1500 });
        }
    }, [errors.username])

    useEffect(() => {
        if (errors.email) {
            toast.error(errors.email?.message, { duration: 1500 });
        }
    }, [errors.email])

    return (
        <>
            <div className="w-screen h-screen">
                <div className="flex justify-center items-center h-full">
                    <div className={styles.glass}>
                        <div className="title flex flex-col items-center">
                            <h4 className='text-5xl font-bold'>Register</h4>
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Happy to join you!.</span>
                        </div>
                        <form className="py-1" onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="profile flex justify-center py-4">
                                <label htmlFor='profile'>
                                    <img alt='avtar' className={styles.profile_img} src={file || avatar} />
                                </label>
                                <input type="file" id="profile" accept="image/png, image/jpeg" className='hidden' onChange={onImageUpload} />
                            </div>
                            <div className="textbox flex  flex-col items-center">
                                <input type="text" placeholder='Username *' className={styles.textbox} {...register('username', { ...validations.username })} />
                                <input type="email" placeholder='Email *' className={styles.textbox} {...register('email', { ...validations.email })} />
                                <input type="password" placeholder='Password *' className={styles.textbox} {...register('password', { ...validations.password })} />
                                <button type='submit' className={styles.btn}>Let's Go</button>
                            </div>
                            <div className="text-center py-4">
                                <span className='text-gray-500'>Already Registered? <Link to='/' className='text-red-500'>Login Now</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


