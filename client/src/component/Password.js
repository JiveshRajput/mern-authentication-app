import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import { useAuthStore } from '../store/store';
import { errorToaster, successToaster } from '../helper/toasters';
import useFetch from '../hooks/fetch.hook';
import { verifyPassword } from '../helper/axios';

export default function Password() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ apiData }] = useFetch(`user/${username}`);

  async function handleFormSubmit(data) {
    if (data.password) {
      const response = await verifyPassword({ username, password: data.password });
      if (response?.error) {
        errorToaster(response?.error);
      } else {
        if (response?.data?.token) {
          localStorage.setItem('token', response.data.token);
        }
        successToaster(response?.data.message);
        navigate('/profile');
      }
    }
    reset();
  }

  // To Show Error Toast
  useEffect(() => {
    if (errors.password) {
      errorToaster(errors.password?.message, { duration: 1500 });
    }
  }, [errors.password])

  return (
    <>
      <div className=" w-screen h-screen">
        <div className="flex justify-center items-center h-full">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Hello {username || 'World'}!</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">Explore more by contacting with us.</span>
            </div>
            <form className="py-1" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="profile flex justify-center py-4">
                <img alt='avtar' className={styles.profile_img} src={apiData?.user?.profile || avatar} />
              </div>
              <div className="textbox flex  flex-col items-center">
                <input type="password" placeholder='Password' className={styles.textbox} {...register('password', { required: { value: true, message: 'Password is required.' }, minLength: { value: 3, message: 'Password length is min 3 characters' }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Password must have Minimum 8 characters, atleast 1 uppercase, 1 lowercase, 1 number and 1 special character' } })} />
                <button type='submit' className={styles.btn}>Sign In</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Forgot Password? <Link to='/recovery' className='text-red-500'>Reset Password</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


