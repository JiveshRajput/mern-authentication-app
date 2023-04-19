import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

export default function Username() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  function handleFormSubmit(data) {
    toast.success(data.username, {
      position: 'top-center',
      duration: 2000
    });  
    reset();
    navigate('/password')
  }

  useEffect(() => {
    if (errors.username) {
      toast.error(errors.username?.message, {duration: 1000});
    }
  }, [errors.username])

  return (
    <>
      <div className=" w-screen h-screen">
        <div className="flex justify-center items-center h-full">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Hello World!</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">Explore more by contacting with us.</span>
            </div>
            <form className="py-1" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="profile flex justify-center py-4">
                <img alt='avtar' className={styles.profile_img} src={avatar} />
              </div>
              <div className="textbox flex  flex-col items-center">
                <input type="text" placeholder='Username' className={styles.textbox} {...register('username', { required: {value: true, message: 'Enter Username Required!'}, minLength: { value: 3, message: 'Enter min 3 characters' } })} />
                <button type='submit' className={styles.btn}>Let's Go</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Not a member <Link to='/register' className='text-red-500'>Register Now</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
