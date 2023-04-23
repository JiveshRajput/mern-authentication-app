import React, { useEffect } from 'react'
import styles from '../styles/Username.module.css'
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from 'react-router-dom';
import { errorToaster, successToaster } from '../helper/toasters';
import { resetPassword } from '../helper/axios';
import { useAuthStore } from "../store/store";
import useFetch from '../hooks/fetch.hook'

export default function Reset() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ serverError, status }] = useFetch('createResetSession');

  // On form submit
  async function handleFormSubmit(data) {
    if (data.password !== data.confirmPassword) {
      errorToaster("Passwords Doesn't Match");
    } else {
      const response = await resetPassword({ username, password: data.password });
      if (response?.error) {
        return errorToaster("Passwords Doesn't Match");
      }
      successToaster(response.data);
      reset();
      navigate('/password');
    }
  }

  // To Show Error Toast
  useEffect(() => {
    if (errors.password) errorToaster(errors.password?.message)
  }, [errors.password])

  useEffect(() => {
    if (errors.confirmPassword) errorToaster(errors.confirmPassword?.message)
  }, [errors.confirmPassword])

  // form validations
  const validations = {
    password: {
      required: { value: true, message: 'Password is required.' },
      pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Password must have Minimum 8 characters, atleast 1 uppercase, 1 lowercase, 1 number and 1 special character' }
    },
    confirmPassword: {
      required: { value: true, message: 'Confirm Password is required.' },
      pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Confirm Password must have Minimum 8 characters, atleast 1 uppercase, 1 lowercase, 1 number and 1 special character' }
    }
  }
  
  if (serverError) { return <div>Something went Wrong</div> }
  if (status && status !== 201) { return <Navigate to='/password' replace={true} /> }

  return (
    <>
      <div className=" w-screen h-screen">
        <div className="flex justify-center items-center h-full">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Reset</h4>
              <span className="py-2 text-xl w-2/3 text-center text-gray-500">Enter new password</span>
            </div>
            <form className="py-5" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="textbox flex  flex-col items-center">
                <input type="text" placeholder='Password' className={`${styles.textbox} border-2 ${!errors.password ? 'border-white' : 'border-red-500'}`} {...register('password', { ...validations.password })} />
                <input type="password" placeholder='Repeat Password' className={styles.textbox} {...register('confirmPassword', { ...validations.confirmPassword })} />
                <button type='submit' className={styles.btn}>Let's Go</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


